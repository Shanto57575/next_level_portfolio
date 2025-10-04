"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/modules/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-3 fixed top-4 left-4 z-50 bg-gray-200 rounded-lg shadow"
        >
          <Menu size={24} />
        </button>
      )}

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 overflow-auto p-4 md:ml-64">{children}</main>
    </div>
  );
}
