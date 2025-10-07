import Footer from "@/components/shared/Footer";
import { NavbarWrapper } from "@/components/shared/NavbarWrapper";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarWrapper />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </div>
  );
}
