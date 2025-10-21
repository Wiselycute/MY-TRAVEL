// app/api/bookings/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Booking from "@/models/Booking";

export async function GET() {
  await connectDB();
  const bookings = await Booking.find().populate("user_id");
  return NextResponse.json(bookings);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const booking = await Booking.create(data);
  return NextResponse.json(booking);
}
