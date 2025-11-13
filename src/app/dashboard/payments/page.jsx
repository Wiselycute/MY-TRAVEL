"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import DataTable from './../../../components/dashboard/DataTable';
import { PaymentFormModal } from '@/components/dashboard/payments/PaymentFormModal';

export default function PaymentsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchPayments = async () => {
    try {
      const res = await api.get("/api/payments");
      setData(res.data);
    } catch {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  const handleSubmit = async (payload) => {
    try {
      if (editing) await api.put(`/api/payments/${editing._id}`, payload);
      else await api.post("/api/payments", payload);
      toast.success(editing ? "Payment updated" : "Payment created");
      fetchPayments();
      setModalOpen(false);
      setEditing(null);
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete payment?")) return;
    try {
      await api.delete(`/api/payments/${id}`);
      toast.success("Deleted");
      fetchPayments();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const columns = [
    { header: "Booking", cell: (r) => r.booking_id?._id?.slice(-5) || "—" },
    { header: "Amount", cell: (r) => `$${r.amount}` },
    { header: "Method", cell: (r) => r.payment_method },
    { header: "Status", cell: (r) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        r.payment_status === "Completed" ? "bg-green-500/10 text-green-300"
        : r.payment_status === "Failed" ? "bg-red-500/10 text-red-300"
        : "bg-yellow-500/10 text-yellow-300"
      }`}>
        {r.payment_status}
      </span>
    )},
    { header: "Date", cell: (r) => new Date(r.payment_date).toLocaleDateString() },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Payments</h1>
        <button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={16}/> Add Payment
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={(r) => { setEditing(r); setModalOpen(true); }} onDelete={handleDelete}/>
      <PaymentFormModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} initialData={editing}/>
    </div>
  );
}
