import Link from "next/link";
import { Bell, UserRound } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/my-learning", label: "My Learning" },
];

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400";

export function SiteHeader() {
  return (
    <header className="flex h-[4.5rem] items-center gap-3 border-b border-neutral-200 px-4 sm:h-24 sm:px-10">
      <Logo size="responsive" className="shrink-0" />
      <nav aria-label="Main" className="sm:ml-12">
        <ul className="flex items-center gap-3 sm:gap-10">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${focusRing} text-body whitespace-nowrap text-neutral-900 transition-colors hover:text-primary-500 sm:text-body-lg`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="ml-auto flex items-center gap-3 sm:gap-7">
        {/* Presentational only (AGENTS.md §7): notifications have no backend. */}
        <button
          type="button"
          aria-label="Notifications"
          className={`${focusRing} text-neutral-900 transition-colors hover:text-primary-500`}
        >
          <Bell aria-hidden className="size-5 sm:size-6" strokeWidth={1.75} />
        </button>
        {/* Placeholder until Clerk's UserButton is wired in. */}
        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-500 sm:size-[3.25rem]"
        >
          <UserRound className="size-4 sm:size-6" />
        </span>
      </div>
    </header>
  );
}
