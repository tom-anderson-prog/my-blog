"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useTimerStore } from "@/stores/timer-store";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { NumberInput } from "./number-input";

export const PomodoroSettingModal = () => {
  const [open, setOpen] = useState(false);
  const { config, updateConfig } = useTimerStore();
  const [tempConfig, setTempConfig] = useState(config);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTempConfig(config);
    }
  };

  const handleSave = () => {
    updateConfig(tempConfig);

    setOpen(false);
  };

  const handleInputChange = (val: number, key: string) => {
    setTempConfig((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="p-3 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer">
          <Settings2 size={32} strokeWidth={1.5} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-white border-none rounded-md p-10 shadow-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Pomodoro Settings
          </DialogTitle>
          <DialogDescription className="sr-only">
            Pomodoro Settings
          </DialogDescription>
          <div className="h-1 w-8 bg-linear-to-r from-[#FF6B35] to-[#FF2B81] rounded-full mt-2" />
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Pomodoro Duration
              </label>
              <span className="text-2xl font-bold text-[#FF2B81]">
                {tempConfig.pomodoroDuration}{" "}
                <span className="text-xs text-gray-400 font-medium">min</span>
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={tempConfig.pomodoroDuration}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 5) {
                  setTempConfig((prev) => ({
                    ...prev,
                    pomodoroDuration: Number(e.target.value),
                  }));
                } else {
                  setTempConfig((prev) => ({
                    ...prev,
                    pomodoroDuration: 5,
                  }));
                }
              }}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              style={{
                background: `linear-gradient(to right, #FF6B35 0%, #FF2B81 ${(tempConfig.pomodoroDuration * 100) / 60}%, #F3F4F6 0%)`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <section className="flex flex-col space-y-4">
            <label className="text-sm uppercase font-bold text-slate-500">
              Short Break: {tempConfig.shortBreak} mins
            </label>
            <div className="flex gap-4">
              {[5, 10, 15].map((v) => (
                <button
                  key={v}
                  onClick={() =>
                    setTempConfig((prev) => ({ ...prev, shortBreak: v }))
                  }
                  className={`relative flex-1 py-3 rounded-sm font-bold overflow-hidden transition-all ${tempConfig.shortBreak === v ? "bg-gray-50 text-[#FF2B81]" : "bg-gray-100 text-gray-400"}`}>
                  {v}
                  {tempConfig.shortBreak === v && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF2B81]" />
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-col justify-start items-start space-y-4">
            <label className="text-sm uppercase font-bold text-slate-500">
              Auto Cycle: {tempConfig.isAutoCycle ? "Open" : "Close"}
            </label>
            <Switch
              id="airplane-mode"
              checked={tempConfig.isAutoCycle}
              onCheckedChange={(e) =>
                setTempConfig((prev) => ({
                  ...prev,
                  isAutoCycle: e,
                }))
              }
              className="data-[state=checked]:bg-[#FF2B81] data-[state=unchecked]:bg-slate-200"></Switch>
          </section>
          </div>

          {tempConfig.isAutoCycle && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
              <section className="flex flex-col space-y-4">
                <label className="text-sm uppercase font-bold text-slate-500">
                  Long Break: {tempConfig.longBreak} mins
                </label>
                <NumberInput
                  value={tempConfig.longBreak}
                  onChange={(val) => handleInputChange(val, "longBreak")}
                  min={30}
                  step={30}
                  max={120}
                  allowInput={false}
                />
              </section>

              <section className="flex flex-col space-y-4">
                <label className="text-sm uppercase font-bold text-slate-500">
                  Long Break After {tempConfig.longBreakAfterNumCycles} cycles
                </label>
                <NumberInput
                  value={tempConfig.longBreakAfterNumCycles}
                  onChange={(val) =>
                    handleInputChange(val, "longBreakAfterNumCycles")
                  }
                  min={2}
                  step={1}
                  max={10}
                  allowInput={false}
                />
              </section>

              <section className="flex flex-col space-y-4">
                <label className="text-sm uppercase font-bold text-slate-500">
                  Cycles: {tempConfig.cycles} rounds
                </label>
                <NumberInput
                  value={tempConfig.cycles}
                  onChange={(val) => handleInputChange(val, "cycles")}
                  min={2}
                  step={1}
                  max={30}
                  allowInput={false}
                />
              </section>
            </div>
          )}

          <div className="mt-8 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="text-slate-400 hover:bg-slate-100"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="border-none! bg-linear-to-r from-[#FF6B35] to-[#FF2B81] hover:scale-105 text-white text-sm font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-transform">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
