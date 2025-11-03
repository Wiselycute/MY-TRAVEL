"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { HotelFormModal } from "@/components/dashboard/hotels/HotelFormModal";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

const columns = [
  {
    header: "Hotel Name",
    cell: (row) => row.name,
  },
  {
    header: "Location",
    cell: (row) => row.location,
  },
  {
    header: "Rating",
    cell: (row) => "⭐".repeat(row.rating),
  },
  {
    header: "Price/Night",
    cell: (row) => `$${row.price}`,
  },
  {
    header: "Available Rooms",
    cell: (row) => row.availableRooms,
  },
  {
    header: "Status",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

export default function HotelsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/hotels`);
      const result = response.data;

      if (Array.isArray(result)) {
        setData(result);
      } else {
        setData(result.hotels || result.data || []);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast.error("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleCreateHotel = async (hotelData) => {
    try {
      await api.post('/hotels', hotelData);
      await fetchHotels();
      toast.success('Hotel created successfully');
    } catch (error) {
      console.error('Error creating hotel:', error);
      toast.error('Failed to create hotel');
      throw error;
    }
  };

  const handleUpdateHotel = async (hotelData) => {
    try {
      await api.put(`/hotels/${selectedHotel._id || selectedHotel.id}`, hotelData);
      await fetchHotels();
      toast.success('Hotel updated successfully');
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast.error('Failed to update hotel');
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Hotels</h1>
        <button
          onClick={() => { setSelectedHotel(null); setIsModalOpen(true); }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Hotel
        </button>
      </div>
      
      <div className="grid gap-6">
        <DataTable
          title="Hotels Management"
          columns={columns}
          data={data}
          loading={loading}
        />
      </div>

      <HotelFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedHotel(null); }}
        onSuccess={() => { fetchHotels(); setIsModalOpen(false); setSelectedHotel(null); }}
        initialData={selectedHotel}
      />
    </div>
  );
}