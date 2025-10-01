"use client";
import { Logo } from "@/components/shared/Logo";
import { NotebookPen, SquarePen, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathName = usePathname();
  return (
    <div className="flex md:flex-col gap-2 p-4 text-black">
      <Link href="/" className="mb-5">
        <Logo />
      </Link>
      <Link
        href="/dashboard/profile"
        className={`flex items-center gap-x-2 px-3 py-2 rounded ${
          pathName === "/dashboard/profile"
            ? "bg-black text-white"
            : "bg-gray-200 hover:bg-gray-300 transition"
        }`}
      >
        <UserRound size={20} /> <span>Profile</span>
      </Link>
      <Link
        href="/dashboard/create-blog"
        className={`flex items-center gap-x-2 px-3 py-2 rounded ${
          pathName === "/dashboard/create-blog"
            ? "bg-black text-white"
            : "bg-gray-200 hover:bg-gray-300 transition"
        }`}
      >
        <NotebookPen size={20} /> <span>Create Blog</span>
      </Link>
      <Link
        href="/dashboard/manage-blogs"
        className={`flex items-center gap-x-2 px-3 py-2 rounded ${
          pathName === "/dashboard/manage-blogs"
            ? "bg-black text-white"
            : "bg-gray-200 hover:bg-gray-300 transition"
        }`}
      >
        <SquarePen size={20} /> <span>Manage Blogs</span>
      </Link>
    </div>
  );
}
