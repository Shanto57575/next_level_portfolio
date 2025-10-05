import DashboardBlogCard from "@/components/modules/blog/DashboardBlogCard";
import { IBlog } from "@/types/blog.interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard | manage blogs",
  description: "This is manage blogs page",
};

export default async function ManageBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/all-blogs`,
    {
      next: { tags: ["blogs"] },
    }
  );

  const allBlogs = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Latest Articles
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Insights, tutorials, and updates from our team
          </p>
        </div>

        <div
          className="w-full mx-auto grid gap-6 lg:gap-8"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {allBlogs?.data?.map((blog: IBlog) => (
            <DashboardBlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
