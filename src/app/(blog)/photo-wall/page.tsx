import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import PhotoGrid from "./photo-grid";

export default async function PhotoWallPage() {
  return (
    <div className="w-full min-h-full">
      <PageTitle title="Photos" />
      <Suspense fallback={<></>}>
        <PhotoGrid />
      </Suspense>
    </div>
  );
}
