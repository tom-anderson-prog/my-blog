import { Suspense } from "react";
import RoutinesInitializer from "./routines-initializer";

import { Routine } from "@/lib/types";

export const getRoutines = async (): Promise<Routine[]> => {
  await new Promise((r) => setTimeout(r, 800));
  const result: Routine[] = [
    {
      id: 1,
      name: "Morning Yoga",
      isEnabled: true,
      repeatCount: 1,
      steps: [
        {
          id: 1,
          type: "EXERCISE",
          name: "Sun Salutation B",
          duration: 525,
          order: 1,
        },
        { id: 2, type: "REST", name: "REST", duration: 30, order: 2 },
      ],
      totalDuration: 555,
    },
  ];

  return result;
};

export default async function RoutinesLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const routines = await getRoutines();

  console.log({ routines });

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-500">
          Loading...
        </div>
      }>
      <RoutinesInitializer routines={routines}>{children}</RoutinesInitializer>
    </Suspense>
  );
}
