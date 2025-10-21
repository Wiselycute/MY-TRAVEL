// app/api/users/[id]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

const badRequest = (msg) => NextResponse.json({ success: false, message: msg }, { status: 400 });
const notFound = (msg = "Not found") => NextResponse.json({ success: false, message: msg }, { status: 404 });
const serverError = (msg = "Server error") => NextResponse.json({ success: false, message: msg }, { status: 500 });

export async function GET(req, { params }) {
  try {
    await connectDB();

    if (!params?.id) return badRequest("Missing id parameter");
    if (!mongoose.Types.ObjectId.isValid(params.id)) return badRequest("Invalid id format");

    const user = await User.findById(params.id).lean();
    if (!user) return notFound("User not found");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (err) {
    console.error("GET /api/users/[id] error:", err);
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

    const updated = await User.findByIdAndUpdate(params.id, data, { new: true, runValidators: true }).lean();
    if (!updated) return notFound("User not found");

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/users/[id] error:", err);
    // If it's a mongoose validation error, return 400
    if (err.name === "ValidationError") {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return serverError();
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    if (!params?.id) return badRequest("Missing id parameter");
    if (!mongoose.Types.ObjectId.isValid(params.id)) return badRequest("Invalid id format");

    const deleted = await User.findByIdAndDelete(params.id).lean();
    if (!deleted) return notFound("User not found");

    return NextResponse.json({ success: true, message: "User deleted" }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/users/[id] error:", err);
    return serverError();
  }
}

