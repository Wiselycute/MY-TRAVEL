"use client";
import { useEffect, useState } from "react";

export default function CarsFormModal({ isOpen, initialData, onClose, onSubmit }) {
  const [form, setForm] = useState({ provider_name: "", model: "", category: "economy", seats: 4, price_per_day: 0, availability_status: true, image: "" });

  useEffect(() => {
    if (initialData) setForm({ ...initialData });
    else setForm({ provider_name: "", model: "", category: "economy", seats: 4, price_per_day: 0, availability_status: true, image: "" });
  }, [initialData]);

  if (!isOpen) return null;

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-800 text-slate-100 p-6 rounded-xl w-full max-w-md border border-white/6">
        <h2 className="text-lg font-semibold mb-4">{initialData ? "Edit Car" : "Add Car"}</h2>

        <div className="space-y-3">
          <input name="provider_name" value={form.provider_name} onChange={change} placeholder="Provider name" className="w-full p-2 rounded bg-slate-700 border border-white/6" />
          <input name="model" value={form.model} onChange={change} placeholder="Model" className="w-full p-2 rounded bg-slate-700 border border-white/6" />
          <div className="flex gap-2">
            <select name="category" value={form.category} onChange={change} className="flex-1 p-2 rounded bg-slate-700 border border-white/6">
              <option value="economy">Economy</option>
              <option value="SUV">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
            <input name="seats" value={form.seats} onChange={change} type="number" className="w-24 p-2 rounded bg-slate-700 border border-white/6" />
          </div>
          <input name="price_per_day" value={form.price_per_day} onChange={change} type="number" placeholder="Price per day" className="w-full p-2 rounded bg-slate-700 border border-white/6" />
          <input name="image" value={form.image} onChange={change} placeholder="Image URL (optional)" className="w-full p-2 rounded bg-slate-700 border border-white/6" />
          <label className="flex items-center gap-2">
            <input name="availability_status" type="checkbox" checked={form.availability_status} onChange={change} />
            <span>Available</span>
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-600">Cancel</button>
          <button onClick={() => onSubmit(form)} className="px-4 py-2 rounded bg-indigo-600">Save</button>
        </div>
      </div>
    </div>
  );
}
