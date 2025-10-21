// app/api/tours/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import TourActivity from "@/models/TourActivity";

export async function GET() {
  await connectDB();
  const tours = await TourActivity.find();
  return NextResponse.json(tours);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const tour = await TourActivity.create(data);
  return NextResponse.json(tour);
}
