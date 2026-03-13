import { getPhotos } from "@/lib/data";
import PhotoItem from "./photo-item";


export default async function PhotoGrid() {
  const data = await getPhotos();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <PhotoItem key={item.id} photo={item} index={index} />
      ))}
    </div>
  );
}
