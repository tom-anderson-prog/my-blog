import { getArticleById } from "@/lib/data";
import { format } from "date-fns";
import Image from "next/image";

export default async function ArticleContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getArticleById(id);

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="mx-3 space-y-2 mb-4">
        <div className="text-3xl font-bold">{data.title}</div>
        <div className="text-sm text-muted-foreground">
          Published on {data.publishedAt && format(data.publishedAt, "PP")}
        </div>
      </div>
      {data?.image && (
        <div className="relative w-full aspect-video rounded-sm overflow-hidden shadow-sm mb-4">
          <Image src={data.image || ""} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="mx-3 text-base/6 text-left">{data.content}</div>
    </>
  );
}
