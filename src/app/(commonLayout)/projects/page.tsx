import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import stayZest from "../../../../public/assets/1.png";
import epic from "../../../../public/assets/3.png";
import portfolio from "../../../../public/assets/4.png";
import customer_chatbot from "../../../../public/assets/customer_chat.png";
import insta_x_bridge from "../../../../public/assets/insta_x_bridge.png";
import fundChain from "../../../../public/assets/2.png";

export const metadata: Metadata = {
  title: "Projects | Md. Shahidul Islam",
  description:
    "Projects built using MERN, Blockchain, AI, and modern web technologies.",
};

export const revalidate = 60;

const projects = [
  {
    name: "StayZest",
    live: "https://stayzest-cbf59.web.app",
    github: "https://github.com/Shanto57575/stayzest",
    tech: "MERN, Redux, JWT, Stripe, AI Integration",
    img: stayZest,
    details: [
      "Integrated Stripe for secure online payments.",
      "Built AI trip planning with Gemini API.",
      "Designed secure dashboards using JWT authentication.",
      "Implemented pagination, filtering, and search.",
      "Developed responsive UI with Tailwind CSS and Material UI.",
    ],
  },
  {
    name: "Epic Care",
    live: "https://doctreat-8f71f.web.app",
    github: "https://github.com/Shanto57575/epic-care-client",
    tech: "MERN, JWT, Stripe, TanStack Query",
    img: epic,
    details: [
      "Implemented filters and pagination for doctor browsing.",
      "Developed secure admin & user dashboards with payments.",
      "Integrated JWT authentication for users & data protection.",
      "Optimized API calls with TanStack Query and Axios interceptors.",
    ],
  },
  {
    name: "Insta-X Bridge",
    github: "https://github.com/Shanto57575/insta-x-bridge",
    tech: "Python, FastAPI, Groq, Apify, Twitter API",
    img: insta_x_bridge,
    details: [
      "Fetched latest Instagram posts using Apify scrapers.",
      "Summarized captions with Groq LLM and generated tweets.",
      "Automated posting via Tweepy API integration with Twitter.",
      "Exposed FastAPI endpoints for fetching, tweeting, and automation.",
    ],
  },
  {
    name: "Customer Support Chatbot",
    github: "https://github.com/Shanto57575/customer_support_chatbot",
    tech: "Python, FastAPI, LangChain, LangGraph, Qdrant, Groq, HuggingFace",
    img: customer_chatbot,
    details: [
      "Integrated Qdrant vector store with HuggingFace embeddings.",
      "Used LangGraph for conversation flow and topic extraction.",
      "Built FastAPI backend for real-time query handling and session management.",
      "Implemented fallback logic for reliable and consistent answers.",
    ],
  },
  {
    name: "FundChain (Final Year Group Project)",
    live: "https://fundchain7.netlify.app",
    github: "https://github.com/Shanto57575/crypto_crowdfunding",
    tech: "Ethereum Blockchain, MERN, Solidity, Ethers.js",
    img: fundChain,
    details: [
      "Led a 3-member team to develop a blockchain crowdfunding app   ",
      "Implemented multi-currency donations via Coinbase API.",
      "Developed hybrid authentication with MetaMask + MERN backend.",
      "Created smart contracts to manage campaigns and transactions.",
    ],
  },
  {
    name: "Portfolio",
    live: "https://shansphere.vercel.app",
    tech: "Next.js, TypeScript, Tailwind CSS",
    img: portfolio,
    details: [
      "Built personal portfolio to showcase skills, experience, and projects.",
      "Implemented modern design using Aceternity UI components.",
      "Leveraged TypeScript for type safety and maintainability.",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.name}
            className="bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-md transition ring-1 ring-slate-200 dark:ring-slate-800"
          >
            {/* PROJECT IMAGE */}
            <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-center"
                priority
              />
            </div>

            {/* PROJECT CONTENT */}
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.name}</h3>
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

              <p className="text-xs text-slate-500">{p.tech}</p>
              <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                {p.details.map((d, i) => (
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
