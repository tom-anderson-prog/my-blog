import { getAllCategories, getArticleById } from "@/lib/data";
import ArticleForm from "../../_components/article-form";
import { notFound } from "next/navigation";
import { editArticle } from "@/actions/article";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, article] = await Promise.all([
    getAllCategories(),
    getArticleById(id),
  ]);

  if (!article) notFound();

  const editArticleById = editArticle.bind(null, +id);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <ArticleForm
        categories={categories}
        initialData={{
          title: article.title,
          content: article.content,
          image: article.image || "",
          categoryId: article.categoryId,
          status: article.status as "DRAFT" | "PUBLISHED",
        }}
        submitAction={editArticleById}
      />
    </div>
  );
}
