"use client";
import { useEffect, useState } from "react";

export default function BookingFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ user_id: "", service_type: "Car", service_id: "", total_amount: 0, status: "Pending" });
  useEffect(() => { if (initialData) setForm(initialData); }, [initialData]);
  if (!isOpen) return null;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Booking" : "Add Booking"}</h2>
        <div className="space-y-3">
          <input name="user_id" value={form.user_id} onChange={change} placeholder="User ID" className="w-full p-2 bg-slate-700 rounded"/>
          <select name="service_type" value={form.service_type} onChange={change} className="w-full p-2 bg-slate-700 rounded">
            <option>Car</option><option>Flight</option><option>Hotel</option>
          </select>
          <input name="service_id" value={form.service_id} onChange={change} placeholder="Service ID" className="w-full p-2 bg-slate-700 rounded"/>
          <input name="total_amount" type="number" value={form.total_amount} onChange={change} placeholder="Total Amount" className="w-full p-2 bg-slate-700 rounded"/>
          <select name="status" value={form.status} onChange={change} className="w-full p-2 bg-slate-700 rounded">
            <option>Pending</option><option>Confirmed</option><option>Cancelled</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
          <button onClick={() => onSubmit(form)} className="px-4 py-2 bg-indigo-600 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
