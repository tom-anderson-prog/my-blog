"use client";

import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function TableTooltip({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [open, setOpen] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(
          textRef.current?.scrollWidth > textRef.current?.offsetWidth,
        );
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  const handleMouseEnter = () => {
    if (isOverflowing) setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip
        open={open}
        onOpenChange={(val) => {
          if (isOverflowing) {
            setOpen(val);
          } else {
            setOpen(false);
          }
        }}>
        <TooltipTrigger asChild>
          <div
            ref={textRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="truncate whitespace-nowrap">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-75 wrap-break-word bg-slate-900 text-white">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
