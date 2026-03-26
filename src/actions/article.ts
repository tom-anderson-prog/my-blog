"use server";

import { dalFormatErrorMessage, dalLoginRedirect } from "@/dal/helpers";
import { delArticle, updateArticle, createArticle } from "@/lib/data";
import { articleSchema } from "@/lib/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function removeArticle(id: number) {
  const res = dalLoginRedirect(await delArticle(id));

  if (res.success) {
    revalidatePath("/admin-articles");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}

export async function addArticle(data: any) {
  const validatedData = articleSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  const { categoryId } = validatedData.data;

  const res = dalLoginRedirect(
    await createArticle({
      ...validatedData.data,
      categoryId: Number(categoryId),
    }),
  );

  if (res.success) {
    revalidatePath("/admin-articles");
    revalidateTag("published-articles", "max");
    revalidateTag("latest-articles", "max");
    // revalidateTag("articles-page", "default");
    redirect("/admin-articles");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}

export async function editArticle(id: number, data: any) {
  const validatedData = articleSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  const { categoryId } = validatedData.data;

  const res = dalLoginRedirect(
    await updateArticle(id, {
      ...validatedData.data,
      categoryId: Number(categoryId),
    }),
  );

  if (res.success) {
    revalidatePath("/admin-articles");
    revalidateTag("published-articles", "max");
    revalidateTag("latest-articles", "max");
    // revalidateTag("articles-page", "default");
    redirect("/admin-articles");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}
