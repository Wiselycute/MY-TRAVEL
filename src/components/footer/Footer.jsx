"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // TODO: wire up to a mailing list API
    toast.success("Thanks for subscribing — check your inbox!");
    form.reset();
  };

  return (
    <footer className="w-full bg-surface border-t border-border text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">My Travel</h3>
            <p className="text-sm leading-relaxed">
              Classic design, modern experience. Explore curated trips, flexible bookings, and 24/7 support.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/flights" className="hover:text-foreground">Flights</Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-foreground">Hotels</Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-foreground">Cars</Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-foreground">Packages</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Support</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 text-primary" />
                <a href="mailto:support@mytravel.example" className="hover:text-foreground">support@mytravel.example</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 text-primary" />
                <a href="tel:+1234567890" className="hover:text-foreground">+1 (234) 567-890</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                <span>123 Main Street, Your City</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Newsletter</h4>
            <p className="text-sm mb-3">Get travel deals, updates and tips — delivered weekly.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} My Travel. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/booking" className="hover:text-foreground">Booking</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
