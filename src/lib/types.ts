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

export type ArticleWithCategory = Article & {
  category: Category;
};

export type RoutineWithWorkout = Routine & {
  workoutSession: WorkoutSession[];
};
