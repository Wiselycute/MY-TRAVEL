"use client"

import React from "react"
import  { useState } from "react";
import Link from "next/link"
import { Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "./ModeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function NavbarComponent() {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <nav className="w-full bg-background  border-border fixed top-0 left-0 z-50 backdrop-blur-md ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary cursor-pointer">My Travel</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-sm font-semibold">
          {["Home"].map((item) => (
            <li key={item}>
              <Link
                href={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-primary transition-colors duration-300"
              >
                {item}
              </Link>
            </li>
          ))}

          {/* Services Dropdown */}
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative"
          >
            <li className="hover:text-primary cursor-pointer">Services</li>
            <AnimatePresence>
              {hover && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute mt-2 w-52 bg-background border border-primary/30 rounded-xl shadow-lg text-sm"
                >
                  <div className="p-2">
                    <p className="font-semibold text-primary mb-1">Our Services</p>
                    <hr className="border-primary/30 mb-2" />
                    <ul className="flex flex-col gap-1">
                      <li><Link href="/flights" className="block px-2 py-1 hover:bg-primary/10 rounded-md">✈️ Flights</Link></li>
                      <li><Link href="/hotels" className="block px-2 py-1 hover:bg-primary/10 rounded-md">🏨 Hotels</Link></li>
                      <li><Link href="/cars" className="block px-2 py-1 hover:bg-primary/10 rounded-md">🚘 Cars</Link></li>
                      <li><Link href="/packages" className="block px-2 py-1 hover:bg-primary/10 rounded-md">📦 Packages</Link></li>
                      <li><Link href="/insurance" className="block px-2 py-1 hover:bg-primary/10 rounded-md">🛡️ Insurance</Link></li>
                      <li><Link href="/tours" className="block px-2 py-1 hover:bg-primary/10 rounded-md">🎟️ Tours & Activities</Link></li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {["About", "Contact", "Login", "Signup", "Language"].map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="hover:text-primary transition-colors duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
          <ModeToggle />
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-4">
              <motion.nav
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 text-base font-medium mt-6"
              >
                <Link href="/" className="hover:text-primary">Home</Link>
                <Link href="/flights" className="hover:text-primary">✈️ Flights</Link>
                <Link href="/hotels" className="hover:text-primary">🏨 Hotels</Link>
                <Link href="/cars" className="hover:text-primary">🚘 Cars</Link>
                <Link href="/packages" className="hover:text-primary">📦 Packages</Link>
                <Link href="/insurance" className="hover:text-primary">🛡️ Insurance</Link>
                <Link href="/tours" className="hover:text-primary">🎟️ Tours & Activities</Link>
                <Link href="/about" className="hover:text-primary">About</Link>
                <Link href="/contact" className="hover:text-primary">Contact</Link>
                <Link href="/login" className="hover:text-primary">Login</Link>
                <Link href="/signup" className="hover:text-primary">Signup</Link>
                <Link href="/language" className="hover:text-primary">Language</Link>
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
