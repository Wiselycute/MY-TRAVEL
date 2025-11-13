import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Item from "@/models/Item";

export async function GET() {
  await connectDB();
  const items = await Item.find().sort({ createdAt: -1 });
  return Response.json(items);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newItem = await Item.create(data);
  return Response.json(newItem);
}
