"use client";

import { IUser } from "@/types/user.interface";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<Partial<IUser | null>>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
  };

  return { user, token, logout };
}
