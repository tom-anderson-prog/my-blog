import { cacheTag } from "next/cache";
import prisma from "./prisma";
import {
  ArticleFormValues,
  CategoryInput,
  PhotoFormValues,
  RoutineFormValues,
  WorkoutSessionFormValues,
} from "./types";
import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";

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
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const skip = (page - 1) * limit;
      const [articles, totalCount] = await Promise.all([
        prisma.article.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: { category: true },
        }),
        prisma.article.count(),
      ]);

      return {
        articles,
        totalPages: Math.ceil(totalCount / limit),
      };
    });
  });
};

export const getArticleById = async (id: string) => {
  "use cache";
  cacheTag(`article-${id}`);

  const result = await prisma.article.findUnique({
    where: { id: +id },
  });
  return result;
};

export const createArticle = async (
  data: Omit<ArticleFormValues, "categoryId"> & { categoryId: number },
) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.article.create({
        data,
      });

      return result;
    });
  });
};

export const updateArticle = async (
  id: number,
  data: Omit<ArticleFormValues, "categoryId"> & { categoryId: number },
) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.article.update({
        where: { id },
        data,
      });

      return result;
    });
  });
};

export const delArticle = async (id: number) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.article.delete({
        where: { id: +id },
      });

      return result;
    });
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
  cacheTag(`photo-${id}`);

  const result = await prisma.photo.findUnique({
    where: { id: +id },
  });

  return result;
};

export const getPhotosByPage = async (page: number, limit: number = 10) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
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
    });
  });
};

export const createPhoto = async (data: PhotoFormValues) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.photo.create({
        data,
      });

      return result;
    });
  });
};

export const updatePhoto = async (id: number, data: PhotoFormValues) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.photo.update({
        where: { id },
        data,
      });

      return result;
    });
  });
};

export const delPhoto = async (id: number) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.photo.delete({
        where: { id: +id },
      });

      return result;
    });
  });
};

// ==============================
// category apis
// ==============================
export const getCategoryByPage = async (page: number, limit: number = 10) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
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
    });
  });
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
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.category.create({
        data,
      });

      return result;
    });
  });
};

export const updateCategory = async (data: CategoryInput) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.category.update({
        where: { id: data.id },
        data,
      });

      return result;
    });
  });
};

export const delCategory = async (id: number) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.category.delete({
        where: { id: +id },
      });

      return result;
    });
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
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
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
    });
  });
};

export const delRoutine = async (id: number) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.routine.delete({
        where: { id: +id },
      });

      return result;
    });
  });
};

export const createRoutine = async (data: RoutineFormValues) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.routine.create({
        data,
      });

      return result;
    });
  });
};

export const updateRoutine = async (id: number, data: RoutineFormValues) => {
  return await dalRequireAuth(async () => {
    return await dalDbOperation(async () => {
      const result = await prisma.routine.update({
        where: { id },
        data,
      });

      return result;
    });
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

export const createWorkout = async (data: WorkoutSessionFormValues) => {
  const result = await prisma.workoutSession.create({
    data,
  });

  return result;
};