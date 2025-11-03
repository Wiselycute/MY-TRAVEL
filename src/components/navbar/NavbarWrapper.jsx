"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "./NavbarComponent";

export default function NavbarWrapper() {
  const pathname = usePathname() || "";

  // Exclude navbar on dashboard and auth pages (login/signup)
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname === "/login" || pathname === "/signup" || pathname.startsWith("/auth");

  if (isDashboard || isAuth) return null;

  return <NavbarComponent />;
}
