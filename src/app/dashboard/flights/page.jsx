"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { FlightFormModal } from "@/components/dashboard/flights/FlightFormModal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

const columns = [
	{
		header: "Flight",
		cell: (row) => (
			<div className="flex items-center gap-2">
				<div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center overflow-hidden">
					{row.image ? (
						<img src={row.image} alt={row.airline_name} className="w-full h-full object-cover" />
					) : (
						<span className="text-primary">{row.airline_name.charAt(0).toUpperCase()}</span>
					)}
				</div>
				<div>
					<div className="font-medium">{row.airline_name}</div>
					<div className="text-xs text-muted-foreground">{row.flight_number}</div>
				</div>
			</div>
		),
	},
	{
		header: "Route",
		cell: (row) => (
			<div className="text-sm">
				<div>{row.origin_airport}</div>
				<div className="text-muted-foreground">→</div>
				<div>{row.destination_airport}</div>
			</div>
		),
	},
	{
		header: "Departure",
		cell: (row) => new Date(row.departure_time).toLocaleString(),
	},
	{
		header: "Arrival",
		cell: (row) => new Date(row.arrival_time).toLocaleString(),
	},
	{
		header: "Price",
		cell: (row) => `$${Number(row.price).toFixed(2)}`,
	},
	{
		header: "Seats",
		cell: (row) => row.available_seats,
	},
];

export default function FlightsPage() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedFlight, setSelectedFlight] = useState(null);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
	});
	const [filters, setFilters] = useState({
		search: "",
		origin: "",
		destination: "",
	});

	const fetchFlights = async () => {
		try {
			const queryParams = new URLSearchParams({
				page: pagination.currentPage,
				limit: 10,
				...filters,
			});

			const response = await api.get(`/flights?${queryParams}`);
			const result = response.data;

			// Support both response shapes:
			// 1) API returns an array: [ {...}, {...} ]
			// 2) API returns an object: { success: true, flights: [...], total: N }
			if (Array.isArray(result)) {
				setData(result);
				setPagination((prev) => ({ ...prev, totalPages: Math.ceil(result.length / 10) || 1 }));
			} else {
				const arr = result.flights || result.data || [];
				setData(arr || []);
				const total = result.total || (arr?.length || 0);
				setPagination((prev) => ({ ...prev, totalPages: Math.ceil(total / 10) || 1 }));
			}
		} catch (error) {
			console.error("Error fetching flights:", error);
			toast.error("Failed to load flights");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFlights();
	}, [pagination.currentPage, filters]);

	const handleCreateFlight = async (flightData) => {
		try {
			await api.post('/flights', flightData);
			await fetchFlights();
			toast.success('Flight created successfully');
		} catch (error) {
			console.error('Error creating flight:', error);
			toast.error('Failed to create flight');
			throw error;
		}
	};

	const handleUpdateFlight = async (flightData) => {
		try {
			await api.put(`/flights/${selectedFlight._id || selectedFlight.id}`, flightData);
			await fetchFlights();
			toast.success('Flight updated successfully');
		} catch (error) {
			console.error('Error updating flight:', error);
			toast.error('Failed to update flight');
			throw error;
		}
	};

	const handleDeleteFlight = async (flightId) => {
		if (!confirm("Are you sure you want to delete this flight?")) return;

		try {
			await api.delete(`/flights/${flightId}`);
			await fetchFlights();
			toast.success("Flight deleted successfully");
		} catch (error) {
			console.error("Error deleting flight:", error);
			toast.error(error.message || "Failed to delete flight");
		}
	};

	const renderActions = (flight) => (
		<div className="flex items-center gap-2">
			<button
				onClick={() => {
					setSelectedFlight(flight);
					setIsModalOpen(true);
				}}
				className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-8 px-3"
			>
				Edit
				</button>
			<button
				onClick={() => handleDeleteFlight(flight._id || flight.id)}
				className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 px-3"
			>
				Delete
			</button>
		</div>
	);

	const tableColumns = [
		...columns,
		{
			header: "Actions",
			cell: (row) => renderActions(row),
		},
	];

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Flights Management</h1>
				<Button
					onClick={() => {
						setSelectedFlight(null);
						setIsModalOpen(true);
					}}
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Flight
				</Button>
			</div>

			<DataTable
				columns={tableColumns}
				data={data}
				loading={loading}
				pagination={{
					currentPage: pagination.currentPage,
					totalPages: pagination.totalPages,
					onPageChange: (page) => setPagination((prev) => ({ ...prev, currentPage: page })),
				}}
				onRowAction={(row) => {
					setSelectedFlight(row);
					setIsModalOpen(true);
				}}
			/>

			<FlightFormModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				initialData={selectedFlight}
				onSuccess={() => {
					fetchFlights();
					setIsModalOpen(false);
					setSelectedFlight(null);
				}}
			/>
		</div>
	);
}