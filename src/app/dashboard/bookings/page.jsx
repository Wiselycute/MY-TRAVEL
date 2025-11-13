"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import DataTable from './../../../components/dashboard/DataTable';
import BookingFormModal from './../../../components/dashboard/bookings/BookingFormModal';

export default function BookingsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings");
      setData(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleSubmit = async (payload) => {
    try {
      if (editing) await api.put(`/api/bookings/${editing._id}`, payload);
      else await api.post("/api/bookings", payload);
      toast.success(editing ? "Booking updated" : "Booking created");
      setModalOpen(false);
      setEditing(null);
      fetchBookings();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete booking?")) return;
    try {
      await api.delete(`/api/bookings/${id}`);
      toast.success("Deleted");
      fetchBookings();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const columns = [
    { header: "User", cell: (r) => r.user_id?.name || "—" },
    { header: "Service", cell: (r) => r.service_type },
    { header: "Amount", cell: (r) => `$${r.total_amount}` },
    { header: "Status", cell: (r) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        r.status === "Confirmed" ? "bg-green-500/10 text-green-300"
        : r.status === "Cancelled" ? "bg-red-500/10 text-red-300"
        : "bg-yellow-500/10 text-yellow-300"
      }`}>
        {r.status}
      </span>
    )},
    { header: "Date", cell: (r) => new Date(r.booking_date).toLocaleDateString() },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Bookings</h1>
        <button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={16}/> Add Booking
        </button>
      </div>
      <DataTable columns={columns} data={data} loading={loading} onEdit={(r) => { setEditing(r); setModalOpen(true); }} onDelete={handleDelete}/>
      <BookingFormModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} initialData={editing}/>
    </div>
  );
}
