import { Suspense } from "react";
import PhotoModalContent from "./photo-modal-content";

export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense>
      <PhotoModalContent params={params} />
    </Suspense>
  );
}
