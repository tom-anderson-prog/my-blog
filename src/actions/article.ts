"use server";

import { delArticle, updateArticle, updateArticleStatus } from "@/lib/data";
import { BasicArticle } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createArticle() {}

export async function removeArticle(id: number) {
  await delArticle(id);
  revalidatePath("/admin-article");
}

export async function editArticle(data: BasicArticle) {}

export async function publishArticle(
  id: number,
  status: "DRAFT" | "PUBLISHED",
) {
  await updateArticleStatus(id, status);
  revalidatePath("/admin-article");
}
