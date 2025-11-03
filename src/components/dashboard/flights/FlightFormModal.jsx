"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export function FlightFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    airline_name: "",
    flight_number: "",
    origin_airport: "",
    destination_airport: "",
    departure_time: "",
    arrival_time: "",
    price: "",
    available_seats: "",
    image: ""
  });

  // keep formData in sync when editing
  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        airline_name: "",
        flight_number: "",
        origin_airport: "",
        destination_airport: "",
        departure_time: "",
        arrival_time: "",
        price: "",
        available_seats: "",
        image: ""
      });
  }, [initialData]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // delegate API calls to the parent via onSubmit
      if (onSubmit) await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting flight form:", error);
      toast.error(error.message || "Failed to save flight");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Flight" : "Add New Flight"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Airline Name</label>
            <Input
              value={formData.airline_name}
              onChange={(e) => setFormData({ ...formData, airline_name: e.target.value })}
              placeholder="Enter airline name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Flight Number</label>
            <Input
              value={formData.flight_number}
              onChange={(e) => setFormData({ ...formData, flight_number: e.target.value })}
              placeholder="Enter flight number"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Origin Airport</label>
            <Input
              value={formData.origin_airport}
              onChange={(e) => setFormData({ ...formData, origin_airport: e.target.value })}
              placeholder="Enter origin airport"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Destination Airport</label>
            <Input
              value={formData.destination_airport}
              onChange={(e) => setFormData({ ...formData, destination_airport: e.target.value })}
              placeholder="Enter destination airport"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Departure Time</label>
            <Input
              type="datetime-local"
              value={formData.departure_time}
              onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Arrival Time</label>
            <Input
              type="datetime-local"
              value={formData.arrival_time}
              onChange={(e) => setFormData({ ...formData, arrival_time: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price ($)</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Available Seats</label>
            <Input
              type="number"
              value={formData.available_seats}
              onChange={(e) => setFormData({ ...formData, available_seats: e.target.value })}
              placeholder="Enter available seats"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : initialData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}