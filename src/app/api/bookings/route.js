// app/api/bookings/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Booking from "@/models/Booking";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    // Ensure User model is registered before populate runs
    // (importing User above registers the schema with mongoose)
    const bookings = await Booking.find().populate("user_id");
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // Basic validation: require user_id and ensure it's a valid ObjectId
    if (!data.user_id) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    if (!mongoose.isValidObjectId(data.user_id)) {
      return NextResponse.json({ error: "user_id must be a valid ObjectId" }, { status: 400 });
    }

    // Optionally convert string to ObjectId (Mongoose will usually cast, but make explicit)
    // Use `new` to construct the ObjectId instance when required by the driver/runtime
    try {
      data.user_id = new mongoose.Types.ObjectId(data.user_id);
    } catch (e) {
      // If conversion fails for some reason, leave it as-is and let Mongoose validation handle it
      console.warn('Failed to convert user_id to ObjectId, leaving as string:', e);
    }

    const booking = await Booking.create(data);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    // If it's a Mongoose validation error, return 400 with details
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
