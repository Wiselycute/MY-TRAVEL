"use client";
import { useState, useEffect } from "react";
import axios from "axios";
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

function AddRoomForm({ onClose, onCreated }) {
  const [form, setForm] = useState({
    hotel_id: "",
    room_type: "single",
    price: "",
    capacity: "",
    image: "",
    availability_status: true,
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // read file as data URL
      const dataUrl = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

      const uploadRes = await axios.post('/api/uploads', { image: dataUrl, folder: 'rooms' });
      if (uploadRes.data?.success) {
        setForm((f) => ({ ...f, image: uploadRes.data.data.url }));
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/rooms', {
        hotel_id: form.hotel_id || undefined,
        room_type: form.room_type,
        price: Number(form.price) || 0,
        capacity: Number(form.capacity) || 1,
        image: form.image || '/assets/images/room-placeholder.svg',
        availability_status: !!form.availability_status,
      });
      onCreated?.();
      onClose();
    } catch (err) {
      console.error('Create room failed', err);
      alert('Failed to create room');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-96">
        <h3 className="text-lg font-semibold mb-4">Add Room</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="hotel_id" value={form.hotel_id} onChange={handleChange} placeholder="Hotel ID (optional)" className="w-full p-2 border rounded" />
          <select name="room_type" value={form.room_type} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="single">single</option>
            <option value="double">double</option>
            <option value="suite">suite</option>
          </select>
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
          <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="Capacity" className="w-full p-2 border rounded" />
          <div>
            <input type="file" accept="image/*" onChange={handleFile} />
            {uploading ? <p className="text-sm text-gray-500">Uploading...</p> : form.image ? <img src={form.image} className="w-full h-24 object-cover rounded mt-2" alt="preview"/> : null}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="availability_status" checked={form.availability_status} onChange={handleChange} />
            <label>Available</label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Create</button>
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/rooms');
      setData(res.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch rooms', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </button>
      </div>

      <div className="grid gap-6">
        <DataTable
          title="Rooms Management"
          columns={columns}
          data={data.map(r => ({
            roomNumber: r._id,
            hotel: r.hotel_id || '—',
            type: r.room_type,
            capacity: r.capacity || 1,
            pricePerNight: r.price || 0,
            amenities: r.amenities || [],
            status: r.availability_status ? 'Available' : 'Booked',
          }))}
          loading={loading}
        />
      </div>

      {showForm && (
        <AddRoomForm
          onClose={() => setShowForm(false)}
          onCreated={() => fetchRooms()}
        />
      )}
    </div>
  );
}