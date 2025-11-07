// app/api/rooms/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Room from "@/models/room";

const PLACEHOLDER = "/assets/images/room-placeholder.svg";

export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find().lean();
    return NextResponse.json({ success: true, data: rooms }, { status: 200 });
  } catch (err) {
    console.error("GET /api/rooms error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // Basic validation
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
    }

    if (!data.room_type) {
      return NextResponse.json({ success: false, message: 'room_type is required' }, { status: 400 });
    }

    if (data.price == null || Number.isNaN(Number(data.price))) {
      return NextResponse.json({ success: false, message: 'price is required and must be a number' }, { status: 400 });
    }

    // Ensure image has a sensible default
    if (!data.image) data.image = PLACEHOLDER;

    // Cast numeric fields
    data.price = Number(data.price);
    if (data.capacity) data.capacity = Number(data.capacity);

    const room = await Room.create(data);
    return NextResponse.json({ success: true, data: room }, { status: 201 });
  } catch (err) {
    console.error("POST /api/rooms error:", err);
    if (err.name === 'ValidationError') {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
