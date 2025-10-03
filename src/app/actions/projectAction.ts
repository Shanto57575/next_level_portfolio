"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { axiosInstance } from "../utils/axios";

export async function revalidateProject() {
  revalidateTag("projects");
}

export async function deleteProjectAction(projectId: number) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const { data } = await axiosInstance.delete(`/project/${projectId}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!data.success) {
      throw new Error("Failed to delete project");
    }

    revalidateTag("projects");

    return data;
  } catch (err) {
    console.error("X deleteBlogAction error:", err);
    throw err;
  }
}
