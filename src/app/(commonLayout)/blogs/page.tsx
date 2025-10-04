import BlogCard from "@/components/modules/blog/BlogCard";
import { IBlog } from "@/types/blog.interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | portfolio",
  description: "This is Blog Page",
};

export default async function BlogPage() {
  const res = await fetch(`${process.env.SERVER_URL}/blog/all-blogs`, {
    next: {
      tags: ["blogs"],
    },
  });

  const allBlogs = await res.json();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Latest Articles
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Insights, tutorials, and updates from our team
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allBlogs?.data?.map((blog: IBlog, idx: number) => (
            <BlogCard key={idx} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
