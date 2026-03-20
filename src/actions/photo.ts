"use server";

import { createPhoto, delPhoto, updatePhoto } from "@/lib/data";
import { photoSchema } from "@/lib/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function removePhoto(id: number) {
  await delPhoto(id);
  revalidatePath("/admin-photo");
}

export async function addPhoto(data: any) {
  const validatedData = photoSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  try {
    createPhoto(validatedData.data);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to create photo" };
  }

  revalidatePath("/admin-photo");
  revalidateTag("photos", "max");
  redirect("/admin-photo");
}

export async function editPhoto(id: number, data: any) {
  const validatedData = photoSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  try {
    updatePhoto(id, data);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update photo" };
  }

  revalidatePath("/admin-photo");
  revalidateTag("photos", "max");
  redirect("/admin-photo");
}