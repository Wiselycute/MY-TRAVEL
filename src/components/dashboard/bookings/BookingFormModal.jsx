"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { toast } from "react-hot-toast";

export function BookingFormModal({ isOpen, onClose, onSubmit, booking = null }) {
  const [formData, setFormData] = useState({
    user_id: "",
    booking_type: "flight",
    booking_date: new Date().toISOString().split('T')[0],
    status: "pending",
    total_amount: 0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (booking) {
      setFormData({
        ...booking,
        booking_date: new Date(booking.booking_date).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        user_id: "",
        booking_type: "flight",
        booking_date: new Date().toISOString().split('T')[0],
        status: "pending",
        total_amount: 0
      });
    }
  }, [booking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error(error.message || "Failed to save booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {booking ? "Edit Booking" : "Add New Booking"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">User ID</label>
            <Input
              value={formData.user_id}
              onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
              placeholder="Enter user ID"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Booking Type</label>
            <Select
              value={formData.booking_type}
              onChange={(e) => setFormData({ ...formData, booking_type: e.target.value })}
              required
            >
              <option value="flight">Flight</option>
              <option value="hotel">Hotel</option>
              <option value="car">Car</option>
              <option value="activity">Activity</option>
              <option value="insurance">Insurance</option>
              <option value="package">Package</option>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Booking Date</label>
            <Input
              type="date"
              value={formData.booking_date}
              onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Total Amount</label>
            <Input
              type="number"
              value={formData.total_amount}
              onChange={(e) => setFormData({ ...formData, total_amount: Number(e.target.value) })}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : booking ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}