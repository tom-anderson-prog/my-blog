"use server";

import { delCategory } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function removeCategory(id: number) {
  await delCategory(id);
  revalidatePath("/admin-category");
}
