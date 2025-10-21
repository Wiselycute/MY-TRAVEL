import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const badRequest = (msg) => NextResponse.json({ success: false, message: msg }, { status: 400 });
const serverError = (msg = "Server error") => NextResponse.json({ success: false, message: msg }, { status: 500 });

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body || !body.image) return badRequest("Missing image in request body");

    const { image, folder } = body;

    // cloudinary.uploader.upload accepts both data URIs and remote URLs
    const res = await cloudinary.uploader.upload(image, {
      folder: folder || "uploads",
      resource_type: "image",
      use_filename: true,
      unique_filename: true,
    });

    return NextResponse.json({ success: true, data: { url: res.secure_url, public_id: res.public_id } }, { status: 201 });
  } catch (err) {
    console.error("POST /api/uploads error:", err);
    // Cloudinary errors may contain message
    if (err?.message) return serverError(err.message);
    return serverError();
  }
}
