"use client";

import { Button } from "@/components/ui/button";
import { FitnessRoutine } from "@/lib/types";
import { motion, type Variants } from "framer-motion";
import { Flame, Clock, CircleCheckBig, CircleCheck, Play } from "lucide-react";

export default function FitnessSuccessPage({
  activeRoutine,
  onRestart,
}: {
  activeRoutine: FitnessRoutine;
  onRestart: () => void;
}) {
  const seconds =
    activeRoutine.steps.reduce((a, b) => {
      return a + b.duration;
    }, 0) * (activeRoutine.repeatCount || 0);
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  const data = {
    totalTime:
      min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0"),
    calory: Math.floor((seconds * 7) / 60),
    exercises: activeRoutine.steps.filter((s) => s.type === "EXERCISE").length,
  };

  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVars: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={containerVars}
      initial="initial"
      animate="animate"
      className="w-full flex flex-col justify-start items-center pt-10 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="w-20 h-20 rounded-full bg-[#feefe8] mb-4 flex justify-center items-center">
        <CircleCheck className="w-10 h-10 text-[#ec5c14]" />
      </div>
      <motion.h1
        variants={itemVars}
        className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">
        Congratulations!
      </motion.h1>
      <motion.p
        variants={itemVars}
        className="text-sm text-slate-500 text-center mb-8">
        You&apos;ve just crushed your workout session.
      </motion.p>

      <motion.div
        variants={itemVars}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        <div className="bg-white border border-slate-100 rounded-2xl py-8 flex flex-col justify-center items-center shadow-sm">
          <Clock className="w-6 h-6 text-slate-400 mb-4" />
          <div className="text-xs font-bold text-slate-400 tracking-widest mb-2">
            TOTAL TIME
          </div>
          <div className="text-3xl font-black text-[#ec5c14]">
            {data.totalTime}
          </div>
        </div>
        <div className="bg-white border-2 border-orange-100 rounded-2xl px-8 py-10 flex flex-col justify-center items-center shadow-[0_20px_40px_-15px_rgba(236,92,20,0.15)] transform md:scale-110">
          <Flame className="w-8 h-8 text-[#ec5c14] mb-4" />
          <div className="font-semibold text-xs mb-2">CALORIES BURNED</div>
          <div className="text-2xl font-bold text-[#ec5c14]">
            {data.calory} <span className="text-sm ml-1">kcal</span>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl py-8 flex flex-col justify-center items-center shadow-sm">
          <CircleCheckBig className="w-6 h-6 text-slate-400 mb-4" />
          <div className="text-xs font-bold text-slate-400 tracking-widest mb-2">
            EXERCISES DONE
          </div>
          <div className="text-3xl font-black text-[#ec5c14]">
            {data.exercises}{" "}
            <span className="text-base font-medium ml-1">sets</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVars} className="text-md mb-8">
        &quot;Great job!Consistency is key.Ready for more?&quot;
      </motion.div>

      <motion.div
        variants={itemVars}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onRestart}
          className="group px-10 py-6 rounded-2xl bg-[#ec5c14] hover:bg-[#d44d0f] text-white cursor-pointer text-lg font-bold shadow-lg shadow-orange-200 transition-all mb-4 flex justify-center items-center gap-1">
          <Play className="w-2 h-2 fill-current" />
          START AGAIN
        </Button>
      </motion.div>
    </motion.div>
  );
}
