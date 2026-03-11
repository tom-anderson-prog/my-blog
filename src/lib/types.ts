export type WorkoutStep = {
  id: number;
  type: "EXERCISE" | "REST";
  name: string;
  duration: number;
  order: number;
};

export type Routine = {
  id: number;
  name: string;
  isEnabled: boolean;
  repeatCount: number;
  isActive?: boolean;
  steps: WorkoutStep[];
  totalDuration?: number;
};
