"use client";

import { uploadFileToOSS } from "@/lib/oss";
import { RotateCcw, Trash2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  className,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);

    const loadingToast = toast.loading("Uploading to OSS...");

    try {
      const imageUrl = await uploadFileToOSS(file);

      onChange(imageUrl);
      toast.success("Upload successful", { id: loadingToast });
    } catch (error) {
      toast.error("Upload failed, please try again", { id: loadingToast });
      console.error(error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    toast.success("Image Removed");
  };

  return (
    <div
      className={`relative group overflow-hidden rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div
        onClick={triggerFileInput}
        className={`border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all ${uploading ? "opacity-60 cursor-not-allowed" : ""} ${!value ? "h-64 flex items-center justify-center" : ""}`}>
        {value ? (
          <div className="relative h-64 w-full flex items-center justify-center p-2 bg-slate-50">
            <img
              src={value}
              className="max-h-full max-w-full rounded-md shadow-sm object-contain"
              alt="Upload Preview"
            />

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={triggerFileInput}
                className="flex items-center gap-1.5 py-2 px-3 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
                <RotateCcw className="w-4 h-4" />
                Change
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`h-64 flex flex-col items-center justify-center cursor-pointer ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}>
            <ImagePlus className="w-8 h-8 font-light" />
            <p className="text-sm font-semibold text-slate-700">
              Click to upload photo
            </p>
            <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 10MB</p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
          </div>
        )}
      </div>
    </div>
  );
}
