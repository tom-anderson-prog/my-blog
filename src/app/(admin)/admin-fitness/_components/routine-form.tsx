"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { routineSchema, type RoutineFormValues } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function RoutineForm({
  initialData,
  submitAction,
}: {
  initialData?: {
    [key in string]: any;
  } & RoutineFormValues;
  submitAction: (data: RoutineFormValues) => Promise<any>;
}) {
  const router = useRouter();
  const isEdit = !!initialData;
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoutineFormValues>({
    defaultValues: initialData || {
      name: "",
      repeatCount: 1,
      steps: [
        {
          type: "EXERCISE",
          name: "",
          duration: 0,
        },
      ],
    },
    resolver: zodResolver(routineSchema) as any,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const watchedSteps = useWatch({
    control,
    name: "steps",
  });

  const totalSeconds = (watchedSteps || []).reduce(
    (acc, step) => acc + (Number(step?.duration) || 0),
    0,
  );

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (values: RoutineFormValues) => {
    try {
      const result = await submitAction({
        ...values,
        totalDuration: totalSeconds,
      });
      if (result) {
        toast.error(result);
      }
    } catch (e) {
      console.error(
        `${isEdit ? "Failed to update routine" : "Failed to add routine"}`,
        e,
      );
      toast.error(
        `${isEdit ? "Failed to update routine" : "Failed to add routine"}.Please try again.`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="flex justify-between items-center gap-6 bg-slate-50 p-6 rounded-2xl border">
        <Field className="flex-3">
          <FieldLabel>Routine Name</FieldLabel>
          <Input
            {...register("name")}
            autoComplete="off"
            placeholder="Please enter routine name"
            className="h-9"
          />
          <div className="min-h-1 mt-1">
            <FieldError className="text-[11px] leading-none">
              {errors.name?.message}
            </FieldError>
          </div>
        </Field>

        <Field className="flex-1">
          <FieldLabel>Repeat Times</FieldLabel>
          <Input
            {...register("repeatCount")}
            autoComplete="off"
            placeholder="Please enter routine repeat times"
            className="h-9"
          />
          <div className="min-h-1 mt-1">
            <FieldError className="text-[11px] leading-none">
              {errors.repeatCount?.message}
            </FieldError>
          </div>
        </Field>
      </div>

      <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border">
        <div className="flex items-center justify-between px-2">
          <div className="text-slate-400 font-bold tracking-wider uppercase text-sm">
            Workout Steps
          </div>
          <div className="p-2 text-slate-600 font-bold bg-slate-300 uppercase text-sm rounded-lg">
            {fields.length} Steps Total
          </div>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => {
            const currentType = watchedSteps?.[index]?.type || field.type;

            return (
              <div
                key={field.id}
                className="group relative flex items-center gap-4 p-4 border rounded-2xl bg-white shadow-sm">
                <div className="w-24 flex justify-center">
                  <div className="w-10 h-10 flex justify-center items-center rounded-full text-slate-500 bg-slate-300 font-semibold">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                </div>

                <Field className="w-32">
                  <FieldLabel>Step Type</FieldLabel>
                  <Tabs
                    value={currentType}
                    onValueChange={(value) =>
                      setValue(
                        `steps.${index}.type` as const,
                        value as "EXERCISE" | "REST",
                      )
                    }>
                    <TabsList>
                      <TabsTrigger value="EXERCISE">EXERCISE</TabsTrigger>
                      <TabsTrigger value="REST">REST</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="min-h-1 mt-1">
                    <FieldError className="text-[11px] leading-none">
                      {errors.steps?.[index]?.type?.message}
                    </FieldError>
                  </div>
                </Field>
                <Field className="flex-1">
                  <FieldLabel>Step Name</FieldLabel>
                  <Input
                    {...register(`steps.${index}.name` as const)}
                    placeholder="Please enter step name"
                    autoComplete="off"
                    className="h-9"
                  />
                  <div className="min-h-1 mt-1">
                    <FieldError className="text-[11px] leading-none">
                      {errors.steps?.[index]?.name?.message}
                    </FieldError>
                  </div>
                </Field>

                <Field className="w-32">
                  <FieldLabel>Duration(SEC)</FieldLabel>
                  <Input
                    {...register(`steps.${index}.duration` as const)}
                    type="number"
                    autoComplete="off"
                    className="h-9 bg-slate-50 border-none text-center"
                  />
                  <div className="min-h-1 mt-1">
                    <FieldError className="text-[11px] leading-none">
                      {errors.steps?.[index]?.duration?.message}
                    </FieldError>
                  </div>
                </Field>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg active:bg-red-200">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed h-14 border-slate-200 rounded-2xl text-slate-400 hover:bg-slate-50 transition-all hover:border-slate-300 group"
          onClick={() =>
            append({
              type: "EXERCISE",
              name: "",
              duration: 0,
            })
          }>
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
          <span className="text-sm font-bold tracking-widest">
            Add New Step
          </span>
        </Button>
      </div>

      <div className="bg-white/80 backdrop-blur-md border-t border-slate-100 p-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          className="text-slate-400 hover:bg-slate-100"
          onClick={() => router.back()}>
          Cancel
        </Button>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="font-black text-slate-400 leading-none mb-1">
              Total Duration
            </p>
            <p className="text-2xl font-mono font-black text-slate-900 leading-none">
              {formatTime(totalSeconds)}
            </p>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-900 text-white hover:bg-slate-800 px-10 h-12 rounded-xl font-black disabled:opacity-50">
            {isSubmitting
              ? "Saving..."
              : isEdit
                ? "Update Routine"
                : "Save Routine"}
          </Button>
        </div>
      </div>
    </form>
  );
}
