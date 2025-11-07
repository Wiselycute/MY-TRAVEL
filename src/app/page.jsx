"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image";
import HeroBanner from './../components/banner/HeroBanner';
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // Convert string back to object
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      // No user found — redirect to signup/login
      router.push("/auth/signup");
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <HeroBanner/>
      <div className="grid  grid-rows-[20px_1fr_20px] items-center bg-background justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>My home page</h1>
      </div>
    </>
  );
}
