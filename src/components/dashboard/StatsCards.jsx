"use client";
import React from "react";

const Card = ({ title, value, delta, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
    <div className="text-xs text-slate-400">{title}</div>
    <div className="flex items-center justify-between mt-2">
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-sm px-2 py-1 rounded-md ${color}`}>{delta}</div>
    </div>
  </div>
);

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Pageviews" value="50.8K" delta="+28.4%" color="bg-emerald-800/40 text-emerald-300" />
      <Card title="Monthly users" value="23.6K" delta="-12.6%" color="bg-rose-800/30 text-rose-300" />
      <Card title="New sign ups" value="756" delta="+3.1%" color="bg-emerald-800/40 text-emerald-300" />
      <Card title="Subscriptions" value="2.3K" delta="+11.3%" color="bg-emerald-800/40 text-emerald-300" />
    </div>
  );
}
