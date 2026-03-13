import { getPhotoById } from "@/lib/data";

export default async function PhotoContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPhotoById(id);

  if (!data) {
    return null;
  }

  return <div>Photo Content</div>;
}
