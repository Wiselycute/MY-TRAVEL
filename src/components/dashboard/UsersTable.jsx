"use client";
import React from "react";

const sampleUsers = [
  { name: "John Carter", email: "john@google.com", phone: "(414) 907-1274", location: "United States", company: "Google", online: true },
  { name: "Sophie Moore", email: "sophie@webflow.com", phone: "(240) 480-4277", location: "UK", company: "Webflow", online: false },
  { name: "Matt Cannon", email: "matt@facebook.com", phone: "(318) 698-9889", location: "Australia", company: "Facebook", online: false },
];

export default function UsersTable() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">All Users</h3>
        <div className="text-sm text-slate-400">1 - 10 of 256</div>
      </div>

      <table className="w-full text-left">
        <thead className="text-slate-400 text-sm border-b border-slate-800">
          <tr>
            <th className="py-3">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleUsers.map((u) => (
            <tr key={u.email} className="border-b border-slate-800/40 hover:bg-slate-800/30">
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs text-white">{u.name.split(" ").map(n=>n[0]).join("")}</div>
                  <div>
                    <div className="font-medium text-slate-200">{u.name}</div>
                    <div className="text-xs text-slate-400">Agent</div>
                  </div>
                </div>
              </td>
              <td className="py-3 text-sm text-slate-300">{u.email}</td>
              <td className="py-3 text-sm text-slate-300">{u.phone}</td>
              <td className="py-3 text-sm text-slate-300">{u.location}</td>
              <td className="py-3 text-sm text-slate-300">{u.company}</td>
              <td className="py-3">
                <span className={`px-3 py-1 rounded-full text-xs ${u.online ? "bg-emerald-700/20 text-emerald-300" : "bg-slate-700/30 text-slate-300"}`}>
                  {u.online ? "Online" : "Offline"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
