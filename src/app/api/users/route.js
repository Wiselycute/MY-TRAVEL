
import { NextResponse } from "next/server";
import connectDB from "../../../db/connectDB";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const user = await User.create(data);
  return NextResponse.json(user);
}
