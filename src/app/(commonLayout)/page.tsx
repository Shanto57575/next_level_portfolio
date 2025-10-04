import Hero from "@/components/modules/home/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "shanto | portfolio",
  description: "This is My portfolio Home page",
};

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
