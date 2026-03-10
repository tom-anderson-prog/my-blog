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

export const getAllArticles = async () => {
  "use cache";
  cacheLife("weeks");

  const result = await prisma.category.findMany({
    include: { articles: true },
  });

  return result;
};

export const getArticleById = async (id: string) => {
  "use cache";

  const result = await prisma.article.findUnique({
    where: { id: +id },
  });
  return result;
};