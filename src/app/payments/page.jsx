// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { CreditCard, Smartphone, Wallet, Filter, Search } from "lucide-react";

// export default function PaymentsPage() {
//   const [payments, setPayments] = useState([]);
//   const [filteredPayments, setFilteredPayments] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await axios.get("/api/payments");
//         const data = res.data.data || [];
//         setPayments(data);
//         setFilteredPayments(data);
//       } catch (err) {
//         console.error("Error fetching payments:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPayments();
//   }, []);

//   useEffect(() => {
//     let filtered = payments;

//     if (filter !== "all") {
//       filtered = filtered.filter((p) => p.payment_method === filter);
//     }

//     if (searchTerm.trim()) {
//       filtered = filtered.filter(
//         (p) =>
//           (p.booking_id && p.booking_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (p.user_id && p.user_id.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }

//     setFilteredPayments(filtered);
//   }, [filter, searchTerm, payments]);

//   const getMethodIcon = (method) => {
//     switch (method) {
//       case "card":
//         return <CreditCard className="w-5 h-5 text-blue-500" />;
//       case "paypal":
//         return <Wallet className="w-5 h-5 text-indigo-500" />;
//       case "mobile_money":
//         return <Smartphone className="w-5 h-5 text-green-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-8">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-4xl font-bold text-center mb-6"
//       >
//         💳 Payment History
//       </motion.h1>

//       {/* Sticky Filter/Search Bar */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 py-4 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-center gap-4"
//       >
//         <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
//           <Filter className="w-5 h-5" />
//           <span className="font-semibold">Filter by Method:</span>
//         </div>

//         <div className="flex gap-2 flex-wrap justify-center">
//           {["all", "card", "paypal", "mobile_money"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setFilter(type)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                 filter === type
//                   ? "bg-primary text-white shadow-md"
//                   : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//               }`}
//             >
//               {type === "all"
//                 ? "All"
//                 : type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//             </button>
//           ))}
//         </div>

//         {/* Search Input */}
//         <div className="relative w-full md:w-80 mt-3 md:mt-0">
//           <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search by Booking ID or User ID..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
//           />
//         </div>
//       </motion.div>

//       {/* Payment List */}
//       {loading ? (
//         <p className="text-center text-gray-500">Loading payments...</p>
//       ) : filteredPayments.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {filteredPayments.map((payment) => (
//             <motion.div
//               key={payment._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg transition hover:shadow-2xl"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   Payment #{payment._id.slice(-6)}
//                 </h3>
//                 {getMethodIcon(payment.payment_method)}
//               </div>

//               <div className="space-y-2 text-gray-600 dark:text-gray-300">
//                 <p>
//                   <span className="font-semibold">Amount:</span> ${payment.amount}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Method:</span>{" "}
//                   {payment.payment_method
//                     .replace("_", " ")
//                     .replace(/\b\w/g, (l) => l.toUpperCase())}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Status:</span>{" "}
//                   <span
//                     className={`font-semibold ${
//                       payment.payment_status === "success"
//                         ? "text-green-600"
//                         : payment.payment_status === "failed"
//                         ? "text-red-600"
//                         : "text-yellow-500"
//                     }`}
//                   >
//                     {payment.payment_status.toUpperCase()}
//                   </span>
//                 </p>
//                 <p>
//                   <span className="font-semibold">Booking ID:</span>{" "}
//                   {payment.booking_id
//                     ? (typeof payment.booking_id === 'object'
//                         ? payment.booking_id._id || "N/A"
//                         : payment.booking_id)
//                     : "N/A"}
//                 </p>
//                 <p>
//                   <span className="font-semibold">User ID:</span>{" "}
//                   {payment.user_id
//                     ? (typeof payment.user_id === 'object'
//                         ? payment.user_id.name || payment.user_id.email || payment.user_id._id || "N/A"
//                         : payment.user_id)
//                     : "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {new Date(payment.payment_date).toLocaleString()}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-400 text-lg">
//           No payments found for this method or search query.
//         </p>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Wallet, Filter, Search, Trash } from "lucide-react";
import { toast } from "react-hot-toast";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // ✅ FETCH LOGGED-IN USER ID
  // -------------------------------
  const getUserId = () => {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem("user");
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);

      if (parsed.user && (parsed.user.id || parsed.user._id))
        return parsed.user.id || parsed.user._id;

      if (parsed._id || parsed.id) return parsed._id || parsed.id;

      return null;
    } catch {
      return null;
    }
  };

  // -------------------------------
  // ✅ FETCH PAYMENTS FOR USER ONLY
  // -------------------------------
  const fetchPayments = async () => {
    const userId = getUserId();
    if (!userId) {
      setPayments([]);
      setFilteredPayments([]);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`/api/payments?user_id=${userId}`);
      const data = res.data.data || [];

      setPayments(data);
      setFilteredPayments(data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // -------------------------------
  // 🔍 FILTER + SEARCH
  // -------------------------------
  useEffect(() => {
    let filtered = payments;

    if (filter !== "all") {
      filtered = filtered.filter((p) => p.payment_method === filter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (p) =>
          (p.booking_id &&
            p.booking_id.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.user_id &&
            p.user_id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPayments(filtered);
  }, [filter, searchTerm, payments]);

  // -------------------------------
  // ❌ DELETE PAYMENT RECORD
  // -------------------------------
  const deletePayment = async (id) => {
    try {
      await axios.delete(`/api/payments/${id}`);
      toast.success("Payment record deleted");
      fetchPayments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record");
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-5 h-5 text-blue-500" />;
      case "paypal":
        return <Wallet className="w-5 h-5 text-indigo-500" />;
      case "mobile_money":
        return <Smartphone className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-6"
      >
        💳 Payment History
      </motion.h1>

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 py-4 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filter by Method:</span>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {["all", "card", "paypal", "mobile_money"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === type
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {type === "all"
                ? "All"
                : type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80 mt-3 md:mt-0">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Booking ID or User ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* PAYMENT CARDS */}
      {loading ? (
        <p className="text-center text-gray-500">Loading payments...</p>
      ) : filteredPayments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPayments.map((payment) => (
            <motion.div
              key={payment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg transition hover:shadow-2xl"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Payment #{payment._id.slice(-6)}
                </h3>
                {getMethodIcon(payment.payment_method)}
              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p><span className="font-semibold">Amount:</span> ${payment.amount}</p>
                <p>
                  <span className="font-semibold">Method:</span>{" "}
                  {payment.payment_method.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      payment.payment_status === "success"
                        ? "text-green-600"
                        : payment.payment_status === "failed"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {payment.payment_status.toUpperCase()}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Booking ID:</span>{" "}
                  {payment.booking_id?._id || payment.booking_id || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">User ID:</span>{" "}
                  {payment.user_id?._id || payment.user_id || "N/A"}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(payment.payment_date).toLocaleString()}
                </p>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deletePayment(payment._id)}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
              >
                <Trash className="w-4 h-4" />
                Delete Payment Record
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">
          No payments found for this method or search query.
        </p>
      )}
    </div>
  );
}

