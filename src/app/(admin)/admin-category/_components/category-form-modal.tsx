"use client";

import { addCategory, editCategory } from "@/actions/category";
import BlogButton from "@/components/blog-buttons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BasicCategory } from "@/lib/types";
import { useState } from "react";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: BasicCategory | null;
}

export function CategoryFormModal({
  isOpen,
  onClose,
  category,
}: CategoryFormModalProps) {
  const [name, setName] = useState(category?.name || "");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const validate = (value: string) => {
    if (!value.trim()) {
      setError("Category name is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validate(value);
  };

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    if (!validate(name)) return;

    setIsPending(true);
    try {
      if (category?.id) {
        await editCategory({
          id: category?.id,
          name,
        });
      } else {
        await addCategory({ name });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25 bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Category management form
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-500">
              Category Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Please enter category name"
              autoComplete="off"
              className={`rounded-lg transition-all duration-200 ${error ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-slate-900"}`}
            />
            <div className="h-5">
              {error && (
                <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-3">
            <BlogButton
              type="button"
              action="cancel"
              name="Cancel"
              onClick={onClose}
            />
            <BlogButton
              type="submit"
              action="confirm"
              name={isPending ? "Saving..." : "Save"}
              disabled={isPending}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
