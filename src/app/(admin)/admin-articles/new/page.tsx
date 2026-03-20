import { getAllCategories } from "@/lib/data";
import ArticleForm from "../_components/article-form";
import { addArticle } from "@/actions/article";
import { Suspense } from "react";

export default async function NewArticlePage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <Suspense fallback={<></>}>
        <ArticleForm categories={categories} submitAction={addArticle} />
      </Suspense>
    </div>
  );
}
