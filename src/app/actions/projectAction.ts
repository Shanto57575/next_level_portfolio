"use server";

import { revalidateTag } from "next/cache";

export async function revalidateProject() {
  revalidateTag("projects");
}
