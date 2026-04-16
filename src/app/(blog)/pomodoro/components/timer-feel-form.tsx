"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTimerStore } from "@/stores/timer-store";
import { Angry, Frown, Laugh, Smile } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { focusSessionSchema } from "@/lib/types";
import { addFocusSession } from "@/actions/pomodoro";
import { toast } from "sonner";
import z from "zod";

const PRESET_TAGS = ["work", "study", "coding", "reading", "exercise"];

const ICONS = [
  { icon: Angry, value: 1, color: "hover:text-red-500" },
  { icon: Frown, value: 2, color: "hover:text-orange-500" },
  { icon: Smile, value: 3, color: "hover:text-green-500" },
  { icon: Laugh, value: 4, color: "hover:text-yellow-500" },
];

export const TimerFeelForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      emoji: 3,
      tags: [] as string[],
      feeling: "",
    },
    resolver: zodResolver(focusSessionSchema),
  });

  const { resetTimer, config, startTime, mode } = useTimerStore();

  const onSubmit = async (values: z.infer<typeof focusSessionSchema>) => {
    try {
      await addFocusSession({
        ...values,
        startTime,
        endTime: new Date(),
        mode,
        shortBreak: mode === "pomodoro" ? config.shortBreak : "",
        longBreak: mode === "pomodoro" ? config.longBreak : "",
        longBreakAfterNumCycles:
          mode === "pomodoro" ? config.longBreakAfterNumCycles : "",
        pomodoroDuration: mode === "pomodoro" ? config.pomodoroDuration : "",
        cycles: mode === "pomodoro" ? config.cycles : "",
      });
      toast.success("Well Done! You've successfully add your focus session.");
      resetTimer();
      reset();
    } catch (e) {
      console.error(`Failed to add Focus Seesion: `, e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:max-w-2xl p-8 bg-gray-50 rounded-xl w-full">
      <div className="flex flex-col gap-3">
        <Field>
          <FieldLabel className="w-full text-slate-500 font-bold uppercase text-sm flex justify-center">
            How do you feel?
          </FieldLabel>
          <FieldContent>
            <Controller
              name="emoji"
              control={control}
              render={({ field }) => (
                <div className="w-full flex justify-center items-center gap-4">
                  {ICONS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => field.onChange(item.value)}
                      className={`transition-all p-2 rounded-xl ${field.value === item.value ? "text-white shadow-md bg-[#ff4a55] shadow-[#fa939a]" : "text-slate-900 bg-gray-200 " + item.color}`}>
                      <item.icon size={32} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
              )}
            />
          </FieldContent>
          <div className="min-h-1 mt-1">
            <FieldError className="text-[11px] leading-none">
              {errors.emoji?.message}
            </FieldError>
          </div>
        </Field>

        <Field>
          <FieldLabel className="text-slate-500 font-bold uppercase text-sm">
            What did you accomplish?
          </FieldLabel>
          <FieldContent>
            <Textarea
              {...register("feeling")}
              placeholder="Please enter your accomplishments"
              className="text-lg border-none rounded-2xl focus-visible:ring-1 min-h-25"
            />
          </FieldContent>
          <div className="min-h-1 mt-1">
            <FieldError className="text-[11px] leading-none">
              {errors.feeling?.message}
            </FieldError>
          </div>
        </Field>

        <Field>
          <FieldLabel className="text-slate-500 font-bold uppercase text-sm">
            Categorize Session
          </FieldLabel>
          <FieldContent>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {PRESET_TAGS.map((tag) => {
                    const isSelected = field.value.includes(tag);

                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const val = isSelected
                            ? field.value.filter((t: string) => t !== tag)
                            : [...field.value, tag];
                          field.onChange(val);
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border-none transition-all ${isSelected ? "bg-[#ff4a55] text-white shadow-md shadow-[#fa939a]" : "bg-gray-200 text-slate-900 hover:bg-gray-300"}`}>
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </FieldContent>
          <div className="min-h-1 mt-1">
            <FieldError className="text-[11px] leading-none">
              {errors.tags?.message}
            </FieldError>
          </div>
        </Field>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting}
          className="text-slate-400 hover:bg-slate-100"
          onClick={resetTimer}>
          Discard
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="border-none! bg-linear-to-r from-[#FF6B35] to-[#FF2B81] hover:scale-105 text-white text-sm font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-transform">
          Save & Close
        </Button>
      </div>
    </form>
  );
};
