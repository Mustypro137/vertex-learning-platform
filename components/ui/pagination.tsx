import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Page numbers to show: first, last, and a window around current; null = ellipsis. */
function pageList(current: number, total: number): Array<number | null> {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const start = current >= total - 1 ? total - 2 : Math.max(2, current - 1);
  const end = current <= 2 ? 3 : Math.min(total - 1, current + 1);
  const pages: Array<number | null> = [1];
  if (start > 2) pages.push(null);
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push(null);
  pages.push(total);
  return pages;
}

const item =
  "inline-flex size-8 items-center justify-center rounded-sm text-body text-neutral-700 transition-colors focus-visible:outline-2 focus-visible:outline-primary-400";

export function Pagination({
  current,
  total,
  hrefFor,
  className,
}: {
  current: number;
  total: number;
  hrefFor: (page: number) => string;
  className?: string;
}) {
  if (total <= 1) return null;
  const arrow = (page: number, label: string, Icon: typeof ChevronLeft) =>
    page < 1 || page > total ? (
      <span aria-disabled className={cn(item, "text-neutral-300")}>
        <Icon aria-hidden className="size-4" />
        <span className="sr-only">{label}</span>
      </span>
    ) : (
      <Link href={hrefFor(page)} className={cn(item, "hover:bg-neutral-100")}>
        <Icon aria-hidden className="size-4" />
        <span className="sr-only">{label}</span>
      </Link>
    );

  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="flex items-center gap-2">
        <li>{arrow(current - 1, "Previous page", ChevronLeft)}</li>
        {pageList(current, total).map((page, i) => (
          <li key={page ?? `gap-${i}`}>
            {page === null ? (
              <span className={cn(item, "pointer-events-none")}>…</span>
            ) : (
              <Link
                href={hrefFor(page)}
                aria-current={page === current ? "page" : undefined}
                className={cn(
                  item,
                  page === current
                    ? "border border-primary-400 bg-primary-100 font-medium text-primary-500"
                    : "hover:bg-neutral-100",
                )}
              >
                {page}
              </Link>
            )}
          </li>
        ))}
        <li>{arrow(current + 1, "Next page", ChevronRight)}</li>
      </ul>
    </nav>
  );
}
