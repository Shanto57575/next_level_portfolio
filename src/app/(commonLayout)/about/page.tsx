import type { Metadata } from "next";

import React from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Me | Md. Shahidul Islam",
  description:
    "MERN stack developer passionate about blockchain & AI. Software Engineer based in Chattogram, Bangladesh.",
  keywords: [
    "Software Engineer",
    "MERN Stack",
    "React",
    "Next.js",
    "Blockchain",
    "AI",
  ],
  openGraph: {
    title: "About Me | Md. Shahidul Islam",
    description: "MERN stack developer passionate about blockchain & AI",
    type: "profile",
  },
};

type SocialLink = {
  href: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
};

const socialLinks: SocialLink[] = [
  { href: "mailto:shahidul.islam.7th@gmail.com", label: "Email", Icon: Mail },
  {
    href: "https://www.linkedin.com/in/md-shahidul-islam",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "https://github.com/Shanto57575", label: "GitHub", Icon: Github },
  { href: "https://shansphere.vercel.app/", label: "Portfolio", Icon: Globe },
];

export default function AboutMe() {
  const name = "Md. Shahidul Islam";
  const title = "Software Engineer";
  const location = "Chattogram, Bangladesh";

  const summary = `
    Passionate about building scalable software and integrating AI into real-world solutions. 
    Strong in fullstack web development, problem solving, and delivering user-focused products.
  `;

  const experience = {
    company: "SM IT Solution",
    role: "Fullstack Developer Intern",
    duration: "May 2025 – Present",
    responsibilities: [
      "Convert Figma designs into production-ready React/Next.js frontends.",
      "Develop REST APIs with Node.js/Express for scalable backend services.",
      "Work with MongoDB/Mongoose for data management.",
      "Implement secure authentication using JWT, Firebase, and Passport.js.",
      "Payment gateway integration using stripe",
      "Leverage AI tools to accelerate development and optimize workflows.",
      "Handle multiple responsibilities across frontend and backend efficiently.",
    ],
  };

  const projects = [
    {
      name: "StayZest",
      live: "https://stayzest-cbf59.web.app",
      github: "https://github.com/Shanto57575/stayzest",
      tech: "MERN, Redux, JWT, Stripe, AI Integration",
      details: [
        "Developed a booking app with Stripe payment and AI trip planning.",
        "Designed secure dashboards with JWT authentication.",
        "Implemented pagination, filtering, and search features.",
        "Created responsive UI with Tailwind CSS and Material UI (dark/light mode).",
      ],
    },
    {
      name: "Epic Care",
      live: "https://doctreat-8f71f.web.app",
      github: "https://github.com/Shanto57575/epic-care-client",
      tech: "MERN, JWT, Stripe, TanStack Query",
      details: [
        "Implemented filters and pagination for doctor browsing.",
        "Developed secure admin & user dashboards with payments.",
        "Integrated JWT authentication for users & data protection.",
        "Optimized API calls with TanStack Query + Axios interceptors.",
      ],
    },
    {
      name: "Insta-X Bridge",
      github: "https://github.com/Shanto57575/insta-x-bridge",
      tech: "Python, FastAPI, Groq, Apify, Twitter API",
      details: [
        "Fetches latest Instagram posts using Apify scrapers.",
        "Summarizes captions with Groq LLM → generates tweet.",
        "Posts tweets via Tweepy API automatically.",
        "Endpoints for fetching, tweeting, automation.",
      ],
    },
    {
      name: "Customer Support Chatbot",
      github: "https://github.com/Shanto57575/support-chatbot",
      tech: "Python, FastAPI, LangChain, LangGraph, Qdrant, Groq, HuggingFace",
      details: [
        "Integrated Qdrant vector store + HuggingFace embeddings.",
        "Used LangGraph for conversation flow & topic extraction.",
        "Built FastAPI backend for real-time queries & sessions.",
        "Implemented fallback logic for reliable answers.",
      ],
    },
    {
      name: "FundChain (Final Year Group Project)",
      live: "https://fundchain7.netlify.app",
      github: "https://github.com/Shanto57575/fundchain",
      tech: "Ethereum Blockchain, MERN, Solidity, Ethers.js",
      details: [
        "Led 3-member team for blockchain-based crowdfunding app.",
        "Implemented multi-currency donations via Coinbase API.",
        "Hybrid authentication with MetaMask + MERN backend.",
        "Smart contracts for campaign & transactions.",
      ],
    },
    {
      name: "Portfolio",
      live: "https://shansphere.vercel.app",
      github: "https://github.com/Shanto57575/portfolio",
      tech: "Next.js, TypeScript, Tailwind CSS",
      details: [
        "Developed portfolio to showcase skills & projects.",
        "Used Aceternity UI for modern design.",
        "Leveraged TypeScript for type safety.",
      ],
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-2xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 shadow-md">
          <Image
            src="https://i.ibb.co.com/bMWNbgZX/me.jpg"
            alt={`${name} avatar`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">{title}</p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-500 dark:text-slate-400">
            <MapPin className="w-4 h-4" />
            {location}
          </p>
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl my-3">
            {summary}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-sm hover:scale-105 transition"
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
        <h3 className="text-xl font-semibold mb-3">Experience</h3>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm">
          <h4 className="font-bold text-lg">{experience.role}</h4>
          <p className="text-sm text-slate-500">
            {experience.company} • {experience.duration}
          </p>
          <ul className="mt-3 list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            {experience.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* PROJECTS */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Projects</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.name}
              className="bg-white dark:bg-slate-900 rounded-xl p-5 ring-1 ring-slate-200 dark:ring-slate-800 shadow hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{p.name}</h4>
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
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:underline"
                    >
                      Code <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-2">{p.tech}</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {p.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
