import { getPhotos } from "@/lib/data";
import Image from "next/image";

export default async function PhotoGrid() {
  const data = await getPhotos();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div
          key={item.id}
          className="relative aspect-3/4 rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl group cursor-pointer">
          <Image
            src={item.url}
            alt={item.caption}
            fill
            priority={index <= 12}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
