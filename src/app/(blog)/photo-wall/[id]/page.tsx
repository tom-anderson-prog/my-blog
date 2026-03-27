import { Suspense } from "react";
import PhotoContent from "./photo-content";

import type { Metadata } from "next";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ caption: string }>;
}): Promise<Metadata> => {
  const { caption } = await searchParams;

  return {
    title: caption,
  };
};

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
