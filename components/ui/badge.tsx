import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "video" | "lesson" | "popular";

const tones: Record<BadgeTone, string> = {
  video: "bg-primary-100 text-primary-500",
  lesson: "bg-neutral-100 text-neutral-500",
  popular: "bg-primary-100 text-primary-500",
};

export function Badge({
  tone,
  children,
  className,
}: {
  tone: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-2 py-1 text-[0.625rem] leading-none font-semibold tracking-wider uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
