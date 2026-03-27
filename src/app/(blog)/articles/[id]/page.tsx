import { Suspense } from "react";
import ArticleContent from "./article-content";
import type { Metadata } from "next";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ title: string }>;
}): Promise<Metadata> => {
  const { title } = await searchParams;

  return {
    title,
  };
};

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
