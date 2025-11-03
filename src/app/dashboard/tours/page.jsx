"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";

const columns = [
  {
    header: "Tour Name",
    cell: (row) => row.name,
  },
  {
    header: "Destination",
    cell: (row) => row.destination,
  },
  {
    header: "Duration",
    cell: (row) => `${row.duration} days`,
  },
  {
    header: "Group Size",
    cell: (row) => `${row.currentSize}/${row.maxSize}`,
  },
  {
    header: "Price",
    cell: (row) => `$${row.price}`,
  },
  {
    header: "Start Date",
    cell: (row) => new Date(row.startDate).toLocaleDateString(),
  },
  {
    header: "Status",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.status === "Available"
            ? "bg-green-100 text-green-800"
            : row.status === "Almost Full"
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
    name: "European Adventure",
    destination: "Multiple Cities, Europe",
    duration: 14,
    currentSize: 12,
    maxSize: 15,
    price: 2999,
    startDate: "2025-11-15",
    status: "Almost Full",
  },
  // Add more sample data as needed
];

export default function ToursPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Tours</h1>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" />
          Add Tour
        </button>
      </div>
      
      <div className="grid gap-6">
        <DataTable
          title="Tours Management"
          columns={columns}
          data={data}
          loading={loading}
        />
      </div>
    </div>
  );
}