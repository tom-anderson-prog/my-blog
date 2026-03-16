"use server";

import { delPhoto } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function removePhoto(id: number) {
  await delPhoto(id);
  revalidatePath("/admin-photo");
}
