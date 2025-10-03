"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IBlog } from "@/types/blog.interface";
import Image from "next/image";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { confirmDeleteToast } from "@/app/utils/confirmDeleteToast";
import { deleteBlogAction } from "@/app/actions/blogActions";
import EditBlogDialog from "./EditBlogDialog";

interface DashboardBlogCardProps {
  key: number;
  blog: IBlog;
}

export default function DashboardBlogCard({
  key,
  blog,
}: DashboardBlogCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (blogId: number) => {
    setIsDeleting(true);
    try {
      const result = await deleteBlogAction(blogId);

      console.log(result);
      toast.success("Blog deleted successfully!");
    } catch (err) {
      console.error("err==>", err);
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      key={key}
      className="group bg-slate-50 rounded-xl overflow-hidden shadow border border-gray-200 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 bg-gray-100">
        <Image
          src={blog.image!}
          alt={blog.title}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Author + Date */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
            {blog.author?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {blog.author?.name}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {blog.title}
        </h3>

        {/* Content Preview */}
        <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-3 flex-grow leading-relaxed">
          {blog.content}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>

          <EditBlogDialog
            blog={blog}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />

          <button
            disabled={isDeleting}
            onClick={() => confirmDeleteToast(() => handleDelete(blog.id))}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-white transition
              ${
                isDeleting
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
