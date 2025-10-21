// app/api/payments/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import Payment from "@/models/Payment";

export async function GET() {
  await connectDB();
  const payments = await Payment.find().populate("user_id").populate("booking_id");
  return NextResponse.json(payments);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const payment = await Payment.create(data);
  return NextResponse.json(payment);
}
