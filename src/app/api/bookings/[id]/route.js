// app/api/bookings/[id]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/db/connectDB";
import Booking from "@/models/Booking";

const badRequest = (msg) => NextResponse.json({ success: false, message: msg }, { status: 400 });
const notFound = (msg = "Not found") => NextResponse.json({ success: false, message: msg }, { status: 404 });
const serverError = (msg = "Server error") => NextResponse.json({ success: false, message: msg }, { status: 500 });

export async function GET(req, { params }) {
  try {
    await connectDB();
    if (!params?.id) return badRequest("Missing id parameter");
    if (!mongoose.Types.ObjectId.isValid(params.id)) return badRequest("Invalid id format");

    const booking = await Booking.findById(params.id).populate("user_id").lean();
    if (!booking) return notFound("Booking not found");
    return NextResponse.json({ success: true, data: booking }, { status: 200 });
  } catch (err) {
    console.error("GET /api/bookings/[id] error:", err);
    return serverError();
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    if (!params?.id) return badRequest("Missing id parameter");
    if (!mongoose.Types.ObjectId.isValid(params.id)) return badRequest("Invalid id format");

    const data = await req.json();
    if (!data || Object.keys(data).length === 0) return badRequest("Empty request body");

    const updated = await Booking.findByIdAndUpdate(params.id, data, { new: true, runValidators: true }).lean();
    if (!updated) return notFound("Booking not found");
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/bookings/[id] error:", err);
    if (err.name === "ValidationError") return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    return serverError();
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    if (!params?.id) return badRequest("Missing id parameter");
    if (!mongoose.Types.ObjectId.isValid(params.id)) return badRequest("Invalid id format");

    const deleted = await Booking.findByIdAndDelete(params.id).lean();
    if (!deleted) return notFound("Booking not found");
    return NextResponse.json({ success: true, message: "Booking deleted" }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/bookings/[id] error:", err);
    return serverError();
  }
}
