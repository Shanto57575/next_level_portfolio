import { IBlog } from "@/types/blog.interface";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const blogs = await fetch(`${process.env.SERVER_URL}/blog/all-blogs`).then(
    (res) => res.json()
  );

  return blogs?.data?.map((blog: IBlog) => ({
    id: blog.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: blog } = await fetch(
    `${process.env.SERVER_URL}/blog/${params.id}`
  ).then((res) => res.json());

  return {
    title: blog.title,
    description: blog.content.slice(0, 160),
  };
}

export default async function BlogDetails({
  params,
}: {
  params: { id: string };
}) {
  const { data: blog } = await fetch(
    `${process.env.SERVER_URL}/blog/${params.id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  ).then((res) => res.json());

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Blogs
        </Link>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-sm">
                {blog.author?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-medium text-gray-900">
                    {blog.author?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
          <Image
            src={blog.image!}
            alt={blog.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>

        {/* Footer Divider */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
