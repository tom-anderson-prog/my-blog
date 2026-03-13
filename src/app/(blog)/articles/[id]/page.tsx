import { Suspense } from "react";
import ArticleContent from "./article-content";

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
