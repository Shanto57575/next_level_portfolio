"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { axiosInstance } from "../utils/axios";

export async function revalidateBlogs() {
  revalidateTag("blogs");
}

export async function deleteBlogAction(blogId: number) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const { data } = await axiosInstance.delete(`/blog/${blogId}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!data.success) {
      throw new Error("Failed to delete blog");
    }

    revalidateTag("blogs");

    return data;
  } catch (err) {
    console.error("X deleteBlogAction error:", err);
    throw err;
  }
}
