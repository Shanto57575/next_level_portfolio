import React from "react";
import Link from "next/link";
import { Mail, Github, Linkedin, Globe } from "lucide-react";

const socialLinks = [
  { href: "mailto:shahidul.islam.7th@gmail.com", Icon: Mail },
  { href: "https://github.com/Shanto57575", Icon: Github },
  { href: "https://www.linkedin.com/in/md-shahidul-islam", Icon: Linkedin },
  { href: "https://shansphere.vercel.app/", Icon: Globe },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ABOUT */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-white">Md. Shahidul Islam</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Software Engineer | MERN Stack | AI Enthusiast <br />
            Passionate about building modern, scalable, and user-friendly
            applications.
          </p>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <s.Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-all duration-300"
              >
                About Me
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-white transition-all duration-300"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="hover:text-white transition-all duration-300"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:text-white transition-all duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-white">Contact</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            📍 Chattogram, Bangladesh <br />
            ✉️ shahidul.islam.7th@gmail.com <br />
            🌐{" "}
            <a
              href="https://shansphere.vercel.app/"
              className="hover:text-white transition-all duration-300"
            >
              Portfolio
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-6 py-4 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Md. Shahidul Islam Shanto. All rights
        reserved.
      </div>
    </footer>
  );
}
