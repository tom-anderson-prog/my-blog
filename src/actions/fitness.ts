"use server";

import { delRoutine } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function removeRoutine(id: number) {
  await delRoutine(id);
  revalidatePath("/admin-fitness");
}
