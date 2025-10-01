import Sidebar from "@/components/modules/dashboard/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-[250px] bg-gray-100">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
