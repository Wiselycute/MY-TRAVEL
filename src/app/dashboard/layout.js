// "use client";
// import { Toaster } from "react-hot-toast";
// import Sidebar from './../../components/dashboard/sidebar/SidebarComponent';

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
//       <Sidebar />
//       <div className="flex-1 p-6 overflow-auto">
//         <div className="max-w-[1400px] mx-auto">
//           {children}
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// }
"use client";
import React from "react";
import Sidebar from './../../components/dashboard/sidebar/SidebarComponent';
import Header from './../../components/dashboard/Header';
import StatsCards from './../../components/dashboard/StatsCards';
import RevenueChart from './../../components/dashboard/RevenueChart';
import VisitorsChart from './../../components/dashboard/VisitorsChart';
import BookingsTable from './../../components/dashboard/BookingsTable';
import UsersTable from './../../components/dashboard/UsersTable';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#071226] to-[#08142a] text-slate-100">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Header />
        <main className="p-6 max-w-[1400px] mx-auto space-y-6">
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div className="space-y-6">
              <VisitorsChart />
              <BookingsTable />
            </div>
          </div>

          <UsersTable />
        </main>
      </div>
    </div>
  );
}

