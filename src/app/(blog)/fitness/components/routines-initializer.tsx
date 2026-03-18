"use client";

import { RoutineWithWorkout } from "@/lib/types";
import { useWorkoutStore } from "@/stores/workoutStore";
import { useEffect } from "react";

interface RoutinesInitializerProps {
  routines: RoutineWithWorkout[];
  children: React.ReactNode;
}

export default function RoutinesInitializer({
  routines,
  children,
}: RoutinesInitializerProps) {
  const { setRoutines, activeRoutineId, setActiveRoutine } = useWorkoutStore();

  useEffect(() => {
    if (routines?.length > 0) {
      setRoutines(routines);
      if (!activeRoutineId) {
        setActiveRoutine(routines[0].id);
      }
    }
  }, [routines, activeRoutineId, setRoutines, setActiveRoutine]);

  return <>{children}</>;
}
