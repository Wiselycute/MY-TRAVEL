"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", revenue: 40000, expenses: 22000 },
  { month: "Feb", revenue: 80000, expenses: 40000 },
  { month: "Mar", revenue: 90000, expenses: 54000 },
  { month: "Apr", revenue: 60000, expenses: 30000 },
  { month: "May", revenue: 75000, expenses: 45000 },
  { month: "Jun", revenue: 125200, expenses: 60000 },
  { month: "Jul", revenue: 85000, expenses: 50000 },
  { month: "Aug", revenue: 92000, expenses: 42000 },
  { month: "Sep", revenue: 65000, expenses: 34000 },
  { month: "Oct", revenue: 210000, expenses: 120000 },
  { month: "Nov", revenue: 95000, expenses: 52000 },
  { month: "Dec", revenue: 140000, expenses: 70000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-slate-400">Total revenue</div>
          <div className="text-2xl font-bold">$240.8K <span className="text-emerald-400 text-sm ml-2">+24.6%</span></div>
        </div>
        <div className="text-sm text-slate-400">Jan 2024 - Dec 2024</div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#0b1220" />
            <XAxis dataKey="month" tick={{ fill: "#9CA3AF" }} />
            <YAxis tick={{ fill: "#9CA3AF" }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#A78BFA" fill="url(#colorRev)" />
            <Area type="monotone" dataKey="expenses" stroke="#60A5FA" fill="url(#colorExp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
