"use client";
import DashboardStats from '@/components/dashboard/DashboardStats';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard Overview</h1>
          <DashboardStats />
        </div>
      </main>
    </div>
  );
}