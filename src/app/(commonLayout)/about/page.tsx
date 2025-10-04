import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { Mail, MapPin, Github, Linkedin, Globe } from "lucide-react";
import aboutData from "@/data/about-data.json";

export const metadata: Metadata = {
  title: "About Me | Md. Shahidul Islam",
  description:
    "Software Engineer skilled in MERN stack and AI. Based in Chattogram, Bangladesh.",
};

type SocialLink = {
  href: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
};

const iconMap = {
  Mail,
  Linkedin,
  Github,
  Globe,
};

export default function AboutPage() {
  const { name, title, location, summary, socialLinks } = aboutData;

  const mappedSocialLinks: SocialLink[] = socialLinks.map((link) => ({
    href: link.href,
    label: link.label,
    Icon: iconMap[link.icon as keyof typeof iconMap],
  }));

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-40 h-40 sm:w-72 sm:h-72 rounded-2xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 shadow-md">
          <Image
            src="https://i.ibb.co.com/bMWNbgZX/me.jpg"
            alt={`${name} avatar`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">{title}</p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-slate-400">
            <MapPin className="w-4 h-4" /> {location}
          </p>
          <p className="text-sm text-justify text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl my-3">
            {summary}
          </p>

          {/* SOCIAL LINKS */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
            {mappedSocialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-sm hover:scale-105 transition"
              >
                <s.Icon className="w-4 h-4" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Experience</h3>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 ring-1 ring-slate-200 dark:ring-slate-800 shadow-md">
          <h4 className="font-bold text-lg mb-2">
            {aboutData.experience.title}
          </h4>
          <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm sm:text-base">
            {aboutData.experience.duration}
          </p>
          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 text-sm sm:text-base">
            {aboutData.experience.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Achievements</h3>
        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 text-sm sm:text-base">
          {aboutData.achievements.map((achievement, idx) => (
            <li key={idx}>{achievement}</li>
          ))}
        </ul>
      </div>

      {/* TECHNICAL SKILLS */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
          {aboutData.technicalSkills.map((skill, idx) => (
            <li key={idx}>
              <strong>{skill.category}:</strong> {skill.skills}
            </li>
          ))}
        </ul>
      </div>

      {/* EDUCATION */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Education</h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          <strong>{aboutData.education.degree}</strong> –{" "}
          {aboutData.education.institution}
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          CGPA: {aboutData.education.cgpa} | Core Courses:{" "}
          {aboutData.education.courses}
        </p>
      </div>

      {/* HOBBIES */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Hobbies & Interests</h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          {aboutData.hobbies}
        </p>
      </div>
    </section>
  );
}
