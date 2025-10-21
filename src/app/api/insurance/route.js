// app/api/insurance/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Insurance from "@/models/Insurance";

export async function GET() {
  await connectDB();
  const insurances = await Insurance.find();
  return NextResponse.json(insurances);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const insurance = await Insurance.create(data);
  return NextResponse.json(insurance);
}
