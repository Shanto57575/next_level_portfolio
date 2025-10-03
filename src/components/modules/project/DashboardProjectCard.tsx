"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Calendar, Edit2, Trash2, Github, Globe } from "lucide-react";
import { confirmDeleteToast } from "@/app/utils/confirmDeleteToast";
// import EditBlogDialog from "./EditBlogDialog";
import { IProject } from "@/types/project.interface";
import { deleteProjectAction } from "@/app/actions/projectAction";
import EditProjectDialog from "./EditProjectDialog";

interface DashboardProjectCardProps {
  key: number;
  project: IProject;
}

export default function DashboardProjectCard({
  key,
  project,
}: DashboardProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (projectId: number) => {
    setIsDeleting(true);
    try {
      const result = await deleteProjectAction(projectId);
      console.log(result);
      toast.success("Project deleted successfully!");
    } catch (err) {
      console.error("err==>", err);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      key={key}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
    >
      {/* Project Image */}
      <div className="relative w-full h-52 bg-gray-100">
        <Image
          src={project.image!}
          alt={project.title}
          width={500}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title + Date */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Tech Stack */}
        {project.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech_stack.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Features */}
        {project.Features?.length > 0 && (
          <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
            {project.Features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-4">
          {project.github_client && (
            <a
              href={project.github_client}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
            >
              <Github className="w-4 h-4" /> Client
            </a>
          )}
          {project.github_server && (
            <a
              href={project.github_server}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
            >
              <Github className="w-4 h-4" /> Server
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
            >
              <Globe className="w-4 h-4" /> Live
            </a>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-3">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>

          <button
            disabled={isDeleting}
            onClick={() => confirmDeleteToast(() => handleDelete(project.id))}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white transition ${
              isDeleting
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
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
