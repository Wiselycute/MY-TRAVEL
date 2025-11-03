"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";

const columns = [
  {
    header: "Room Number",
    cell: (row) => row.roomNumber,
  },
  {
    header: "Hotel",
    cell: (row) => row.hotel,
  },
  {
    header: "Type",
    cell: (row) => row.type,
  },
  {
    header: "Capacity",
    cell: (row) => `${row.capacity} guests`,
  },
  {
    header: "Price/Night",
    cell: (row) => `$${row.pricePerNight}`,
  },
  {
    header: "Amenities",
    cell: (row) => (
      <div className="flex gap-1">
        {row.amenities.map((amenity, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
          >
            {amenity}
          </span>
        ))}
      </div>
    ),
  },
  {
    header: "Status",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.status === "Available"
            ? "bg-green-100 text-green-800"
            : row.status === "Booked"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

const sampleData = [
  {
    roomNumber: "301",
    hotel: "Grand Hotel",
    type: "Deluxe Suite",
    capacity: 4,
    pricePerNight: 299,
    amenities: ["WiFi", "Ocean View", "Minibar"],
    status: "Available",
  },
  // Add more sample data as needed
];

export default function RoomsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </button>
      </div>
      
      <div className="grid gap-6">
        <DataTable
          title="Rooms Management"
          columns={columns}
          data={data}
          loading={loading}
        />
      </div>
    </div>
  );
}