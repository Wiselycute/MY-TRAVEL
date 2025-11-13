"use client";
import { useState, useEffect } from "react";

export default function ItemFormModal({ isOpen, onClose, onSubmit, item }) {
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "", status: "active" });

  useEffect(() => { if (item) setForm(item); }, [item]);
  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-lg border border-white/10">
        <h2 className="text-xl font-semibold mb-4">{item ? "Edit Item" : "Add New Item"}</h2>
        <div className="space-y-3">
          {["name", "category", "price", "stock"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-2 rounded-md bg-slate-700 border border-white/10 focus:outline-none"
            />
          ))}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-slate-700 border border-white/10"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            {item ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
