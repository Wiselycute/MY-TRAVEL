"use client";
import { Search } from 'lucide-react';
import SidebarComponent from '@/components/dashboard/sidebar/SidebarComponent';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 border-r border-border z-40">
        <SidebarComponent />
      </div>

      {/* Fixed Search Bar (starts after sidebar) */}
      <div className="fixed top-0 left-64 right-0 border-b border-border bg-background/95 backdrop-blur z-30">
        <div className="flex items-center h-16 px-6">
          <div className="flex-1 max-w-2xl mx-auto w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content (offset by sidebar and search bar) */}
      <main className="p-6 pt-20 ml-64">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}