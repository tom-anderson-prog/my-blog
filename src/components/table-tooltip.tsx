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

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip open={isOverflowing ? undefined : false}>
        <TooltipTrigger asChild>
          <div ref={textRef} className="truncate whitespace-nowrap">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-75 wrap-break-word">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
