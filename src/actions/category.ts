"use server";

import { dalFormatErrorMessage, dalLoginRedirect } from "@/dal/helpers";
import { createCategory, delCategory, updateCategory } from "@/lib/data";
import { CategoryFormState } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function removeCategory(id: number) {
  const res = dalLoginRedirect(await delCategory(id));

  if (res.success) {
    revalidatePath("/admin-category");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}

export async function addCategory(
  prevState: CategoryFormState,
  formData: FormData,
) {
  const name = formData.get("name") as string;

  const res = dalLoginRedirect(
    await createCategory({
      name,
    }),
  );

  if (res.success) {
    revalidatePath("/admin-category");
    return {
      success: true,
      error: null,
    };
  } else {
    return {
      success: false,
      error: dalFormatErrorMessage(res.error),
    };
  }
}

export async function editCategory(
  id: number,
  prevState: CategoryFormState,
  formData: FormData,
) {
  const name = formData.get("name") as string;

  const res = dalLoginRedirect(
    await updateCategory({
      id,
      name,
    }),
  );

  if (res.success) {
    revalidatePath("/admin-category");
    return {
      success: true,
      error: null,
    };
  } else {
    return {
      success: false,
      error: dalFormatErrorMessage(res.error),
    };
  }
}