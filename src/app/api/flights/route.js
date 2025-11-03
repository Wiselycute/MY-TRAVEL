// app/api/flights/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Flight from "@/models/Flight";

const badRequest = (msg) => NextResponse.json({ success: false, message: msg }, { status: 400 });
const serverError = (msg = "Server error") => NextResponse.json({ success: false, message: msg }, { status: 500 });

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const origin = searchParams.get("origin") || "";
    const destination = searchParams.get("destination") || "";
    const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || Number.MAX_SAFE_INTEGER;
    const departureDate = searchParams.get("departureDate");

    // Build filter query
    const filter = {};
    if (search) {
      filter.$or = [
        { airline_name: { $regex: search, $options: "i" } },
        { flight_number: { $regex: search, $options: "i" } }
      ];
    }
    if (origin) {
      filter.origin_airport = { $regex: origin, $options: "i" };
    }
    if (destination) {
      filter.destination_airport = { $regex: destination, $options: "i" };
    }
    filter.price = { $gte: minPrice, $lte: maxPrice };
    if (departureDate) {
      const startDate = new Date(departureDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.departure_time = { $gte: startDate, $lt: endDate };
    }

    const skip = (page - 1) * limit;
    const total = await Flight.countDocuments(filter);
    const flights = await Flight.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ departure_time: 1, price: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      flights,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    }, { status: 200 });
  } catch (err) {
    console.error("GET /api/flights error:", err);
    return serverError();
  }
}

function isValidUrl(str) {
  try {
    // eslint-disable-next-line no-new
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    if (!data || Object.keys(data).length === 0) return badRequest("Empty request body");

    if (data.image && typeof data.image !== "string") return badRequest("image must be a string URL");
    if (data.image && !isValidUrl(data.image)) return badRequest("image must be a valid URL");

    const flight = await Flight.create(data);
    return NextResponse.json({ success: true, data: flight }, { status: 201 });
  } catch (err) {
    console.error("POST /api/flights error:", err);
    // Mongoose validation errors
    if (err.name === "ValidationError") return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    return serverError();
  }
}
