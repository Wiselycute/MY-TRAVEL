"use client";
import Image from "next/image";
import { useState } from "react";

export function ImageWithFallback({ src, alt, fallbackSrc = "/placeholder.png", ...props }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative w-full h-full">
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        fill
        className={`object-cover ${props.className || ""}`}
        onError={() => setImgSrc(fallbackSrc)}
        unoptimized
      />
    </div>
  );
}
