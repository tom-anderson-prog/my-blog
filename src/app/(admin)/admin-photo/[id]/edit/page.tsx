import { getPhotoById } from "@/lib/data";
import { notFound } from "next/navigation";
import PhotoForm from "../../_components/photo-form";
import { editPhoto } from "@/actions/photo";

export default async function EditPhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = await getPhotoById(id);

  if (!photo) notFound();

  const editPhotoById = editPhoto.bind(null, +id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <PhotoForm
        initialData={{
          id: photo.id,
          url: photo.url,
          caption: photo.caption,
          description: photo.description || "",
        }}
        submitAction={editPhotoById}
      />
    </div>
  );
}
