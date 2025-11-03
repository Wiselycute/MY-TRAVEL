"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

export function HotelFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    hotel_name: "",
    location: "",
    star_rating: "",
    description: "",
    price_per_night: "",
    available_rooms: "",
    image: ""
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        hotel_name: "",
        location: "",
        star_rating: "",
        description: "",
        price_per_night: "",
        available_rooms: "",
        image: ""
      });
  }, [initialData]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (onSubmit) await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting hotel form:", error);
      toast.error(error.message || "Failed to save hotel");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Hotel" : "Add New Hotel"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Hotel Name</label>
            <Input
              value={formData.hotel_name}
              onChange={(e) => setFormData({ ...formData, hotel_name: e.target.value })}
              placeholder="Enter hotel name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter hotel location"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Star Rating</label>
            <Input
              type="number"
              min="1"
              max="5"
              value={formData.star_rating}
              onChange={(e) => setFormData({ ...formData, star_rating: e.target.value })}
              placeholder="Enter star rating (1-5)"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter hotel description"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price per Night ($)</label>
            <Input
              type="number"
              value={formData.price_per_night}
              onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
              placeholder="Enter price per night"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Available Rooms</label>
            <Input
              type="number"
              value={formData.available_rooms}
              onChange={(e) => setFormData({ ...formData, available_rooms: e.target.value })}
              placeholder="Enter number of available rooms"
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