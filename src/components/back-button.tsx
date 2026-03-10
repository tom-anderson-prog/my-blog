"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type BackButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export const BackButton = ({
  href,
  label = "Back",
  className,
}: BackButtonProps) => {
  const router = useRouter();

  if (href) {
    return (
      <Button variant="ghost" size="sm" asChild className={className}>
        <Link href={href}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className={className}>
      <ChevronLeft className="mr-1 w-4 h-4" />
      {label}
    </Button>
  );
};
