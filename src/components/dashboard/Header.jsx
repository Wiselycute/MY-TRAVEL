"use client";
import React from "react";
import { Search, Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-transparent p-4 flex items-center justify-between border-b border-slate-800/40">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input className="pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 w-[360px]" placeholder="Search for..." />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Bell size={20} className="text-slate-300" />
        <User size={26} className="text-slate-300" />
      </div>
    </header>
  );
}
