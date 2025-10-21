import React from 'react'
import Link from "next/link"

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
    title: "Customers",
    path: "/dashboard/customers",
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
  return (
    <div className="flex flex-col sticky ">
      {dashboardMenu.map((item) => (
  <Link key={item.path} href={item.path} className="flex items-center gap-3 p-3 py-[13px]">
    <item.icon className="w-5 h-5 text-primary" />
    <span>{item.title}</span>
  </Link>
))}


    </div>
  )
}
