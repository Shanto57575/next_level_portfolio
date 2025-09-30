import { axiosInstance } from "@/app/utils/axios";
import React from "react";

export default async function UserInfo() {
  const response = await axiosInstance.get("/auth/profile");
  console.log(response);
  return <div>UserInfo</div>;
}
