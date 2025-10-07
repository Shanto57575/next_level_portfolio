import axios from "axios";
import { cookies } from "next/headers";

export async function getServerAxiosInstance() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
      Cookie: cookieHeader,
    },
  });
}
