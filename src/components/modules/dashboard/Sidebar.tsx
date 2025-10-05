"use client";

import { useEffect, useRef } from "react";
import { Logo } from "@/components/shared/Logo";
import { User, FileText, Edit3, LayoutDashboard, Box, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const pathName = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  const navItems = [
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/create-blog", label: "Create Blog", icon: Edit3 },
    { href: "/dashboard/manage-blogs", label: "Manage Blogs", icon: FileText },
    { href: "/dashboard/create-project", label: "Create Project", icon: Box },
    {
      href: "/dashboard/manage-projects",
      label: "Manage Projects",
      icon: LayoutDashboard,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md transition-transform duration-300 z-40 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-black bg-gray-200 p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4 text-black overflow-y-auto flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathName === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-x-3 px-3 py-2 rounded-lg font-medium transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-gray-100 hover:text-black"
                  }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
