"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

// 🧩 Booking Modal Component
function BookingModal({ car, onClose }) {
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    try {
      setLoading(true);
      const totalPrice = car.price_per_day * days;

      // attempt to read logged-in user from localStorage
      const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      let userId = null;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // handle different shapes: { user: { id } } or direct user object with _id/id
          if (parsed.user && (parsed.user.id || parsed.user._id)) {
            userId = parsed.user.id || parsed.user._id;
          } else if (parsed._id || parsed.id) {
            userId = parsed._id || parsed.id;
          }
        } catch (e) {
          console.warn('Failed to parse stored user from localStorage', e);
        }
      }

      if (!userId) {
        toast.error('Please sign in to make a booking');
        setLoading(false);
        return;
      }

      await axios.post("/api/bookings", {
        // match the Booking schema: set booking_type and nest car details
        booking_type: "car",
        user_id: userId,
        car_id: car._id,
        total_amount: totalPrice,
        // map frontend "days" to schema's car_details.number_of_days
        car_details: {
          model: car.model,
          category: car.category,
          price_per_day: car.price_per_day,
          number_of_days: days,
          image: car.image,
        },
      });

      toast.success("Booking confirmed!");
      onClose();
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-4 text-orange-500">
          Confirm Booking
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-3">
          <strong>Car:</strong> {car.model}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          <strong>Price per day:</strong> ${car.price_per_day}
        </p>

        <label className="block mb-2 font-medium">Number of days</label>
        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full p-2 border rounded-md bg-transparent dark:border-gray-700 mb-4"
        />

        <p className="text-lg font-semibold mb-4">
          Total: ${car.price_per_day * days}
        </p>

        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full text-white py-2 rounded-lg font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 mt-3 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/api/cars/${id}`);
        console.log("Car data:", res.data);

        if (res.data.success) {
          setCar(res.data.data);
        } else {
          toast.error("Car not found!");
        }
      } catch (err) {
        console.error("Error fetching car:", err);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
         <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-gray-500">
        <p className="text-lg">Car not found</p>
        <Link
          href="/cars"
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto bg-background">
      <Link
        href="/cars"
        className="flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-4"
      >
        <ArrowLeft size={18} /> Back to Cars
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={car.image}
          alt={car.model}
          className="rounded-2xl shadow-xl w-full h-96 object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">{car.model}</h1>
          <p className="text-gray-500 mb-3 capitalize">{car.category}</p>
          <p className="text-lg mb-2">
            <strong>Provider:</strong> {car.provider_name}
          </p>
          <p className="text-lg mb-2">
            <strong>Seats:</strong> {car.seats}
          </p>
          <p className="text-2xl font-semibold text-primary mb-4">
            ${car.price_per_day}/day
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {showModal && (
        <BookingModal car={car} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
