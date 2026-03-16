"use server";

import { createCategory, delCategory, updateCategory } from "@/lib/data";
import { CategoryInput } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function removeCategory(id: number) {
  await delCategory(id);
  revalidatePath("/admin-category");
}

export async function addCategory(data: CategoryInput) {
  await createCategory(data);
  revalidatePath("/admin-category");
}

export async function editCategory(data: CategoryInput) {
  await updateCategory(data);
  revalidatePath("/admin-category");
}