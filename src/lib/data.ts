import { cacheLife } from "next/cache";
import prisma from "./prisma";

export const getLatestArticles = async () => {
  "use cache";
  cacheLife("weeks");

  const result = await prisma.article.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return result;
};

export const getPhotos = async () => {
  "use cache";
  cacheLife("weeks");

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

export const getPublishedArticles = async () => {
  "use cache";
  cacheLife("weeks");

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

export const getArticlesByPage = async (page: number, limit: number = 1) => {
  const skip = (page - 1) * limit;

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
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