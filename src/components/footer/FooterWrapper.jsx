"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname() || "";

  // Exclude footer on dashboard and auth pages (login/signup)
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname === "/login" || pathname === "/signup" || pathname.startsWith("/auth");

  if (isDashboard || isAuth) return null;

  return <Footer />;
}