"use client";

import { IUser } from "@/types/user.interface";
import Image from "next/image";
import { useEffect, useState } from "react";
import meImage from "../../../../../public/assets/professional.jpeg";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<Partial<IUser | null>>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      setCurrentUser(JSON.parse(userInfo));
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4">
      <div className="shadow-xl bg-gray-200 min-w-72 md:min-w-96 rounded-xl p-6 text-center space-y-4">
        <Image
          src={meImage}
          className="rounded-full mx-auto w-28 h-32 border-4 border-white"
          alt="Picture of the author"
        />

        <h2 className="text-xl font-semibold">
          {currentUser?.name || "Guest User"}
        </h2>
        <p>{currentUser?.email || "No email found"}</p>
      </div>
    </div>
  );
}
