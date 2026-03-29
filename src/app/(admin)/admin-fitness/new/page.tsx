import { addRoutine } from "@/actions/fitness";
import RoutineForm from "../_components/routine-form";
import { Suspense } from "react";

export default function NewRoutinePage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          NEW ROUTINE
        </h1>
        <p className="text-slate-500">Create a custom workout sequence.</p>
      </header>
      <Suspense>
        <RoutineForm submitAction={addRoutine} />
      </Suspense>
    </div>
  );
}
