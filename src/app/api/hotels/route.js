// app/api/hotels/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Hotel from "@/models/Hotel";

export async function GET() {
  await connectDB();
  const hotels = await Hotel.find();
  return NextResponse.json(hotels);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const hotel = await Hotel.create(data);
  return NextResponse.json(hotel);
}
