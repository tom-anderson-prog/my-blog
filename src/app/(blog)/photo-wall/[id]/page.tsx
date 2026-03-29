import { Suspense } from "react";
import PhotoContent from "./photo-content";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { getPhotoById } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const photo = await getPhotoById(id);

  return {
    title: photo?.caption,
  };
}

export async function generateStaticParams() {
  const photos = await prisma.photo.findMany({
    select: { id: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return photos.map((photo) => ({
    id: photo.id.toString(),
  }));
}

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
