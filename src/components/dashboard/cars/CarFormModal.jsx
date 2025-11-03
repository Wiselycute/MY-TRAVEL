"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function CarFormModal({ isOpen, onClose, onSubmit, car }) {
  const [formData, setFormData] = useState({
    provider_name: "",
    model: "",
    category: "economy",
    seats: 4,
    price_per_day: 0,
    availability_status: true,
    image: "",
  });

  useEffect(() => {
    if (car) {
      setFormData(car);
    } else {
      setFormData({
        provider_name: "",
        model: "",
        category: "economy",
        seats: 4,
        price_per_day: 0,
        availability_status: true,
        image: "",
      });
    }
  }, [car]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{car ? "Edit Car" : "Add New Car"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider_name">Provider Name</Label>
            <Input
              id="provider_name"
              name="provider_name"
              value={formData.provider_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="economy">Economy</option>
              <option value="SUV">SUV</option>
              <option value="luxury">Luxury</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seats">Number of Seats</Label>
            <Input
              id="seats"
              name="seats"
              type="number"
              min="2"
              max="12"
              value={formData.seats}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_per_day">Price per Day</Label>
            <Input
              id="price_per_day"
              name="price_per_day"
              type="number"
              min="0"
              step="0.01"
              value={formData.price_per_day}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/car-image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability_status">Availability Status</Label>
            <Select
              id="availability_status"
              name="availability_status"
              value={formData.availability_status.toString()}
              onChange={(e) => handleChange({
                target: {
                  name: "availability_status",
                  value: e.target.value === "true",
                },
              })}
              required
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </Select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {car ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}