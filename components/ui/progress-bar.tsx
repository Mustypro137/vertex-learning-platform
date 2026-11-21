import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  showLabel = false,
  label = "Progress",
  className,
}: {
  /** Percentage, 0–100. */
  value: number;
  /** Show "N% complete" next to the bar. */
  showLabel?: boolean;
  /** Accessible name for the bar. */
  label?: string;
  className?: string;
}) {
  const pct = Math.round(Math.min(100, Math.max(0, value)));
  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100"
      >
        <div
          className="h-full rounded-full bg-primary-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 text-small text-neutral-700">{pct}% complete</span>
      )}
    </div>
  );
}
