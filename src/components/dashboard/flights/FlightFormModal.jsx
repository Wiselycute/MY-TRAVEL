"use client";
import { useState, useEffect } from "react";

export default function FlightFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ airline:"", origin:"", destination:"", price:"", available_seats:"", departure_date:"" });
  useEffect(()=>{ if(initialData) setForm(initialData); },[initialData]);
  if(!isOpen) return null;
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Flight":"Add Flight"}</h2>
        <div className="space-y-3">
          {["airline","origin","destination","price","available_seats","departure_date"].map(f=>(
            <input key={f} name={f} value={form[f]||""} onChange={change}
                   placeholder={f.replace("_"," ").toUpperCase()}
                   className="w-full p-2 bg-slate-700 rounded" type={f.includes("date")?"date":"text"}/>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
          <button onClick={()=>onSubmit(form)} className="px-4 py-2 bg-indigo-600 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
