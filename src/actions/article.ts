"use server";

import { delArticle, updateArticle, createArticle } from "@/lib/data";
import { articleSchema } from "@/lib/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function removeArticle(id: number) {
  await delArticle(id);
  revalidatePath("/admin-article");
}

export async function addArticle(data: any) {
  const validatedData = articleSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  try {
    createArticle(validatedData.data);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to add article" };
  }

  revalidatePath("/admin-article");
  revalidateTag("published-articles", "max");
  revalidateTag("latest-articles", "max");
  redirect("/admin-article");
}

export async function editArticle(id: number, data: any) {
  const validatedData = articleSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  try {
    updateArticle(id, data);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to edit article" };
  }

  revalidatePath("/admin-article");
  revalidateTag("published-articles", "max");
  revalidateTag("latest-articles", "max");
  redirect("/admin-article");
}
