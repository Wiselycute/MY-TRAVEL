"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { toast } from "react-hot-toast";

export function PaymentFormModal({ isOpen, onClose, onSubmit, payment = null }) {
  const [formData, setFormData] = useState({
    booking_id: "",
    user_id: "",
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: "card",
    payment_status: "pending"
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (payment) {
      setFormData({
        ...payment,
        payment_date: new Date(payment.payment_date).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        booking_id: "",
        user_id: "",
        amount: 0,
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: "card",
        payment_status: "pending"
      });
    }
  }, [payment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error(error.message || "Failed to save payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {payment ? "Edit Payment" : "Add New Payment"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Booking ID</label>
            <Input
              value={formData.booking_id}
              onChange={(e) => setFormData({ ...formData, booking_id: e.target.value })}
              placeholder="Enter booking ID"
              required
            />
          </div>

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
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Payment Date</label>
            <Input
              type="date"
              value={formData.payment_date}
              onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Payment Method</label>
            <Select
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              required
            >
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
              <option value="mobile_money">Mobile Money</option>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Payment Status</label>
            <Select
              value={formData.payment_status}
              onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
              required
            >
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </Select>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : payment ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}