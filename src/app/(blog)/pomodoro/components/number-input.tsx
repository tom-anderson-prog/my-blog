"use client";

import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  allowInput?: boolean;
}

export const NumberInput = ({
  value,
  onChange,
  min = 1,
  max = 20,
  step = 1,
  allowInput = true,
}: NumberInputProps) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(Math.max(min, value - step));
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(Math.min(max, value + step));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!allowInput) return;

    const val = e.target.value;

    if (val === "") {
      onChange(0);
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="flex items-center justify-between gap-1 bg-[#FDF7F7] p-1 rounded-xl border-none">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="text-gray-400 p-2 hover:text-[#FF2B81] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors">
        <Minus size={20} strokeWidth={3} className="hover:scale-110 active:scale-90 transition-transform duration-200" />
      </button>

      <Input
        type="text"
        value={value === 0 ? "" : value}
        onChange={handleInputChange}
        readOnly={!allowInput}
        className={`w-12 h-10 border-none bg-transparent text-center font-bold text-md md:text-lg ${allowInput ? "cursor-text" : "cursor-default select-none"} focus-visible:ring-0 focus-visible:ring-offset-0`}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="text-gray-400 p-2 hover:text-[#FF2B81] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors">
        <Plus size={20} strokeWidth={3} className="hover:scale-110 active:scale-90 transition-transform duration-200" />
      </button>
    </div>
  );
};
