import { CircleCheck, LoaderCircle, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import { FilledCirclePlay } from "./icons";

export type Status = "in-progress" | "completed" | "now-playing" | "locked";

const config = {
  "in-progress": { label: "In Progress", Icon: LoaderCircle, icon: "text-primary-500" },
  completed: { label: "Completed", Icon: CircleCheck, icon: "text-success-500" },
  "now-playing": { label: "Now Playing", Icon: FilledCirclePlay, icon: "text-primary-500" },
  locked: { label: "Locked", Icon: Lock, icon: "text-neutral-700" },
} as const;

export function StatusIndicator({
  status,
  label,
  className,
}: {
  status: Status;
  /** Override the default label text. */
  label?: string;
  className?: string;
}) {
  const { Icon, icon, label: defaultLabel } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-small font-medium text-neutral-900",
        className,
      )}
    >
      <Icon className={cn("size-4", icon)} />
      {label ?? defaultLabel}
    </span>
  );
}
