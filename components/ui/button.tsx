import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md text-body font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:pointer-events-none aria-disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white shadow-sm hover:bg-primary-600 disabled:bg-primary-200 aria-disabled:bg-primary-200 disabled:shadow-none",
  secondary:
    "border border-primary-400 bg-white text-primary-500 hover:bg-primary-100 disabled:border-primary-200 disabled:text-primary-300 aria-disabled:border-primary-200 aria-disabled:text-primary-300",
  tertiary:
    "border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 disabled:text-neutral-300 aria-disabled:text-neutral-300",
  text: "text-primary-500 hover:text-primary-600 disabled:text-primary-200 aria-disabled:text-primary-200",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-3",
  lg: "px-4",
};

/** Shared button styling, also usable on links (`<Link className={buttonClasses()}>`). */
export function buttonClasses({
  variant = "primary",
  size = "lg",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  // Text buttons have no box, so no horizontal padding.
  return cn(base, variants[variant], variant !== "text" && sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}
