"use client";

import { addCategory, editCategory } from "@/actions/category";
import BlogButton from "@/components/blog-buttons";
import {
  Dialog,
  DialogContent,
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

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-500">
              Category Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Please enter category name"
              autoComplete="off"
              required
              className="rounded-lg border-slate-200 focus:ring-slate-900"
            />
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
