"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hey, I’m <span className="text-primary">Shanto</span> 👋
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          A passionate{" "}
          <span className="font-semibold text-foreground">
            Software Engineer
          </span>{" "}
          &
          <span className="font-semibold text-foreground">
            {" "}
            Full Stack Developer
          </span>{" "}
          — I love building modern web apps, exploring AI integrations, and
          sharing what I learn through blogs.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild size="lg">
            <Link href="/projects">🚀 View Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">📖 Learn More</Link>
          </Button>
        </div>
      </motion.section>

      {/* Decorative or Subtle Background Element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
      />
    </main>
  );
}
