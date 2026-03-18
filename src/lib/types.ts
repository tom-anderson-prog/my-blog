import * as z from "zod";
import {
  Article,
  Category,
  Photo,
  Routine,
  WorkoutSession,
} from "../generated/prisma/client";

export type WorkoutStep = {
  id: number;
  type: "EXERCISE" | "REST";
  name: string;
  duration: number;
  order: number;
};

export type FitnessRoutine = {
  id: number;
  name: string;
  isEnabled: boolean;
  repeatCount: number;
  isActive?: boolean;
  steps: WorkoutStep[];
  totalDuration?: number;
};

export type BasicArticle = Article;
export type BasicCategory = Category;
export type BasicPhoto = Photo;
export type BasicRoutine = Routine;
export type CategoryInput = {
  id?: number;
  name: string;
};
export type CategoryFormState = {
  success: boolean;
  error: string | null;
};

export type ArticleWithCategory = Article & {
  category: Category;
};

export type RoutineWithWorkout = Routine & {
  workoutSession: WorkoutSession[];
};

export const stepSchema = z.object({
  type: z.enum(["EXERCISE", "REST"]),
  name: z.string().min(1, "Name is required"),
  duration: z.coerce.number().min(0),
});

export const routineSchema = z.object({
  name: z.string().min(1, "Routine name is required"),
  repeatCount: z.coerce.number().min(1),
  steps: z.array(stepSchema),
});

export type RoutineFormValues = z.infer<typeof routineSchema>;
