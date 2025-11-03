// app/api/payments/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../../db/connectDB";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();
    const payments = await Payment.find().populate("user_id").populate("booking_id").lean();
    return NextResponse.json({ success: true, data: payments }, { status: 200 });
  } catch (error) {
    console.error("GET /api/payments error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch payments", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    console.log("Received payment data:", data); // Debug log

    // Handle case where user_id is an object
    if (typeof data.user_id === 'object' && data.user_id !== null) {
      data.user_id = data.user_id._id;
    }

    // Check which fields are missing
    const missingFields = [];
    if (!data.booking_id) missingFields.push('booking_id');
    if (!data.user_id) missingFields.push('user_id');
    if (!data.amount) missingFields.push('amount');
    if (!data.payment_method) missingFields.push('payment_method');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Missing required fields", 
          details: `Missing: ${missingFields.join(', ')}`,
          receivedData: data
        },
        { status: 400 }
      );
    }

    // Validate payment_method enum
    const validPaymentMethods = ['card', 'paypal', 'mobile_money'];
    if (!validPaymentMethods.includes(data.payment_method)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid payment_method", 
          details: `Payment method must be one of: ${validPaymentMethods.join(', ')}`,
          receivedData: data.payment_method
        },
        { status: 400 }
      );
    }

    // Validate ObjectIds
    const invalidIds = [];
    if (!mongoose.Types.ObjectId.isValid(data.booking_id)) invalidIds.push('booking_id');
    if (!mongoose.Types.ObjectId.isValid(data.user_id)) invalidIds.push('user_id');

    if (invalidIds.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid ObjectId format", 
          details: `Invalid format for: ${invalidIds.join(', ')}`,
          receivedData: {
            booking_id: data.booking_id,
            user_id: data.user_id
          }
        },
        { status: 400 }
      );
    }

    // Verify that booking and user exist
    const booking = await Booking.findById(data.booking_id);
    const user = await User.findById(data.user_id);

    if (!booking || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Referenced records not found",
          details: {
            booking: booking ? "found" : "not found",
            user: user ? "found" : "not found"
          }
        },
        { status: 400 }
      );
    }

    const payment = await Payment.create(data);
    return NextResponse.json({ success: true, data: payment }, { status: 201 });
  } catch (error) {
    console.error("POST /api/payments error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: "Validation error", error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create payment", error: error.message },
      { status: 500 }
    );
  }
}
