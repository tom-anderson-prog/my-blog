import PhotoModal from "@/components/photo-modal";
import { getPhotoById } from "@/lib/data";

export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPhotoById(id);

  if (!data) return null;
  return (
    <>
      <PhotoModal image={data} />
    </>
  );
}
