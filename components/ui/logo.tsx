import Link from "next/link";
import { cn } from "@/lib/cn";

/** The Vertex "V" mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 28"
      aria-hidden
      className={cn("h-7 w-8 text-primary-500", className)}
      fill="currentColor"
    >
      <path d="M0 0h32L16 28 0 0Zm8.6 5 7.4 13 7.4-13H8.6Z" fillRule="evenodd" />
    </svg>
  );
}

const textSizes = { md: "text-h3", lg: "text-h1", responsive: "text-h3 sm:text-h1" };
const markSizes = { md: "h-6 w-7", lg: "h-8 w-9", responsive: "h-6 w-7 sm:h-8 sm:w-9" };

export function Logo({
  href = "/",
  size = "md",
  className,
}: {
  href?: string;
  /** "responsive" is md on mobile and lg from the sm breakpoint. */
  size?: "md" | "lg" | "responsive";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-neutral-900 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400",
        textSizes[size],
        className,
      )}
    >
      <LogoMark className={markSizes[size]} />
      Vertex
    </Link>
  );
}
