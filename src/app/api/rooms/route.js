// app/api/rooms/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Room from "@/models/Room";

export async function GET() {
  await connectDB();
  const rooms = await Room.find();
  return NextResponse.json(rooms);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const room = await Room.create(data);
  return NextResponse.json(room);
}
