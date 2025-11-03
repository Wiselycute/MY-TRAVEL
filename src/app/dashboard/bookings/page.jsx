"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";

const columns = [
  {
    header: "Booking ID",
    cell: (row) => row.id,
  },
  {
    header: "Customer",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.customerName}</div>
        <div className="text-xs text-muted-foreground">{row.customerEmail}</div>
      </div>
    ),
  },
  {
    header: "Type",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.type === "Flight"
            ? "bg-blue-100 text-blue-800"
            : row.type === "Hotel"
            ? "bg-purple-100 text-purple-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {row.type}
      </span>
    ),
  },
  {
    header: "Date",
    cell: (row) => new Date(row.date).toLocaleDateString(),
  },
  {
    header: "Amount",
    cell: (row) => `$${row.amount}`,
  },
  {
    header: "Status",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.status === "Confirmed"
            ? "bg-green-100 text-green-800"
            : row.status === "Pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

const sampleData = [
  {
    id: "BK001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    type: "Flight",
    date: "2025-10-24",
    amount: 599,
    status: "Confirmed",
  },
  // Add more sample data as needed
];

export default function BookingsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" />
          Add Booking
        </button>
      </div>
      
      <div className="grid gap-6">
        <DataTable
          title="Bookings Management"
          columns={columns}
          data={data}
          loading={loading}
        />
      </div>
    </div>
  );
}