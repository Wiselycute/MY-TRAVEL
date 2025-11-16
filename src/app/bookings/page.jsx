// // "use client";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-hot-toast";
// // import { motion } from "framer-motion";
// // import PaymentModal from "@/components/payment/PaymentModal";

// // // // ✅ Payment Modal Component
// // // function PaymentModal({ booking, onClose, onSuccess }) {
// // //   const [paymentMethod, setPaymentMethod] = useState("card");
// // //   const [loading, setLoading] = useState(false);

// // //   const handlePayment = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const paymentData = {
// // //         booking_id: booking._id,
// // //         user_id: booking.user_id,
// // //         amount: booking.total_amount,
// // //         payment_method: paymentMethod,
// // //         payment_status: "success",
// // //       };

// // //       // ✅ Send payment to backend
// // //       await axios.post("/api/payments", paymentData);

// // //       // ✅ Update booking status to confirmed/paid
// // //       await axios.patch(`/api/bookings/${booking._id}`, {
// // //         status: "confirmed",
// // //       });

// // //       toast.success("Payment successful!");
// // //       onSuccess(booking._id);
// // //       onClose();
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error("Payment failed!");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
// // //       <motion.div
// // //         initial={{ opacity: 0, scale: 0.9 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //         className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl w-[90%] max-w-md"
// // //       >
// // //         <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">
// // //           Proceed to Payment
// // //         </h2>

// // //         <p className="text-gray-600 dark:text-gray-300 mb-3 text-center">
// // //           Booking ID: <span className="font-medium">{booking._id}</span>
// // //         </p>
// // //         <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
// // //           Amount: <span className="font-semibold">${booking.total_amount}</span>
// // //         </p>

// // //         <div className="mb-5">
// // //           <label className="block mb-2 text-gray-700 dark:text-gray-300">
// // //             Select Payment Method
// // //           </label>
// // //           <select
// // //             value={paymentMethod}
// // //             onChange={(e) => setPaymentMethod(e.target.value)}
// // //             className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
// // //           >
// // //             <option value="card">Credit / Debit Card</option>
// // //             <option value="paypal">PayPal</option>
// // //             <option value="mobile_money">Mobile Money</option>
// // //           </select>
// // //         </div>

// // //         <div className="flex justify-between items-center mt-6">
// // //           <button
// // //             onClick={onClose}
// // //             className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
// // //           >
// // //             Cancel
// // //           </button>
// // //           <button
// // //             onClick={handlePayment}
// // //             disabled={loading}
// // //             className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium"
// // //           >
// // //             {loading ? "Processing..." : "Pay Now"}
// // //           </button>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // }

// // // ✅ Main Bookings Page
// // export default function BookingsPage() {
// //   const [bookings, setBookings] = useState([]);
// //   const [selectedBooking, setSelectedBooking] = useState(null);

// //   useEffect(() => {
// //     axios.get("/api/bookings").then((res) => {
// //       setBookings(res.data.filter((b) => b.booking_type === "hotel"));
// //     });
// //   }, []);

// //   const handleCancel = async (id) => {
// //     try {
// //       await axios.patch(`/api/bookings/${id}`, { status: "cancelled" });
// //       toast.success("Booking cancelled!");
// //       setBookings((prev) =>
// //         prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
// //       );
// //     } catch (err) {
// //       toast.error("Failed to cancel booking");
// //     }
// //   };

// //   const handlePaymentSuccess = (bookingId) => {
// //     setBookings((prev) =>
// //       prev.map((b) =>
// //         b._id === bookingId ? { ...b, status: "paid" } : b
// //       )
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-background p-8">
// //       <h1 className="text-4xl font-bold text-center mb-8">Hotel Bookings</h1>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {bookings.map((b) => (
// //           <div
// //             key={b._id}
// //             className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
// //           >
// //             <h2 className="text-2xl font-semibold mb-2">Hotel Booking</h2>
// //             <p className="text-gray-500 mb-2">Status: {b.status}</p>
// //             <p className="text-gray-500 mb-2">Amount: ${b.total_amount}</p>

// //             {b.status === "paid" || b.status === "confirmed" ? (
// //               <p className="text-green-600 font-semibold mt-4">✅ Paid</p>
// //             ) : b.status === "cancelled" ? (
// //               <p className="text-red-500 font-semibold mt-4">❌ Cancelled</p>
// //             ) : (
// //               <div className="flex gap-3 mt-4">
// //                 <button
// //                   onClick={() => setSelectedBooking(b)}
// //                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //                 >
// //                   Proceed to Payment
// //                 </button>
// //                 <button
// //                   onClick={() => handleCancel(b._id)}
// //                   className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {selectedBooking && (
// //         <PaymentModal
// //           booking={selectedBooking}
// //           onClose={() => setSelectedBooking(null)}
// //           onSuccess={handlePaymentSuccess}
// //         />
// //       )}
// //     </div>
// //   );
// // }
// "use client";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import PaymentModal from '@/components/payment/PaymentModal';
// import EditBookingModal from '../../components/bookings/EditBookingModal';


// export default function BookingsPage() {
//   const [bookings, setBookings] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showPayment, setShowPayment] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);


