"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Home, Mountain, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog Error: ", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-6">
      <div className="flex items-center mb-8 opacity-20">
        <Mountain className="w-12 h-12 mr-3" />
        <span className="text-3xl font-bold tracking-tighter">
          At&apos;s blog
        </span>
      </div>

      <div className="text-center max-w-md">
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          Oops~Something went sideways.
        </h1>

        <p className="text-slate-500 mb-10 leading-relaxed">
          It looks like this page is having a moment.Don&apos;t worry, please
          try refreshing or head back to our latest articles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            variant="default"
            className="w-full sm:w-auto rounded-full bg-zinc-950 hover:bg-zinc-800 px-8 py-6 h-auto text-base">
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Refreshing
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto rounded-full border-slate-200 px-8 py-6 h-auto text-base">
            <Link href="/articles">
              <BookOpen className="w-5 h-5 mr-2" />
              Read Articles
            </Link>
          </Button>
        </div>

        <Link
          href="/"
          className="inline-flex items-center mt-8 text-sm text-slate-400 hover:text-slate-600 transition-colors">
          <Home className="mr-1.5 w-4 h-4" />
          Back To Home
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-slate-100 to-transparent" />
    </div>
  );
}
