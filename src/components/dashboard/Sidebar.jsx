"use client";
import React from "react";
import { Home, Plane, MapPin, Calendar, Users, Settings, Box } from "lucide-react";

export default function Sidebar() {
  const items = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Plane, label: "Flights" },
    { icon: MapPin, label: "Destinations" },
    { icon: Calendar, label: "Bookings" },
    { icon: Users, label: "Users" },
    { icon: Box, label: "Packages" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-[#071226] border-r border-slate-800 text-slate-200 p-6 h-screen sticky top-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">TF</div>
        <div>
          <div className="font-semibold">Trip Fusion</div>
          <div className="text-xs text-slate-400">Admin panel</div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.label} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${it.active ? "bg-gradient-to-r from-purple-800/30 to-pink-700/10 border-l-4 border-pink-500" : "hover:bg-slate-800/40"}`}>
              <Icon size={18} />
              <span className={it.active ? "text-white" : "text-slate-300"}>{it.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/40">
          <img src="/avatar.jpg" className="w-10 h-10 rounded-full" alt="avatar" />
          <div>
            <div className="text-sm">John Carter</div>
            <div className="text-xs text-slate-400">Account settings</div>
          </div>
        </div>

        <button className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">Get template</button>
      </div>
    </aside>
  );
}
