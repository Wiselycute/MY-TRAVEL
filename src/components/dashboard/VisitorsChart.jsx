"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { month: "Jan", current: 20000, subscribers: 8000, new: 12000 },
  { month: "Feb", current: 45000, subscribers: 12000, new: 20000 },
  { month: "Mar", current: 80000, subscribers: 20000, new: 30000 },
  { month: "Apr", current: 60000, subscribers: 16000, new: 24000 },
  { month: "May", current: 44000, subscribers: 12000, new: 20000 },
  { month: "Jun", current: 76000, subscribers: 24000, new: 32000 },
];

export default function VisitorsChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-400">Revenue by customer type</div>
        <div className="text-sm text-slate-400">Jan 2024 - Dec 2024</div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#0b1220" />
            <XAxis dataKey="month" tick={{ fill: "#9CA3AF" }} />
            <YAxis tick={{ fill: "#9CA3AF" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" stackId="a" fill="#a78bfa" />
            <Bar dataKey="subscribers" stackId="a" fill="#60a5fa" />
            <Bar dataKey="new" stackId="a" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
