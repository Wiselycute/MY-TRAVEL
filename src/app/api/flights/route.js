// app/api/flights/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Flight from "@/models/Flight";

const badRequest = (msg) => NextResponse.json({ success: false, message: msg }, { status: 400 });
const serverError = (msg = "Server error") => NextResponse.json({ success: false, message: msg }, { status: 500 });

export async function GET() {
  try {
    await connectDB();
    const flights = await Flight.find().lean();
    return NextResponse.json({ success: true, data: flights }, { status: 200 });
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
