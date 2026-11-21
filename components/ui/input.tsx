import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/cn";

const field =
  "h-11 w-full rounded-md border border-neutral-200 bg-white text-body text-neutral-900 transition-colors placeholder:text-neutral-500 focus:border-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 disabled:bg-neutral-50 disabled:text-neutral-500";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Keyboard shortcut hint shown on the right, e.g. "⌘ K". */
  shortcut?: string;
};

export function SearchInput({
  shortcut,
  className,
  "aria-label": ariaLabel = "Search",
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-500"
      />
      <input
        type="search"
        aria-label={ariaLabel}
        className={cn(field, "pl-10", shortcut ? "pr-14" : "pr-4")}
        {...props}
      />
      {shortcut && (
        <kbd className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-sans text-small font-medium text-neutral-900">
          {shortcut}
        </kbd>
      )}
    </div>
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cn("relative", className)}>
      <select className={cn(field, "appearance-none pr-10 pl-4")} {...props}>
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-neutral-700"
      />
    </div>
  );
}
