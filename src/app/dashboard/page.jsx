"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { RefreshCw } from "lucide-react";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    completedPayments: 0,
  });
  const [bookingsByType, setBookingsByType] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // manual refresh state

  // === Fetch all data from backend ===
  const fetchData = async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const [bookingsRes, paymentsRes] = await Promise.all([
        api.get("/api/bookings"),
        api.get("/api/payments"),
      ]);

      const bookings = bookingsRes.data || [];
      const payments = paymentsRes.data || [];

      // === STAT CARDS ===
      const totalRevenue = payments
        .filter((p) => p.payment_status === "Completed")
        .reduce((sum, p) => sum + p.amount, 0);

      const totalBookings = bookings.length;
      const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length;
      const completedPayments = payments.filter((p) => p.payment_status === "Completed").length;

      // === BOOKINGS BY SERVICE ===
      const byType = ["Car", "Flight", "Hotel"].map((t) => ({
        name: t,
        value: bookings.filter((b) => b.service_type === t).length,
      }));

      // === PAYMENT METHOD SPLIT ===
      const byMethod = ["Credit Card", "PayPal", "Cash"].map((m) => ({
        name: m,
        value: payments.filter((p) => p.payment_method === m).length,
      }));

      // === REVENUE TREND (LAST 7 DAYS) ===
      const today = new Date();
      const last7 = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dayLabel = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const dailyRevenue = payments
          .filter(
            (p) =>
              new Date(p.payment_date).toDateString() === date.toDateString() &&
              p.payment_status === "Completed"
          )
          .reduce((sum, p) => sum + p.amount, 0);
        return { date: dayLabel, revenue: dailyRevenue };
      }).reverse();

      setStats({ totalRevenue, totalBookings, confirmedBookings, completedPayments });
      setBookingsByType(byType);
      setPaymentMethodData(byMethod);
      setRevenueTrend(last7);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
      if (manual) setRefreshing(false);
    }
  };

  // ✅ Auto-refresh every 60 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
        Loading analytics...
      </div>
    );

  const COLORS = ["#6366f1", "#06b6d4", "#facc15", "#f43f5e"];

  return (
    <div className="space-y-8">
      {/* === HEADER WITH REFRESH BUTTON === */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard Overview</h1>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className={`flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 text-sm font-medium
            transition-all ${
              refreshing
                ? "bg-slate-700/60 text-slate-300 cursor-not-allowed"
                : "bg-slate-700/50 hover:bg-slate-600 text-slate-100"
            }`}
        >
          <RefreshCw
            size={16}
            className={`transition-transform duration-500 ${
              refreshing ? "animate-spin" : ""
            }`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* === SUMMARY CARDS === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          color="from-indigo-500 to-purple-600"
        />
        <StatCard
          label="Total Bookings"
          value={stats.totalBookings}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          label="Confirmed Bookings"
          value={stats.confirmedBookings}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          label="Completed Payments"
          value={stats.completedPayments}
          color="from-pink-500 to-rose-500"
        />
      </div>

      {/* === REVENUE TREND === */}
      <div className="p-6 rounded-xl bg-slate-800/60 border border-white/10">
        <h2 className="text-lg font-semibold mb-4">Revenue Trend (Last 7 Days)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="revColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                fill="url(#revColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === BOOKINGS + PAYMENT CHARTS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bookings by Service Type */}
        <div className="p-6 rounded-xl bg-slate-800/60 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Bookings by Service Type</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bookingsByType}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {bookingsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="p-6 rounded-xl bg-slate-800/60 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// === STAT CARD COMPONENT ===
function StatCard({ label, value, color }) {
  return (
    <div
      className={`p-5 rounded-xl bg-gradient-to-r ${color} text-white shadow-md flex flex-col justify-center`}
    >
      <span className="text-sm opacity-80">{label}</span>
      <span className="text-2xl font-bold mt-1">{value}</span>
    </div>
  );
}
