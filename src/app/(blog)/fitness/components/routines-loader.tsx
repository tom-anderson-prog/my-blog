import { Suspense } from "react";
import RoutinesInitializer from "./routines-initializer";
import { FitnessRoutine, RoutineWithWorkout } from "@/lib/types";
import { getEnabledRoutines } from "@/lib/data";

export const getRoutines = async (): Promise<RoutineWithWorkout[]> => {
  const result = await getEnabledRoutines();

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
