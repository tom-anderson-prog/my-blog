import { BackButton } from "@/components/back-button";
import { Suspense } from "react";
import ArticleContent from "./ArticleContent";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <div className="my-6">
        <BackButton label="Go back" />
      </div>
      <Suspense fallback={<></>}>
        <ArticleContent params={params} />
      </Suspense>
    </>
  );
}
