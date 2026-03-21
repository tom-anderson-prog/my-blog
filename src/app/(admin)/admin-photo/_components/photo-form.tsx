"use client";

import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { photoSchema, type PhotoFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface PhotoFormProps {
  initialData?: PhotoFormValues & { id: number };
  submitAction: (data: PhotoFormValues) => Promise<any>;
}

export default function PhotoForm({
  initialData,
  submitAction,
}: PhotoFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PhotoFormValues>({
    defaultValues: initialData || {
      url: "",
      caption: "",
      description: "",
    },
    resolver: zodResolver(photoSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (values: PhotoFormValues) => {
    const result = await submitAction(values);

    if (result?.error) {
      toast.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          {isEdit ? "EDIT PHOTO" : "NEW PHOTO"}
        </h1>
        <p className="text-slate-500">
          {isEdit ? "Update you photo information" : "Share a new moment."}
        </p>
      </header>

      <div className="space-y-6">
        <Field>
          <FieldLabel>Photo</FieldLabel>
          <FieldContent>
            <Controller
              name="url"
              control={control}
              render={({ field }) => (
                <ImageUploader value={field.value} onChange={field.onChange} />
              )}
            />
          </FieldContent>
          <FieldDescription>
            Upload a high-quality image (up to 10MB).
          </FieldDescription>

          <div className="min-h-1 mt-1">
            <FieldError className="text-[11px] leading-none">
              {errors.url?.message}
            </FieldError>
          </div>
        </Field>

        <Field>
          <FieldLabel>Caption</FieldLabel>
          <FieldContent>
            <Input
              {...register("caption")}
              autoComplete="off"
              placeholder="Give it a catchy title"
            />
          </FieldContent>
          <div className="min-h-1 mt-1">
            <FieldError className="text-[11px] leading-none">
              {errors.caption?.message}
            </FieldError>
          </div>
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <FieldContent>
            <Textarea
              {...register("description")}
              autoComplete="off"
              placeholder="What's the story behind this photo?"
            />
          </FieldContent>
          <FieldDescription>Optional, max 200 characters.</FieldDescription>
          <div className="min-h-1 mt-1">
            <FieldError className="text-[11px] leading-none">
              {errors.description?.message}
            </FieldError>
          </div>
        </Field>
      </div>

      <div className="bg-white/80 backdrop-blur-md border-t border-slate-100 p-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          className="text-slate-400 hover:bg-slate-100"
          onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-900 text-white hover:bg-slate-800 px-10 h-12 rounded-xl font-black disabled:opacity-50">
          {isSubmitting ? "Saving..." : isEdit ? "Update Photo" : "Save Photo"}
        </Button>
      </div>
    </form>
  );
}
