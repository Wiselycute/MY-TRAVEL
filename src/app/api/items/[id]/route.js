import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/db/connectDB";
import Item from "@/models/Item";

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Item.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Item.findByIdAndDelete(params.id);
  return Response.json({ message: "Deleted successfully" });
}
