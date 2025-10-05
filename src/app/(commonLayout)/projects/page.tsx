import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { IProject } from "@/types/project.interface";

export const metadata: Metadata = {
  title: "Projects | Md. Shahidul Islam",
  description:
    "Projects built using MERN, Blockchain, AI, and modern web technologies.",
};

export default async function ProjectsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/project/all-projects`,
    {
      next: {
        tags: ["projects"],
      },
    }
  );

  const allProjects = await res.json();
  const projects = allProjects?.data;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p: IProject) => (
          <div
            key={p.title}
            className="bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-md transition ring-1 ring-slate-200 dark:ring-slate-800"
          >
            {/* PROJECT IMAGE */}
            <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-center"
                priority
              />
            </div>

            {/* PROJECT CONTENT */}
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <div className="flex gap-2">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:underline"
                    >
                      Live <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {p.github_client && (
                    <a
                      href={p.github_client}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:underline"
                    >
                      Code <Github className="w-3 h-3" />
                    </a>
                  )}
                  {p.github_server && (
                    <a
                      href={p.github_server}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:underline"
                    >
                      Code <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-500">
                {p.tech_stack.map((tech) => (
                  <span key={tech}>{tech},</span>
                ))}
              </div>
              <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                {p.Features.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