//   const fetchBookings = async () => {
//     // read logged-in user id from localStorage
//     const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
//     let userId = null;
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         if (parsed.user && (parsed.user.id || parsed.user._id)) {
//           userId = parsed.user.id || parsed.user._id;
//         } else if (parsed._id || parsed.id) {
//           userId = parsed._id || parsed.id;
//         }
//       } catch (e) {
//         console.warn('Failed to parse stored user', e);
//       }
//     }

//     if (!userId) {
//       // not signed in — clear bookings and prompt sign-in
//       setBookings([]);
//       console.warn('No logged-in user found when fetching bookings');
//       return;
//     }

//     const res = await axios.get(`/api/bookings?user_id=${userId}`);
//     // API returns either array or { success, data }
//     if (Array.isArray(res.data)) setBookings(res.data);
//     else if (res.data && res.data.success) setBookings(res.data.data || []);
//     else if (res.data && res.data.data) setBookings(res.data.data);
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleDelete = async (id) => {
//     await axios.delete(`/api/bookings/${id}`);
//     toast.success('Booking deleted');
//     fetchBookings();
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6 text-orange-500">My Bookings</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {bookings.map((b) => (
//           <div key={b._id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
//             <img
//               src={
//                 b.car_details?.image ||
//                 b.hotel_details?.image ||
//                 b.flight_details?.image
//               }
//               alt="Booking"
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <p className="text-gray-500 capitalize mb-1">{b.booking_type}</p>
//               <p className="font-semibold">
//                 {b.car_details?.model ||
//                   b.hotel_details?.name ||
//                   b.flight_details?.airline}
//               </p>
//               <p className="text-orange-500 font-semibold mt-2">
//                 ${b.total_amount}
//               </p>
//               <p className="text-sm text-gray-400 mt-1">
//                 {new Date(b.booking_date).toLocaleDateString()}
//               </p>

//               <div className="flex gap-2 mt-4">
//   {b.status === 'pending' && (
//     <>
//       <button
//         onClick={() => {
//           setSelectedBooking(b);
//           setShowPayment(true);
//         }}
//         className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 rounded-lg"
//       >
//         Pay
//       </button>
//       <button
//         onClick={() => {
//           setSelectedBooking(b);
//           setShowEdit(true);
//         }}
//         className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-lg"
//       >
//         Edit
//       </button>
//       <button
//         onClick={() => handleDelete(b._id)}
//         className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg"
//       >
//         Cancel
//       </button>
//     </>
//   )}

//                 {b.status === 'paid' && (
//                   <button
//                     onClick={() => handleDelete(b._id)}
//                     className="w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg"
//                   >
//                     Delete Record
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showPayment && selectedBooking && (
//         <PaymentModal
//           booking={selectedBooking}
//           onClose={() => setShowPayment(false)}
//           onPaymentSuccess={() => {
//             setShowPayment(false);
//             fetchBookings();
//           }}
//         />
//       )}
//       {showEdit && selectedBooking && (
//   <EditBookingModal
//     booking={selectedBooking}
//     onClose={() => setShowEdit(false)}
//     onUpdate={() => {
//       setShowEdit(false);
//       fetchBookings();
//     }}
//   />
// )}

//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import PaymentModal from "@/components/payment/PaymentModal";
import EditBookingModal from "../../components/bookings/EditBookingModal";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const fetchBookings = async () => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    let userId = null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        userId =
          parsed?.user?.id ||
          parsed?.user?._id ||
          parsed?._id ||
          parsed?.id ||
          null;
      } catch (e) {
        console.warn("Failed to parse stored user", e);
      }
    }

    if (!userId) {
      setBookings([]);
      return;
    }

    const res = await axios.get(`/api/bookings?user_id=${userId}`);
    setBookings(res.data?.data || res.data || []);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/bookings/${id}`);
    toast.success("Booking deleted");
    fetchBookings();
  };

  return (
    <div className="p-8 bg-background">
      <h1 className="text-3xl mt-11  font-bold mb-6 text-orange-500">My Bookings</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={
                b.car_details?.image ||
                b.hotel_details?.image ||
                b.flight_details?.image
              }
              alt="Booking"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-500 capitalize mb-1">{b.booking_type}</p>

              <p className="font-semibold">
                {b.car_details?.model ||
                  b.hotel_details?.name ||
                  b.flight_details?.airline}
              </p>

              <p className="text-orange-500 font-semibold mt-2">
                ${b.total_amount}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {new Date(b.booking_date).toLocaleDateString()}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-4">
                {b.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setShowPayment(true);
                      }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 rounded-lg"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setShowEdit(true);
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(b._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {/* When paid → Only show Delete */}
                {b.status === "paid" && (
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg"
                  >
                    Delete Record
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && selectedBooking && (
        <PaymentModal
          booking={selectedBooking}
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={() => {
            setShowPayment(false);
            fetchBookings(); // refresh UI after payment
          }}
        />
      )}

      {/* EDIT MODAL */}
      {showEdit && selectedBooking && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={() => setShowEdit(false)}
          onUpdate={() => {
            setShowEdit(false);
            fetchBookings();
          }}
        />
      )}
    </div>
  );
}
