"use client";
import Link from "next/link";
import { Home, Truck, Plane, Calendar, Users } from "lucide-react";

export default function Sidebar() {
  const items = [
    { href: "/dashboard", label: "Overview", icon: <Home size={18}/> },
    { href: "/dashboard/cars", label: "Cars", icon: <Truck size={18}/> },
    { href: "/dashboard/flights", label: "Flights", icon: <Plane size={18}/> },
    { href: "/dashboard/hotels", label: "Hotels", icon: <Calendar size={18}/> },
    { href: "/dashboard/users", label: "Users", icon: <Users size={18}/> },
  ];

  return (
    <aside className="w-64 bg-slate-800/60 backdrop-blur-lg border-r border-white/6 p-6 flex flex-col">
      <div className="mb-8 text-center">
        <div className="text-indigo-300 font-bold text-xl">Admin Panel</div>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map(i => (
          <Link key={i.href} href={i.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/40 transition">
            {i.icon}
            <span>{i.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-6">
        <button className="w-full py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 transition">New</button>
      </div>
    </aside>
  );
}
