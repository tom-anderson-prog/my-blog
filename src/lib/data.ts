import { cacheTag } from "next/cache";
import prisma from "./prisma";
import {
  ArticleFormValues,
  CategoryInput,
  PhotoFormValues,
  RoutineFormValues,
} from "./types";

// ==============================
// article apis
// ==============================
export const getLatestArticles = async () => {
  "use cache";
  cacheTag("latest-articles");

  const result = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return result;
};

export const getPublishedArticles = async () => {
  "use cache";
  cacheTag("published-articles");

  const result = await prisma.category.findMany({
    include: {
      articles: {
        where: {
          status: "PUBLISHED",
        },
        orderBy: {
          publishedAt: "desc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return result;
};

export const getArticlesByPage = async (page: number, limit: number = 10) => {
  "use cache";
  cacheTag("articles-page");
  const skip = (page - 1) * limit;

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    }),
    prisma.article.count(),
  ]);

  return {
    articles,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const getArticleById = async (id: string) => {
  "use cache";

  const result = await prisma.article.findUnique({
    where: { id: +id },
  });
  return result;
};

export const createArticle = async (
  data: Omit<ArticleFormValues, "categoryId"> & { categoryId: number },
) => {
  await prisma.article.create({
    data,
  });
};

export const updateArticle = async (
  id: number,
  data: Omit<ArticleFormValues, "categoryId"> & { categoryId: number },
) => {
  await prisma.article.update({
    where: { id },
    data,
  });
};

export const delArticle = async (id: number) => {
  await prisma.article.delete({
    where: { id: +id },
  });
};

// ==============================
// photo apis
// ==============================
export const getPhotos = async () => {
  "use cache";
  cacheTag("photos");

  const result = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return result;
};

export const getPhotoById = async (id: string) => {
  "use cache";

  const result = await prisma.photo.findUnique({
    where: { id: +id },
  });

  return result;
};

export const getPhotosByPage = async (page: number, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [photos, totalCount] = await Promise.all([
    prisma.photo.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.photo.count(),
  ]);

  return {
    photos,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const createPhoto = async (data: PhotoFormValues) => {
  await prisma.photo.create({
    data,
  });
};

export const updatePhoto = async (id: number, data: PhotoFormValues) => {
  await prisma.photo.update({
    where: { id },
    data,
  });
};

export const delPhoto = async (id: number) => {
  await prisma.photo.delete({
    where: { id: +id },
  });
};

// ==============================
// category apis
// ==============================
export const getCategoryByPage = async (page: number, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [categories, totalCount] = await Promise.all([
    prisma.category.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.category.count(),
  ]);

  return {
    categories,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const getAllCategories = async () => {
  "use cache";
  cacheTag("categories");

  const result = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
    },
  });

  return result;
};

export const createCategory = async (data: CategoryInput) => {
  await prisma.category.create({
    data,
  });
};

export const updateCategory = async (data: CategoryInput) => {
  await prisma.category.update({
    where: { id: data.id },
    data,
  });
};

export const delCategory = async (id: number) => {
  await prisma.category.delete({
    where: { id: +id },
  });
};

// ==============================
// fitness apis
// ==============================
export const getEnabledRoutines = async () => {
  "use cache";
  cacheTag("routines");

  const result = await prisma.routine.findMany({
    where: { isEnabled: true },
    orderBy: { updatedAt: "desc" },
  });

  return result;
};

export const getRoutinesByPage = async (page: number, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [routines, totalCount] = await Promise.all([
    prisma.routine.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        workoutSession: true,
      },
    }),
    prisma.routine.count(),
  ]);

  return {
    routines,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const delRoutine = async (id: number) => {
  await prisma.routine.delete({
    where: { id: +id },
  });
};

export const createRoutine = async (data: RoutineFormValues) => {
  await prisma.routine.create({
    data,
  });
};

export const updateRoutine = async (id: number, data: RoutineFormValues) => {
  await prisma.routine.update({
    where: { id },
    data,
  });
};

export const getRoutineById = async (id: number) => {
  const result = await prisma.routine.findUnique({
    where: { id },
    include: {
      workoutSession: true,
    },
  });

  return result;
};
