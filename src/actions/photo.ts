"use server";

import { dalFormatErrorMessage, dalLoginRedirect } from "@/dal/helpers";
import { createPhoto, delPhoto, updatePhoto } from "@/lib/data";
import { photoSchema } from "@/lib/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function removePhoto(id: number) {
  const res = dalLoginRedirect(await delPhoto(id));

  if (res.success) {
    revalidatePath("/admin-photo");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}

export async function addPhoto(data: any) {
  const validatedData = photoSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  const res = dalLoginRedirect(await createPhoto(validatedData.data));

  if (res.success) {
    revalidatePath("/admin-photo");
    revalidateTag("photos", "max");
    redirect("/admin-photo");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}

export async function editPhoto(id: number, data: any) {
  const validatedData = photoSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  const res = dalLoginRedirect(await updatePhoto(id, data));

  if (res.success) {
    revalidatePath("/admin-photo");
    revalidateTag("photos", "max");
    redirect("/admin-photo");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}