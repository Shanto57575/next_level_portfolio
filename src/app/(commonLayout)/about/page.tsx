import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { Mail, MapPin, Github, Linkedin, Globe } from "lucide-react";

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

export default function AboutPage() {
  const name = "Md. Shahidul Islam";
  const title = "Software Engineer";
  const location = "Chattogram, Bangladesh";

  const summary = `
    I am a passionate Software Engineer specializing in fullstack development and AI integration. 
    I focus on building scalable, efficient, and user-focused software solutions while continuously exploring new technologies. 
    With strong problem-solving skills and a drive to deliver impactful projects, I have created multiple applications, led a final year team project, and actively participated in competitive programming challenges.
  `;

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
            {socialLinks.map((s) => (
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
            Fullstack Developer Intern – SM IT Solution
          </h4>
          <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm sm:text-base">
            May 2025 – Present
          </p>
          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 text-sm sm:text-base">
            <li>
              Converted Figma designs into production-ready React/Next.js
              frontends.
            </li>
            <li>
              Built REST APIs with Node.js/Express for scalable backend
              services.
            </li>
            <li>Handled database design and operations using MongoDB.</li>
            <li>
              Implemented secure authentication using JWT, Firebase, and
              Passport.js.
            </li>
            <li>Integrated Stripe payment for seamless transactions.</li>
          </ul>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Achievements</h3>
        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 text-sm sm:text-base">
          <li>
            Built multiple projects showcasing fullstack and AI integration
            skills.
          </li>
          <li>
            Led a team in the final year project for FundChain (blockchain
            crowdfunding platform).
          </li>
          <li>
            Participated in 100+ programming contests and solved 700+ problems,
            with a max rating of 1037.
          </li>
          <li>
            Ranked 325th in the ICPC Asia Dhaka Regional Preliminary-2022 with
            team IIUC_Boolean Bots.
          </li>
        </ul>
      </div>

      {/* TECHNICAL SKILLS */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
          <li>
            <strong>Programming:</strong> JavaScript | TypeScript | Python |
            C/C++
          </li>
          <li>
            <strong>Frontend:</strong> React.js | Next.js | Redux | Tailwind |
            Bootstrap | Shadcn UI | Material UI | Aceternity UI | explored
            multiple UI libraries
          </li>
          <li>
            <strong>Backend:</strong> Node.js | Express.js | MongoDB | Mongoose
            | Prisma | PostgreSQL | Firebase | REST APIs | JWT | FastAPI
            (familiar) | Passport.js | NextAuth
          </li>
          <li>
            <strong>AI / LLM:</strong> LangChain | LangGraph (familiar)
          </li>
          <li>
            <strong>Tools:</strong> Git | GitHub | Postman | Vercel | Netlify |
            Render
          </li>
          <li>
            <strong>Soft Skills:</strong> Problem Solving | Bias for Action |
            Team Collaboration | and many more
          </li>
        </ul>
      </div>

      {/* EDUCATION */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Education</h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          <strong>BSc in Computer Science & Engineering</strong> – International
          Islamic University Chittagong
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          CGPA: 3.35 / 4 | Core Courses: Data Structures, Algorithms,
          Competitive Programming, OS, Networking, DBMS
        </p>
      </div>

      {/* HOBBIES */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Hobbies & Interests</h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          Building side projects to experiment with new technologies, watching
          movies and TV series to stay inspired and relaxed.
        </p>
      </div>
    </section>
  );
}
