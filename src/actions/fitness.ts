"use server";

import {
  createRoutine,
  createWorkout,
  delRoutine,
  updateRoutine,
} from "@/lib/data";
import { revalidatePath, revalidateTag } from "next/cache";
import { routineSchema, WorkoutSessionFormValues } from "@/lib/types";
import { redirect } from "next/navigation";
import {
  dalFormatErrorMessage,
  dalLoginRedirect,
  dalRequireAuthOperation,
} from "@/dal/helpers";

export async function removeRoutine(id: number) {
  const res = dalLoginRedirect(await delRoutine(id));

  if (res.success) {
    revalidatePath("/admin-fitness");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}

export async function addRoutine(data: any) {
  const validatedData = routineSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  const { name, repeatCount, steps, totalDuration } = validatedData.data;

  const stepsWithOrder = steps.map((s, index) => ({
    ...s,
    order: index + 1,
  }));

  const res = dalLoginRedirect(
    await createRoutine({
      name,
      repeatCount,
      steps: stepsWithOrder,
      totalDuration,
    }),
  );

  if (res.success) {
    revalidatePath("/admin-fitness");
    revalidateTag("routines", "max");
    redirect("/admin-fitness");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}

export async function editRoutine(id: number, data: any) {
  const validatedData = routineSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  const { name, repeatCount, steps, totalDuration } = validatedData.data;

  const stepsWithOrder = steps.map((s, index) => ({
    ...s,
    order: index + 1,
  }));

  const res = dalLoginRedirect(
    await updateRoutine(id, {
      name,
      repeatCount,
      steps: stepsWithOrder,
      totalDuration,
    }),
  );

  if (res.success) {
    revalidatePath("/admin-fitness");
    revalidateTag("routines", "max");
    redirect("/admin-fitness");
  } else {
    return dalFormatErrorMessage(res.error);
  }
}

export async function addWorkoutSeesion(data: WorkoutSessionFormValues) {
  await dalRequireAuthOperation(async () => {
    return await createWorkout(data);
  });
}
