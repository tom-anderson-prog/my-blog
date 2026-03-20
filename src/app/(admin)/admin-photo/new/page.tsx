import { addPhoto } from "@/actions/photo";
import PhotoForm from "../_components/photo-form";

export default function NewPhotoPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <PhotoForm submitAction={addPhoto} />
    </div>
  );
}
