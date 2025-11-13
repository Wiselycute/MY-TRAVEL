"use client";
import { useEffect, useState } from "react";

export default function PaymentFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ booking_id: "", amount: 0, payment_method: "Credit Card", payment_status: "Pending" });
  useEffect(() => { if (initialData) setForm(initialData); }, [initialData]);
  if (!isOpen) return null;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Payment" : "Add Payment"}</h2>
        <div className="space-y-3">
          <input name="booking_id" value={form.booking_id} onChange={change} placeholder="Booking ID" className="w-full p-2 bg-slate-700 rounded"/>
          <input name="amount" type="number" value={form.amount} onChange={change} placeholder="Amount" className="w-full p-2 bg-slate-700 rounded"/>
          <select name="payment_method" value={form.payment_method} onChange={change} className="w-full p-2 bg-slate-700 rounded">
            <option>Credit Card</option><option>PayPal</option><option>Cash</option>
          </select>
          <select name="payment_status" value={form.payment_status} onChange={change} className="w-full p-2 bg-slate-700 rounded">
            <option>Pending</option><option>Completed</option><option>Failed</option>
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
