import { Suspense } from "react";
import EditArticleContent from "./edit-article-content";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <Suspense>
        <EditArticleContent params={params} />
      </Suspense>
    </div>
  );
}
