// lib/auth.ts
import { axiosInstance } from "@/app/utils/axios";
import { cookies } from "next/headers";

export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return null;
    }

    const response = await axiosInstance.get("/auth/me", {
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    return response?.data?.data || null;
  } catch {
    return null;
  }
}
