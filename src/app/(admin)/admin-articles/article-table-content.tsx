import CommonPagination from "@/components/common-pagination";
import CommonTable from "@/components/common-table";

import { getArticlesByPage } from "@/lib/data";

export default async function ArticleTableContent({
  params,
}: {
  params: Promise<{ page?: string }>;
}) {
  const { page } = await params;
  console.log({ page });
  const currentPage = Number(page) || 1;

  const columns = [
    { header: "Title", render: (item: any) => item.title },
    { header: "Status", render: (item: any) => item.status },
    {
      header: "Actions",
      render: (item: any) => <button className="text-blue-500">Edit</button>,
    },
  ];
  const { articles, totalPages } = await getArticlesByPage(currentPage);
  return (
    <>
      <CommonTable columns={columns} data={articles} />
      <CommonPagination totalPages={totalPages} />
    </>
  );
}
