import { Article, Category } from "../generated/prisma/client";

export type WorkoutStep = {
  id: number;
  type: "EXERCISE" | "REST";
  name: string;
  duration: number;
  order: number;
};

export type Routine = {
  id: number;
  name: string;
  isEnabled: boolean;
  repeatCount: number;
  isActive?: boolean;
  steps: WorkoutStep[];
  totalDuration?: number;
};

export type BasicArticle = Article;

export type ArticleWithCategory = Article & {
  category: Category;
};
