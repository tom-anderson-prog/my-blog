"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { create } from "zustand";

interface ConfirmStore {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirm: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ) => void;
  close: () => void;
}

export const useConfirm = create<ConfirmStore>((set, get) => ({
  isOpen: false,
  title: "",
  message: "",
  onConfirm: () => {},
  onCancel: undefined,
  confirm: (title, message, onConfirm, onCancel) =>
    set({ isOpen: true, title, message, onConfirm, onCancel }),
  close: () => {
    const { onCancel } = get();
    if (onCancel) onCancel();
    set({ isOpen: false, onCancel: undefined });
  },
}));

export function GlobalConfirmModal() {
  const { isOpen, title, message, onConfirm, close } = useConfirm();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) close();
      }}>
      <AlertDialogContent className="max-w-100 rounded-2xl border-none shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-bold tracking-tight text-slate-900">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px] leading-relaxed text-slate-500">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex gap-3 sm:justify-end">
          <AlertDialogCancel
            onClick={close}
            className="h-11 flex-1 rounded-2xl border-slate-200 bg-slate-50 font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 sm:flex-none sm:px-6">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="h-11 flex-1 rounded-2xl bg-red-500 font-medium text-white transition-all hover:bg-red-600 active:scale-95 sm:flex-none sm:px-8"
            onClick={() => {
              onConfirm();
              useConfirm.setState({
                isOpen: false,
                onCancel: undefined,
              });
            }}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
