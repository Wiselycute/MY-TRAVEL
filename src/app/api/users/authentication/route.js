import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export const POST = async (request) => {
  try {
    await connectDB();

    // Accept a few common client payload shapes (email / Email, password / password_hash)
    const body = await request.json();
    const email = (body.email || body.Email || '').toString().trim().toLowerCase();
    const password = body.password || body.password_hash || body.Password || '';

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Compare hashed password
  // Compare provided plain password with stored hash
  const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Return success
    return NextResponse.json({
      message: "Authentication successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
