// components/shared/NavbarWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { axiosInstance } from "@/app/utils/axios";

export function NavbarWrapper() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setCurrentUser(response?.data?.data || null);
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
      }
    };

    fetchUser();
  }, []);

  const menu = [
    { title: "Home", url: "/" },
    { title: "About Me", url: "/about" },
    { title: "My Projects", url: "/projects" },
    { title: "Blogs", url: "/blogs" },
  ];

  const auth = {
    login: { title: "Login", url: "/login" },
  };

  return <Navbar menu={menu} auth={auth} currentUser={currentUser} />;
}
