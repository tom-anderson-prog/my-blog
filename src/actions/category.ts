"use server";

import { createCategory, delCategory, updateCategory } from "@/lib/data";
import { CategoryFormState, CategoryInput } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function removeCategory(id: number) {
  await delCategory(id);
  revalidatePath("/admin-category");
}

export async function addCategory(
  prevState: CategoryFormState,
  formData: FormData,
) {
  const name = formData.get("name") as string;

  try {
    await createCategory({
      name,
    });
    revalidatePath("/admin-category");
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add category",
    };
  }
}

export async function editCategory(
  id: number,
  prevState: CategoryFormState,
  formData: FormData,
) {
  const name = formData.get("name") as string;

  try {
    await updateCategory({
      id,
      name,
    });
    revalidatePath("/admin-category");

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update category",
    };
  }
}