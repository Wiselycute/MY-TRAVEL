import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectDB();
  const users = await User.find().select("-password_hash");
  return NextResponse.json(users);
}

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    // Accept either `password` or `password_hash` from client
    const plainPassword = data.password || data.password_hash;

    if (!data.email || !plainPassword) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(plainPassword, salt);
    data.password_hash = hashed;
    // remove any plain password field
    delete data.password;

    const user = await User.create(data);
    const safeUser = user.toObject();
    delete safeUser.password_hash;

    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    const message = error?.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
