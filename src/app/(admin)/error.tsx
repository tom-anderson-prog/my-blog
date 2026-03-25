"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Boundary Error: ", error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-slate-50/50 p-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="right-full bg-red-50 p-4 text-red-600 mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Management System Error
        </h2>

        <p className="text-slate-500 mb-8 leading-relaxed">
          We encountered an issue while processing administrative data. This
          might be a temporary database connection reset or a session timeout.
        </p>

        <div className="flex gap-4">
          <Button
            onClick={() => (window.location.href = "/admin-articles")}
            variant="outline"
            className="rounded-xl border-slate-200">
            Back to Dashboard
          </Button>

          <Button
            onClick={() => reset()}
            className="rounded-xl bg-zinc-950 flex gap-2 items-center">
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
