"use server";

import { createRoutine, delRoutine, updateRoutine } from "@/lib/data";
import { revalidatePath, revalidateTag } from "next/cache";
import { routineSchema } from "@/lib/types";
import { redirect } from "next/navigation";

export async function removeRoutine(id: number) {
  await delRoutine(id);
  revalidatePath("/admin-fitness");
}

export async function addRoutine(data: any) {
  const validatedData = routineSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  const { name, repeatCount, steps, totalDuration } = validatedData.data;

  const stepsWithOrder = steps.map((s, index) => ({
    ...s,
    order: index + 1,
  }));

  try {
    createRoutine({
      name,
      repeatCount,
      steps: stepsWithOrder,
      totalDuration,
    });
  } catch (e) {
    return { error: "Failed to create routines" };
  }

  revalidatePath("/admin-fitness");
  revalidateTag("routines", "max");
  redirect("/admin-fitness");
}

export async function editRoutine(id: number, data: any) {
  const validatedData = routineSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  const { name, repeatCount, steps, totalDuration } = validatedData.data;

  const stepsWithOrder = steps.map((s, index) => ({
    ...s,
    order: index + 1,
  }));

  try {
    updateRoutine(id, {
      name,
      repeatCount,
      steps: stepsWithOrder,
      totalDuration,
    });
  } catch (e) {
    return { error: "Failed to update routines" };
  }

  revalidatePath("/admin-fitness");
  revalidateTag("routines", "max");
  redirect("/admin-fitness");
}