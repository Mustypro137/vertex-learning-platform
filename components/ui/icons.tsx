import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Filled "play in circle". Lucide's CirclePlay draws its circle after the
 * triangle, so filling it hides the triangle; this draws the disc underneath.
 * Disc color follows `text-*`.
 */
export function FilledCirclePlay({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-current", className)}
    >
      <Play className="size-[45%] translate-x-[8%] fill-white text-white" strokeWidth={3} />
    </span>
  );
}
