"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import DataTable from './../../../components/dashboard/DataTable';
import  FlightFormModal  from '@/components/dashboard/flights/FlightFormModal';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchFlights = async () => {
    try {
      const res = await api.get("/api/flights");
      setFlights(res.data);
    } catch {
      toast.error("Failed to load flights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFlights(); }, []);

  const handleSubmit = async (data) => {
    try {
      if (editing) await api.put(`/api/flights/${editing._id}`, data);
      else await api.post("/api/flights", data);
      toast.success(editing ? "Flight updated" : "Flight created");
      fetchFlights(); setOpen(false); setEditing(null);
    } catch { toast.error("Save failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this flight?")) return;
    try { await api.delete(`/api/flights/${id}`); toast.success("Deleted"); fetchFlights(); }
    catch { toast.error("Delete failed"); }
  };

  const columns = [
    { header: "Airline", cell: r => r.airline },
    { header: "From", cell: r => r.origin },
    { header: "To", cell: r => r.destination },
    { header: "Price", cell: r => `$${r.price}` },
    { header: "Seats", cell: r => r.available_seats },
    { header: "Date", cell: r => new Date(r.departure_date).toLocaleDateString() },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Flights</h1>
        <button onClick={() => setOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16}/> Add Flight
        </button>
      </div>
      <DataTable columns={columns} data={flights} loading={loading}
                 onEdit={(r)=>{setEditing(r);setOpen(true);}} onDelete={handleDelete}/>
      <FlightFormModal isOpen={open} onClose={()=>{setOpen(false);setEditing(null);}}
                       onSubmit={handleSubmit} initialData={editing}/>
    </div>
  );
}
