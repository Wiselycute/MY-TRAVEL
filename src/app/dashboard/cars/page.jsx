"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import DataTable from './../../../components/dashboard/DataTable';
import CarsFormModal from './../../../components/dashboard/cars/CarFormModal';

const columns = [
  { header: "Car", cell: (r) => <div className="flex items-center gap-3"><img src={r.image || "/placeholder-car.png"} className="w-12 h-8 object-cover rounded" alt="car"/><div><div className="font-medium">{r.model}</div><div className="text-xs text-slate-400">{r.provider_name}</div></div></div> },
  { header: "Category", cell: (r) => r.category },
  { header: "Seats", cell: (r) => r.seats || "-" },
  { header: "Price/Day", cell: (r) => `$${Number(r.price_per_day).toFixed(2)}` },
  { header: "Status", cell: (r) => <span className={`px-2 py-1 rounded-full text-xs ${r.availability_status ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300"}`}>{r.availability_status ? "Available" : "Unavailable"}</span> }
];

export default function CarsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/cars");
      setData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCars(); }, []);

  const handleEdit = (car) => { setEditing(car); setModalOpen(true); };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/api/cars/${id}`);
      toast.success("Deleted");
      fetchCars();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (payload) => {
    try {
      if (editing) {
        await api.put(`/api/cars/${editing._id}`, payload);
        toast.success("Updated car");
      } else {
        await api.post("/api/cars", payload);
        toast.success("Created car");
      }
      setModalOpen(false);
      setEditing(null);
      fetchCars();
    } catch (err) {
      toast.error("Save failed");
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Cars</h1>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md">
          <Plus size={16}/> Add Car
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />

      <CarsFormModal isOpen={modalOpen} initialData={editing} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} />
    </div>
  );
}
