"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkoutStore } from "@/stores/workoutStore";

export default function RoutineSelector() {
  const { routines, activeRoutineId, activeRoutine, setActiveRoutine } =
    useWorkoutStore();

  const selectedValue = activeRoutineId?.toString() || "";

  return (
    <div className="flex flex-col items-center justify-start mb-4">
      <div className="text-sm text-slate-500 tracking-wider mb-2">
        SELECT ROUTINE{" "}
        <span className="text-[#ef611a] font-medium">
          ACTIVE: {activeRoutine?.name}
        </span>
      </div>
      <Select
        value={selectedValue}
        onValueChange={(e) => setActiveRoutine(Number(e))}>
        <SelectTrigger className="w-full md:w-70 max-w-72">
          <SelectValue placeholder="Select a routine" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Routines</SelectLabel>
            {routines.map((item) => (
              <SelectItem value={item.id.toString()} key={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
