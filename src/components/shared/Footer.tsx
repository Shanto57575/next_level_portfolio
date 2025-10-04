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
    <footer className="bg-black text-white mt-12">
      <div className="border-t border-slate-700 mt-6 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Md. Shahidul Islam Shanto. All rights
        reserved.
      </div>
    </footer>
  );
}
