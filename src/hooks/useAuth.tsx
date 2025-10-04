"use client";

import { axiosInstance } from "@/app/utils/axios";
import { IUser } from "@/types/user.interface";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<Partial<IUser> | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await axiosInstance("/auth/me");
        setUser(result?.data?.data);
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  return user;
}
