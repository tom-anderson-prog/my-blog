// app/workout/page.tsx
import { Suspense } from "react";
import FitnessContentPage from "./components/fitness-content";
import RoutinesLoader from "./components/routines-loader";

export default function WorkoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          加载中...
        </div>
      }>
      <RoutinesLoader>
        <FitnessContentPage />
      </RoutinesLoader>
    </Suspense>
  );
}
