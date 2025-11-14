"use client";
import React from "react";

const rows = [
  { id: "BK-001", type: "Flight", user: "John Carter", date: "2025-11-20", status: "Confirmed", total: "$520" },
  { id: "BK-002", type: "Hotel", user: "Sophie", date: "2025-11-22", status: "Pending", total: "$320" },
  { id: "BK-003", type: "Car", user: "Matt", date: "2025-11-23", status: "Cancelled", total: "$90" },
];

export default function BookingsTable() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Bookings</h3>
        <div className="text-sm text-slate-400">Recent 30 days</div>
      </div>

      <table className="w-full text-left text-sm text-slate-300">
        <thead className="text-slate-400 border-b border-slate-800">
          <tr>
            <th className="py-3">Booking ID</th>
            <th>Type</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b border-slate-800/40 hover:bg-slate-800/30">
              <td className="py-3">{r.id}</td>
              <td>{r.type}</td>
              <td>{r.user}</td>
              <td>{r.date}</td>
              <td>
                <span className={`px-3 py-1 rounded-full text-xs ${r.status==="Confirmed"?"bg-emerald-700/20 text-emerald-300": r.status==="Pending"?"bg-yellow-600/20 text-yellow-300":"bg-rose-700/20 text-rose-300"}`}>{r.status}</span>
              </td>
              <td>{r.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
