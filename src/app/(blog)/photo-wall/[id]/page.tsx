import { Suspense } from "react";
import PhotoContent from "./photo-content";

export default async function PhotoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <Suspense>
        <PhotoContent params={params} />
      </Suspense>
    </>
  );
}
