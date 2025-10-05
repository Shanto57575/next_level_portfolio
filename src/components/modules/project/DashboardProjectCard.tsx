"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Calendar,
  Edit2,
  Trash2,
  Github,
  Globe,
  ExternalLink,
} from "lucide-react";
import { confirmDeleteToast } from "@/app/utils/confirmDeleteToast";
import { IProject } from "@/types/project.interface";
import EditProjectDialog from "./EditProjectDialog";
import { axiosInstance } from "@/app/utils/axios";
import { revalidateProject } from "@/app/actions/projectAction";

interface DashboardProjectCardProps {
  project: IProject;
}

export default function DashboardProjectCard({
  project,
}: DashboardProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (projectId: number) => {
    setIsDeleting(true);
    try {
      const result = await axiosInstance.delete(`/project/${projectId}`);
      if (result.data.success) {
        toast.success(<h1 className="text-center">{result.data.message}</h1>);
        revalidateProject();
      }
      console.log(result);
    } catch (err) {
      console.error("err==>", err);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-96 w-full group rounded-2xl overflow-hidden shadow-md border flex flex-col hover:shadow-xl transition-all duration-300">
      {" "}
      {/* Project Image with Overlay */}
      <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <Image
          src={project.image!}
          alt={project.title}
          width={500}
          height={500}
          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Date Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg text-xs font-medium text-gray-700 border border-gray-200/50">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          {project.title}
        </h3>

        {/* Tech Stack */}
        {project.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech_stack.map((tech, index) => (
              <span
                key={index}
                className="text-xs font-medium px-0.5 bg-gradient-to-r from-blue-50 to-blue-50 text-blue-700 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-gray-200">
          {project.github_client && (
            <a
              href={project.github_client}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-0.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> Client
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
          {project.github_server && (
            <a
              href={project.github_server}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-0.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> Server
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-0.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors border border-green-200"
            >
              <Globe className="w-3.5 h-3.5" /> Live Demo
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-3">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>

          <button
            disabled={isDeleting}
            onClick={() => confirmDeleteToast(() => handleDelete(project.id))}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 active:scale-95 ${
              isDeleting
                ? "bg-red-300 text-red-800 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 hover:shadow-md"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        {/* Edit Dialog */}
        <EditProjectDialog
          project={project}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      </div>
    </div>
  );
}
