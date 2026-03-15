import { Suspense } from "react";
import RoutinesInitializer from "./routines-initializer";

import { FitnessRoutine } from "@/lib/types";

export const getRoutines = async (): Promise<FitnessRoutine[]> => {
  await new Promise((r) => setTimeout(r, 800));
  const result: FitnessRoutine[] = [
    {
      id: 1,
      name: "Morning Yoga",
      isEnabled: true,
      repeatCount: 1,
      steps: [
        {
          id: 1,
          type: "EXERCISE",
          name: "Warm Up",
          duration: 10,
          order: 1,
        },
        { id: 2, type: "REST", name: "REST", duration: 10, order: 2 },
        { id: 3, type: "EXERCISE", name: "Heihei", duration: 10, order: 3 },
      ],
      totalDuration: 30,
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
