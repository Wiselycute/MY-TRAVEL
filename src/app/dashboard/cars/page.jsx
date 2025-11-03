"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { CarFormModal } from "@/components/dashboard/cars/CarFormModal";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

const columns = [
  {
    header: "Car",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center overflow-hidden">
          {row.image ? (
            <img src={row.image} alt={row.model} className="w-full h-full object-cover" />
          ) : (
            <span className="text-primary">{row.model.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <div className="font-medium">{row.model}</div>
          <div className="text-xs text-muted-foreground">{row.provider_name}</div>
        </div>
      </div>
    ),
  },
  {
    header: "Category",
    cell: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        row.category === "luxury"
          ? "bg-purple-100 text-purple-800"
          : row.category === "SUV"
          ? "bg-blue-100 text-blue-800"
          : "bg-green-100 text-green-800"
      }`}>
        {row.category}
      </span>
    ),
  },
  {
    header: "Seats",
    cell: (row) => row.seats,
  },
  {
    header: "Price/Day",
    cell: (row) => `$${row.price_per_day.toFixed(2)}`,
  },
  {
    header: "Status",
    cell: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        row.availability_status
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}>
        {row.availability_status ? "Available" : "Unavailable"}
      </span>
    ),
  },
];

export default function CarsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    availability: '',
  });

  const fetchCars = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        ...filters
      });
      const response = await api.get(`/cars?${queryParams}`);
      const result = response.data;

      // API sometimes returns an array directly, or an object with { cars, total }
      if (Array.isArray(result)) {
        setData(result);
        setPagination((prev) => ({ ...prev, totalPages: Math.ceil(result.length / 10) || 1 }));
      } else {
        setData(result.cars || result.data || []);
        setPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil((result.total || (result.cars?.length || 0)) / 10) || 1,
        }));
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [pagination.currentPage, filters]);

  const handleCreateCar = async (carData) => {
    try {
      await api.post("/cars", carData);
      await fetchCars();
      toast.success("Car created successfully");
    } catch (error) {
      console.error("Error creating car:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const handleUpdateCar = async (carData) => {
    try {
      await api.put(`/cars/${selectedCar._id || selectedCar.id}`, carData);
      await fetchCars();
      toast.success("Car updated successfully");
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const handleDeleteCar = async (carId) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      await api.delete(`/cars/${carId}`);
      await fetchCars();
      toast.success("Car deleted successfully");
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error(error.message);
    }
  };

  const renderActions = (car) => {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setSelectedCar(car);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteCar(car._id)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 px-3"
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
        <button
          onClick={() => {
            setSelectedCar(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Car
        </button>
      </div>
      
      <div className="grid gap-6">
        <DataTable
          title="Cars Management"
          columns={[
            ...columns,
            {
              header: "Actions",
              cell: (row) => renderActions(row)
            }
          ]}
          data={data}
          loading={loading}
          pagination={{
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            onPageChange: (page) => setPagination(prev => ({ ...prev, currentPage: page }))
          }}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      <CarFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCar(null);
        }}
        onSubmit={selectedCar ? handleUpdateCar : handleCreateCar}
        car={selectedCar}
      />
    </div>
  );
}