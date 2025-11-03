"use client";

import React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation";

import {
  Plane,
  Hotel,
  Car,
  Briefcase,
  ShieldCheck,
  Ticket,
  Users,
  CreditCard,
  Settings,
  LayoutDashboard,
  MapPin,
} from "lucide-react";

export const dashboardMenu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Flights",
    path: "/dashboard/flights",
    icon: Plane,
  },
  {
    title: "Hotels",
    path: "/dashboard/hotels",
    icon: Hotel,
  },
  {
    title: "Car Rentals",
    path: "/dashboard/cars",
    icon: Car,
  },
  {
    title: "Packages",
    path: "/dashboard/packages",
    icon: Briefcase,
  },
  {
    title: "Travel Insurance",
    path: "/dashboard/insurance",
    icon: ShieldCheck,
  },
  {
    title: "Tours & Activities",
    path: "/dashboard/activities",
    icon: Ticket,
  },
  {
    title: "Bookings",
    path: "/dashboard/bookings",
    icon: MapPin,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Payments",
    path: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];


export default function SidebarComponent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen bg-background ">
      <div className="p-5">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          Travel Admin
        </h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          {dashboardMenu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                (pathname === item.path || (item.path !== "/dashboard" && pathname.startsWith(item.path)))
                  ? "bg-primary/20 text-primary font-medium"
                  : "hover:bg-primary/10 text-gray-200 hover:text-primary"
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                (pathname === item.path || (item.path !== "/dashboard" && pathname.startsWith(item.path)))
                  ? "text-primary"
                  : "text-primary/70"
              }`} />
              <span className="text-sm">{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@travel.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
