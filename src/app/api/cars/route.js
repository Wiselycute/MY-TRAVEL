// app/api/cars/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Car from "@/models/Car";

export async function GET() {
  await connectDB();
  const cars = await Car.find();
  return NextResponse.json(cars);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const car = await Car.create(data);
  return NextResponse.json(car);
}
