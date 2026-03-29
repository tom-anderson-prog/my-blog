import { editRoutine } from "@/actions/fitness";
import RoutineForm from "../../_components/routine-form";
import { getRoutineById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function NewRoutinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getRoutineById(+id);
  if (!data) notFound();

  const submitAction = editRoutine.bind(null, +id);

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          EDIT ROUTINE
        </h1>
        <p className="text-slate-500">Modify your workout steps and timing.</p>
      </header>
      <Suspense>
        <RoutineForm
          submitAction={submitAction}
          initialData={{
            id: data.id,
            name: data.name,
            repeatCount: data.repeatCount,
            steps: (data.steps as any[]) || [],
          }}
        />
      </Suspense>
    </div>
  );
}
