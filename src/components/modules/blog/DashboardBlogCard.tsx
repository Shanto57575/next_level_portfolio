"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IBlog } from "@/types/blog.interface";
import Image from "next/image";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { confirmDeleteToast } from "@/app/utils/confirmDeleteToast";
import EditBlogDialog from "./EditBlogDialog";
import { axiosInstance } from "@/app/utils/axios";
import { revalidateBlogs } from "@/app/actions/blogActions";

interface DashboardBlogCardProps {
  blog: IBlog;
}

export default function DashboardBlogCard({ blog }: DashboardBlogCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (blogId: number) => {
    setIsDeleting(true);
    try {
      const result = await axiosInstance.delete(`/blog/${blogId}`);
      if (result.data.success) {
        toast.success(<h1 className="text-center">{result.data.message}</h1>);
        revalidateBlogs();
      }
      console.log(result);
    } catch (err) {
      console.error("err==>", err);
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group rounded-xl overflow-hidden shadow-sm border flex flex-col hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={blog.image!}
          alt={blog.title}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Author + Date */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            {blog.author?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
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
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
          {blog.title}
        </h3>

        {/* Content Preview */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow leading-relaxed">
          {blog.content}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>

          <EditBlogDialog
            blog={blog}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />

          <button
            disabled={isDeleting}
            onClick={() => confirmDeleteToast(() => handleDelete(blog.id))}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 shadow-sm
              ${
                isDeleting
                  ? "bg-red-400 cursor-not-allowed opacity-70"
                  : "bg-red-600 hover:bg-red-700 active:scale-95"
              }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
