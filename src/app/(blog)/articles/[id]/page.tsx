import { Suspense } from "react";
import ArticleContent from "./article-content";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { getArticleById } from "@/lib/data";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;
  const data = await getArticleById(id);

  return {
    title: data?.title,
  };
};

export async function generateStaticParams() {
  const photos = await prisma.article.findMany({
    select: { id: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return photos.map((photo) => ({
    id: photo.id.toString(),
  }));
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <Suspense fallback={<></>}>
        <ArticleContent params={params} />
      </Suspense>
    </>
  );
}
