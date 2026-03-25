"use client";

import { articleSchema, type ArticleFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEditor } from "md-editor-rt";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageUploader } from "@/components/image-uploader";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ArticleFormProps {
  initialData?: ArticleFormValues;
  categories: {
    id: number;
    name: string;
  }[];
  submitAction: (data: ArticleFormValues) => Promise<any>;
}

export default function ArticleForm({
  initialData,
  categories,
  submitAction,
}: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      content: "",
      image: "",
      categoryId: "",
      status: "DRAFT",
    },
    resolver: zodResolver(articleSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (values: ArticleFormValues) => {
    if (values.status === "PUBLISHED") {
      values.publishedAt = new Date();
    }
    try {
      const result = await submitAction(values);
      if (result) {
        toast.error(result);
      }
    } catch (e) {
      console.error(
        `${isEdit ? "Failed to update article" : "Failed to add article"}`,
        e,
      );
      toast.error(
        `${isEdit ? "Failed to update article" : "Failed to add article"}.Please try again.`,
      );
    }
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          {isEdit ? "EDIT ARTICLE" : "NEW ARTICLE"}
        </h1>
        <p className="text-slate-500">
          {isEdit
            ? "Update you article"
            : "Share your thoughts, whatever it is."}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Field>
            <FieldLabel>Article Title</FieldLabel>
            <FieldContent>
              <Input
                {...register("title")}
                placeholder="Enter a title..."
                className="text-lg font-medium h-9"
              />
            </FieldContent>
            <div className="min-h-1 mt-1">
              <FieldError className="text-[11px] leading-none">
                {errors.title?.message}
              </FieldError>
            </div>
          </Field>

          <Field>
            <FieldLabel>Article Abstract</FieldLabel>
            <FieldContent>
              <Textarea
                {...register("abstract")}
                placeholder="Please enter your article abstract"
                className="text-lg"
              />
            </FieldContent>
            <div className="min-h-1 mt-1">
              <FieldError className="text-[11px] leading-none">
                {errors.abstract?.message}
              </FieldError>
            </div>
          </Field>

          <Field>
            <FieldLabel>Content</FieldLabel>
            <FieldContent className="min-h-125">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <MdEditor
                    value={field.value}
                    onChange={field.onChange}
                    toolbars={[
                      "title",
                      "quote",
                      "unorderedList",
                      "orderedList",
                      "task",
                      "-",
                      "codeRow",
                      "code",
                      "link",
                      "image",
                      "table",
                      "-",
                      "pageFullscreen",
                      "fullscreen",
                      "preview",
                      "htmlPreview",
                      "catalog",
                    ]}
                    previewTheme="github"
                    id="article-editor"
                    codeTheme="atom-one-dark"
                    language="en-US"
                    toolbarsExclude={["github"]}
                    className="h-150 border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/50 p-1"
                  />
                )}
              />
            </FieldContent>
            <div className="min-h-1 mt-1">
              <FieldError className="text-[11px] leading-none">
                {errors.content?.message}
              </FieldError>
            </div>
          </Field>
        </div>
        <div className="space-y-6">
          <Field>
            <FieldLabel>Cover Image</FieldLabel>
            <FieldContent>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:border-slate-900 hover:bg-white transition-all">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </FieldContent>
            <div className="min-h-1 mt-1">
              <FieldError className="text-[11px] leading-none">
                {errors.image?.message}
              </FieldError>
            </div>
          </Field>

          <Field>
            <FieldLabel>Category</FieldLabel>
            <FieldContent>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}>
                    <SelectTrigger className="h-9 w-full rounded-lg border-slate-200 focus:ring-slate-100 focus:border-slate-900">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FieldContent>
            <div className="min-h-1 mt-1">
              <FieldError className="text-[11px] leading-none">
                {errors.categoryId?.message}
              </FieldError>
            </div>
          </Field>

          <Field>
            <FieldLabel>Article Status</FieldLabel>
            <FieldContent>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}>
                    <SelectTrigger className="h-9 w-full rounded-lg border-slate-200 focus:ring-slate-100 focus:border-slate-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">DRAFT</SelectItem>
                      <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FieldContent>
            <div className="min-h-1 mt-1">
              <FieldError className="text-[11px] leading-none">
                {errors.status?.message}
              </FieldError>
            </div>
          </Field>
        </div>
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
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Update Article"
              : "Save Article"}
        </Button>
      </div>
    </form>
  );
}
