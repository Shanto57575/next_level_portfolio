import SidebarToggle from "@/components/shared/SidebarToggle";
import ProtectedRoute from "@/route/ProtectedRoute";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarToggle />
      <main className="flex-1 overflow-auto p-4 md:ml-64">
        <ProtectedRoute>{children}</ProtectedRoute>
      </main>
    </div>
  );
}
