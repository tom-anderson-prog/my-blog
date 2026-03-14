import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import PhotoGrid from "./photo-grid";
import PhotoWallSkeleton from "@/components/skeleton/photowall-skeleton";

export default function PhotoWallPage() {
  return (
    <div className="w-full min-h-full">
      <PageTitle title="Photos" />

      <Suspense fallback={<PhotoWallSkeleton />}>
        <PhotoGrid />
      </Suspense>
    </div>
  );
}
