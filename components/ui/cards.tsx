import type { ReactNode } from "react";
import Link from "next/link";
import {
  ChartNoAxesColumnIncreasing,
  CirclePlay,
  Clock,
  ExternalLink,
  File,
  FileText,
  Folder,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "./badge";
import { buttonClasses } from "./button";

const card =
  "relative flex flex-col rounded-lg border border-neutral-200 bg-white p-5 shadow-sm";
const title = "text-body font-semibold text-neutral-900";
const description = "text-small text-neutral-500";
const meta = "flex items-center gap-1.5 text-small text-neutral-700";
const footer = "mt-auto flex items-center justify-between gap-3 pt-5";

export function CourseCard({
  href,
  icon,
  title: courseTitle,
  description: summary,
  level,
  duration,
  moduleCount,
  variant = "compact",
  className,
}: {
  href: string;
  /** Compact: rendered in a 40px dark tile. Featured: rendered as-is (pass a 72px image). */
  icon: ReactNode;
  title: string;
  description: string;
  level: string;
  duration: string;
  moduleCount: number;
  /** "featured" is the stacked home-page layout with a large icon and serif title. */
  variant?: "compact" | "featured";
  className?: string;
}) {
  const stretchedLink = (
    <Link
      href={href}
      className="rounded-xs after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-primary-400"
    >
      {courseTitle}
    </Link>
  );
  const modules = `${moduleCount} ${moduleCount === 1 ? "module" : "modules"}`;

  if (variant === "featured") {
    const featuredMeta = "flex items-center gap-1.5 text-small whitespace-nowrap text-neutral-700";
    return (
      <article className={cn(card, "p-6 transition-shadow hover:shadow-md", className)}>
        <div className="size-[4.5rem] shrink-0">{icon}</div>
        <h3 className="mt-7 font-display text-[1.375rem] leading-7 font-medium text-neutral-900">
          {stretchedLink}
        </h3>
        <p className="mt-5 text-body text-neutral-700">{summary}</p>
        <div className="mt-auto pt-10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-200 pt-6">
            <span className={featuredMeta}>
              <ChartNoAxesColumnIncreasing aria-hidden className="size-4" />
              {level}
            </span>
            <span className={featuredMeta}>
              <Clock aria-hidden className="size-4" />
              {duration}
            </span>
            <span className={featuredMeta}>
              <File aria-hidden className="size-4" />
              {modules}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn(card, "transition-shadow hover:shadow-md", className)}>
      <div className="flex gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-neutral-900 text-h3 font-semibold text-white">
          {icon}
        </div>
        <div className="min-w-0">
          {/* Stretched link: the whole card is clickable. */}
          <h3 className={title}>{stretchedLink}</h3>
          <p className={cn(description, "mt-1 line-clamp-2")}>{summary}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
        <span className={meta}>
          <ChartNoAxesColumnIncreasing aria-hidden className="size-4" />
          {level}
        </span>
        <span className={meta}>
          <Clock aria-hidden className="size-4" />
          {duration}
        </span>
        <span className={meta}>
          <Folder aria-hidden className="size-4" />
          {modules}
        </span>
      </div>
    </article>
  );
}

export function VideoLessonCard({
  href,
  title: lessonTitle,
  description: summary,
  lessonLabel,
  duration,
  startLabel,
  className,
}: {
  /** Lesson page URL including the start-seconds param. */
  href: string;
  title: string;
  description: string;
  /** e.g. "Lesson 5.1" */
  lessonLabel: string;
  /** Clip length, e.g. "12:45" */
  duration: string;
  /** Matched moment, e.g. "12:45" */
  startLabel: string;
  className?: string;
}) {
  return (
    <article className={cn(card, className)}>
      <Badge tone="video" className="self-start">
        Video
      </Badge>
      <h3 className={cn(title, "mt-3")}>{lessonTitle}</h3>
      <p className={cn(description, "mt-2 line-clamp-3")}>{summary}</p>
      <div className={footer}>
        <span className="text-small whitespace-nowrap text-neutral-500">
          {lessonLabel} <span aria-hidden>·</span> {duration}
        </span>
        <Link href={href} className={buttonClasses({ variant: "text", className: "h-auto text-small" })}>
          <CirclePlay aria-hidden className="size-4" />
          Watch from {startLabel}
        </Link>
      </div>
    </article>
  );
}

export function LessonCard({
  href,
  title: lessonTitle,
  description: summary,
  moduleLabel,
  className,
}: {
  href: string;
  title: string;
  description: string;
  /** e.g. "Module 5" */
  moduleLabel: string;
  className?: string;
}) {
  return (
    <article className={cn(card, className)}>
      <Badge tone="lesson" className="self-start">
        Lesson
      </Badge>
      <h3 className={cn(title, "mt-3")}>{lessonTitle}</h3>
      <p className={cn(description, "mt-2 line-clamp-3")}>{summary}</p>
      <div className={footer}>
        <span className="text-small text-neutral-500">{moduleLabel}</span>
        <Link href={href} className={buttonClasses({ variant: "text", className: "h-auto text-small" })}>
          View lesson
          <ExternalLink aria-hidden className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function ResourceCard({
  href,
  title: resourceTitle,
  description: summary,
  fileType,
  fileSize,
  className,
}: {
  href: string;
  title: string;
  description: string;
  /** e.g. "PDF" */
  fileType: string;
  /** e.g. "1.2 MB" */
  fileSize?: string;
  className?: string;
}) {
  return (
    <article className={cn(card, className)}>
      <div className="flex gap-4">
        <FileText aria-hidden className="size-6 shrink-0 text-neutral-700" />
        <div className="min-w-0">
          <h3 className={title}>{resourceTitle}</h3>
          <p className={cn(description, "mt-1 line-clamp-2")}>{summary}</p>
        </div>
      </div>
      <div className={footer}>
        <span className="text-small text-neutral-500">
          {fileType}
          {fileSize && (
            <>
              {" "}
              <span aria-hidden>·</span> {fileSize}
            </>
          )}
        </span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xs text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-primary-400"
        >
          <ExternalLink aria-hidden className="size-4" />
          <span className="sr-only">Open {resourceTitle} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
