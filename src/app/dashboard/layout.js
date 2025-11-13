"use client";
import { Toaster } from "react-hot-toast";
import Sidebar from './../../components/dashboard/sidebar/SidebarComponent';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
