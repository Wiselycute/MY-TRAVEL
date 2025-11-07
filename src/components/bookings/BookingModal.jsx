// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import PaymentModal from './../payment/PaymentModal';

// export default function BookingModal({ room, onClose, onBookingUpdate }) {
//   const [loading, setLoading] = useState(false);
//   const [booking, setBooking] = useState(null);
//   const [showPayment, setShowPayment] = useState(false);
  
//   const handlePaymentSuccess = () => {
//     // Update local booking state
//     setBooking(prev => ({
//       ...prev,
//       status: "paid"
//     }));
    
//     // Notify parent component to update bookings list if needed
//     if (onBookingUpdate) {
//       onBookingUpdate();
//     }
//   };

//   const getStoredUserId = () => {
//     if (typeof window === 'undefined') return null;
//     try {
//       const raw = localStorage.getItem('user');
//       if (!raw) return null;
//       const parsed = JSON.parse(raw);
//       // result.data from authentication may be { message, user: { id, ... } }
//       const userObj = parsed.user || parsed;
//       return userObj?.id || userObj?._id || null;
//     } catch (e) {
//       console.error('Failed to parse stored user:', e);
//       return null;
//     }
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       setLoading(true);

//       const userId = getStoredUserId();
//       if (!userId) {
//         toast.error('You must be signed in to make a booking');
//         setLoading(false);
//         return;
//       }

//       const bookingData = {
//         user_id: userId,
//         booking_type: "hotel",
//         total_amount: room.price,
//         status: "pending",
//       };

//       const res = await axios.post("/api/bookings", bookingData);
//       // API returns booking object in res.data
//       setBooking(res.data);
//       toast.success("Booking created successfully!");
//     } catch (err) {
//       toast.error("Booking failed!");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelBooking = async () => {
//     if (!booking) return onClose();
//     try {
//       // If booking is already paid, delete both booking and payment
//       if (booking.status === "paid") {
//         // Delete associated payment first
//         const payments = await axios.get("/api/payments");
//         const bookingPayment = payments.data.find(p => p.booking_id === booking._id);
//         if (bookingPayment) {
//           await axios.delete(`/api/payments/${bookingPayment._id}`);
//         }
//       }
      
//       // Delete the booking
//       await axios.delete(`/api/bookings/${booking._id}`);
//       toast.success("Booking deleted successfully");
//       if (onBookingUpdate) {
//         onBookingUpdate(); // Update the parent component's booking list
//       }
//       onClose();
//     } catch (err) {
//       toast.error("Failed to delete booking!");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
//       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-96 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-gray-400 hover:text-gray-200"
//         >
//           ✕
//         </button>

//         {!booking ? (
//           <>
//             <h2 className="text-2xl font-semibold mb-4 text-center text-orange-500">
//               Book {room.room_type} Room
//             </h2>
//             <p className="mb-4 text-gray-500 dark:text-gray-300 text-center">
//               Price: <span className="text-orange-400 font-semibold">${room.price}</span> / night
//             </p>

//             <button
//               onClick={handleConfirmBooking}
//               disabled={loading}
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
//             >
//               {loading ? "Booking..." : "Confirm Booking"}
//             </button>
//           </>
//         ) : (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-center text-orange-400">
//               {booking.status === "paid" ? "Payment Complete!" : "Booking Confirmed!"}
//             </h2>
//             {booking.status === "paid" ? (
//               <div className="text-center">
//                 <p className="mb-4">Thank you for your payment!</p>
//                 <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
//                   <p className="text-green-600 dark:text-green-400 font-semibold">✅ Paid</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//                     Amount: ${booking.total_amount}
//                   </p>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
//                 >
//                   Close
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <p className="text-center mb-6">
//                   Your booking is now pending payment. Choose an option below.
//                 </p>
//                 <div className="flex flex-col gap-3">
//                   <button
//                     onClick={() => setShowPayment(true)}
//                     className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
//                   >
//                     Proceed to Payment
//                   </button>
//                   <button
//                     onClick={handleCancelBooking}
//                     className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
//                   >
//                     <span>🗑️</span> Delete Booking
//                   </button>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>

//       {showPayment && booking && (
//         <PaymentModal
//           booking={booking}
//           onClose={() => {
//             setShowPayment(false);
//             // Refresh booking data after payment
//             setBooking(prev => ({
//               ...prev,
//               status: "paid"
//             }));
//           }}
//           onPaymentSuccess={handlePaymentSuccess}
//         />
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function BookingModal({ item, type, onClose, onBookingUpdate }) {
  const [loading, setLoading] = useState(false);

  const getStoredUserId = () => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const userObj = parsed.user || parsed;
      return userObj?.id || userObj?._id || null;
    } catch {
      return null;
    }
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      const userId = getStoredUserId();
      if (!userId) {
        toast.error("You must be logged in to make a booking");
        return;
      }

      // Dynamically build booking details
      const payload = {
        user_id: userId,
        booking_type: type,
        status: "pending",
        booking_date: new Date(),
        total_amount:
          type === "car"
            ? item.price_per_day * (item.number_of_days || 1)
            : type === "hotel"
            ? item.price_per_night * (item.number_of_nights || 1)
            : item.ticket_price,
        car_details: type === "car" ? item : undefined,
        hotel_details: type === "hotel" ? item : undefined,
        flight_details: type === "flight" ? item : undefined,
      };

      const res = await axios.post("/api/bookings", payload);

      if (res.data.success) {
        toast.success("Booking created successfully!");
        onBookingUpdate?.();
        onClose();
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-[400px] relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        <div className="text-center">
          {/* guard against missing item and provide a fallback image */}
          <img
            src={
              item?.image || item?.car_details?.image || item?.hotel_details?.image || '/assets/images/placeholder.png'
            }
            alt={item?.model || item?.name || item?.hotel_name || 'Booking'}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold text-orange-500 mb-2">
            Book {type === "car" ? (item?.model || 'car') : (item?.name || 'room')}
          </h2>

          <p className="text-gray-400 mb-3 capitalize">Type: {type}</p>

          <p className="text-gray-600 font-medium mb-4">
            {type === "car"
              ? `Price per day: $${item?.price_per_day ?? item?.price ?? 0}`
              : type === "hotel"
              ? `Price per night: $${item?.price_per_night ?? item?.price ?? 0}`
              : `Ticket Price: $${item?.ticket_price ?? item?.price ?? 0}`}
          </p>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

          <button
            onClick={onClose}
            className="mt-2 w-full border border-gray-300 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
