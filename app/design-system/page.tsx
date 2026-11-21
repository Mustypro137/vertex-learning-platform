import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Bookmark,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  CirclePlay,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  LayoutGrid,
  PersonStanding,
  Search,
  Target,
  User,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { CourseCard, LessonCard, ResourceCard, VideoLessonCard } from "@/components/ui/cards";
import { SearchInput, Select } from "@/components/ui/input";
import { FilledCirclePlay } from "@/components/ui/icons";
import { Logo, LogoMark } from "@/components/ui/logo";
import { Pagination } from "@/components/ui/pagination";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusIndicator } from "@/components/ui/status";

export const metadata: Metadata = {
  title: "Design System · Vertex",
  robots: { index: false },
};

function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("min-w-0 rounded-lg border border-neutral-100 bg-white p-6 shadow-sm", className)}>
      {children}
    </section>
  );
}

function SectionTitle({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-4 text-small font-semibold tracking-[0.15em] uppercase">
      <span className="text-primary-500">{n}</span>
      <span className="text-neutral-900">{children}</span>
    </h2>
  );
}

function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-small text-neutral-700", className)}>{children}</p>;
}

function SpecList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-small text-neutral-700 marker:text-neutral-500">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

const primary = [
  { name: "Primary 500", hex: "#F97316", cls: "bg-primary-500" },
  { name: "Primary 400", hex: "#FB923C", cls: "bg-primary-400" },
  { name: "Primary 300", hex: "#FDBA74", cls: "bg-primary-300" },
  { name: "Primary 200", hex: "#FED7AA", cls: "bg-primary-200" },
  { name: "Primary 100", hex: "#FFEEE5", cls: "bg-primary-100" },
];

const neutral = [
  { name: "Neutral 900", hex: "#0F172A", cls: "bg-neutral-900" },
  { name: "Neutral 700", hex: "#334155", cls: "bg-neutral-700" },
  { name: "Neutral 500", hex: "#64748B", cls: "bg-neutral-500" },
  { name: "Neutral 300", hex: "#CBD5E1", cls: "bg-neutral-300" },
  { name: "Neutral 200", hex: "#E2E8F0", cls: "bg-neutral-200" },
  { name: "Neutral 100", hex: "#F1F5F9", cls: "bg-neutral-100" },
  { name: "Neutral 50", hex: "#FAFAFC", cls: "bg-neutral-50 border border-neutral-200" },
  { name: "White", hex: "#FFFFFF", cls: "bg-white border border-neutral-200" },
];

const typeScale = [
  { style: "Display 1", font: "Playfair Display", size: "48 / 56", weight: "Bold", use: "Page titles" },
  { style: "Display 2", font: "Playfair Display", size: "36 / 44", weight: "Bold", use: "Section titles" },
  { style: "Heading 1", font: "Inter", size: "28 / 36", weight: "Semi Bold", use: "Card titles" },
  { style: "Heading 2", font: "Inter", size: "22 / 30", weight: "Semi Bold", use: "Sub section" },
  { style: "Heading 3", font: "Inter", size: "18 / 26", weight: "Medium", use: "Small titles" },
  { style: "Body Large", font: "Inter", size: "16 / 24", weight: "Regular", use: "Body copy" },
  { style: "Body", font: "Inter", size: "14 / 20", weight: "Regular", use: "Supporting text" },
  { style: "Small", font: "Inter", size: "12 / 16", weight: "Regular", use: "Captions, meta" },
];

const spacing = [
  { px: 4, rem: "0.25rem", cls: "size-1" },
  { px: 8, rem: "0.5rem", cls: "size-2" },
  { px: 12, rem: "0.75rem", cls: "size-3" },
  { px: 16, rem: "1rem", cls: "size-4" },
  { px: 24, rem: "1.5rem", cls: "size-6" },
  { px: 32, rem: "2rem", cls: "size-8" },
  { px: 40, rem: "2.5rem", cls: "size-10" },
  { px: 48, rem: "3rem", cls: "size-12" },
  { px: 64, rem: "4rem", cls: "size-16" },
];

const radii = [
  { label: "4px", name: "xs", cls: "rounded-xs" },
  { label: "8px", name: "sm", cls: "rounded-sm" },
  { label: "12px", name: "md", cls: "rounded-md" },
  { label: "16px", name: "lg", cls: "rounded-lg" },
  { label: "24px", name: "xl", cls: "rounded-xl" },
  { label: "Full", name: "circle", cls: "rounded-full" },
];

const shadows = [
  { name: "Sm", spec: "0 1px 2px 0", rgba: "rgba(15, 23, 42, 0.05)", cls: "shadow-sm" },
  { name: "Md", spec: "0 4px 12px -2px", rgba: "rgba(15, 23, 42, 0.08)", cls: "shadow-md" },
  { name: "Lg", spec: "0 12px 24px -4px", rgba: "rgba(15, 23, 42, 0.10)", cls: "shadow-lg" },
  { name: "Xl", spec: "0 20px 40px -8px", rgba: "rgba(15, 23, 42, 0.12)", cls: "shadow-xl" },
];

const icons: Array<{ name: string; Icon: LucideIcon }> = [
  { name: "Notifications", Icon: Bell },
  { name: "Search", Icon: Search },
  { name: "Play", Icon: CirclePlay },
  { name: "Document", Icon: FileText },
  { name: "Bookmark", Icon: Bookmark },
  { name: "Level", Icon: ChartNoAxesColumnIncreasing },
  { name: "Duration", Icon: Clock },
  { name: "Profile", Icon: User },
  { name: "Next", Icon: ChevronRight },
];

const principles: Array<{ title: string; body: string; Icon: LucideIcon }> = [
  { title: "Clarity First", body: "Every element should communicate clearly.", Icon: Eye },
  { title: "Consistency", body: "Use components and patterns consistently across the platform.", Icon: LayoutGrid },
  { title: "Focus & Calm", body: "Remove noise and help learners focus on what matters.", Icon: Target },
  { title: "Accessible", body: "Design with accessibility and inclusivity in mind.", Icon: PersonStanding },
];

export default function DesignSystemPage() {
  return (
    <main className="flex-1 bg-neutral-50 px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Intro + 01 Colors */}
        <Panel className="grid grid-cols-1 gap-8 lg:col-span-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-0">
          <div className="flex flex-col lg:border-r lg:border-neutral-100 lg:pr-8">
            <div className="flex items-center gap-3">
              <LogoMark className="h-8 w-9" />
              <span className="text-h1 font-semibold">Vertex</span>
            </div>
            <h1 className="mt-6 font-display text-display-2 font-medium sm:text-display-1 sm:font-medium">
              Design System
            </h1>
            <p className="mt-4 text-body-lg text-neutral-700">
              A unified design language for Vertex learning platform. Clean, modern and focused on
              clarity, consistency and intuitive learning experiences.
            </p>
            <p className="mt-auto pt-8 text-small tracking-wider text-neutral-700 uppercase">
              Version 1.0 <span aria-hidden className="mx-1.5">·</span> May 2025
            </p>
          </div>
          <div className="lg:pl-6">
            <SectionTitle n="01">Colors</SectionTitle>
            <Label className="mb-3 text-body text-neutral-900">Primary</Label>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
              {primary.map((c) => (
                <div key={c.name}>
                  <div className={cn("h-12 rounded-sm", c.cls)} />
                  <p className="mt-2 text-small text-neutral-700">{c.name}</p>
                  <p className="text-small text-neutral-700">{c.hex}</p>
                </div>
              ))}
            </div>
            <Label className="mt-6 mb-3 text-body text-neutral-900">Neutral</Label>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
              {neutral.map((c) => (
                <div key={c.name}>
                  <div className={cn("h-10 rounded-sm", c.cls)} />
                  <p className="mt-2 text-small text-neutral-700">{c.name}</p>
                  <p className="text-small text-neutral-700">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* 02 Typography */}
        <Panel className="lg:col-span-5">
          <SectionTitle n="02">Typography</SectionTitle>
          <div className="space-y-6">
            <div className="flex items-center gap-8">
              <span className="font-display text-[3.5rem] leading-none">Ag</span>
              <div>
                <p className="font-display text-h2 font-normal">Playfair Display</p>
                <p className="mt-1 text-body text-neutral-500">
                  Elegant <span className="text-primary-500">·</span> Readable{" "}
                  <span className="text-primary-500">·</span> Timeless
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-[3.5rem] leading-none font-medium">Ag</span>
              <div>
                <p className="text-h2 font-normal">Inter</p>
                <p className="mt-1 text-body text-neutral-500">
                  Clean <span className="text-primary-500">·</span> Modern{" "}
                  <span className="text-primary-500">·</span> Highly legible
                </p>
              </div>
            </div>
          </div>
        </Panel>

        {/* 03 Type scale */}
        <Panel className="lg:col-span-7">
          <SectionTitle n="03">Type Scale</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-small">
              <thead className="text-neutral-700">
                <tr>
                  {["Style", "Font", "Size / Line Height", "Weight", "Use"].map((h) => (
                    <th key={h} className="pb-3 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-neutral-500">
                {typeScale.map((r) => (
                  <tr key={r.style}>
                    <td className="py-1 text-body text-neutral-900">{r.style}</td>
                    <td className="py-1">{r.font}</td>
                    <td className="py-1">{r.size}</td>
                    <td className="py-1">{r.weight}</td>
                    <td className="py-1">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* 04 Spacing */}
        <Panel className="lg:col-span-6">
          <SectionTitle n="04">Spacing System</SectionTitle>
          <Label className="text-body text-neutral-900">Base unit: 4px</Label>
          <div className="mt-8 grid grid-cols-5 gap-y-6 sm:grid-cols-9">
            {spacing.map((s) => (
              <div key={s.px} className="flex flex-col items-center">
                <div className="flex h-16 items-end">
                  <div className={cn("rounded-xs bg-primary-100", s.cls)} />
                </div>
                <p className="mt-3 text-small text-neutral-900">{s.px}</p>
                <p className="text-small text-neutral-500">({s.rem})</p>
              </div>
            ))}
          </div>
        </Panel>

        {/* 05 Radius & shadows */}
        <Panel className="lg:col-span-6">
          <SectionTitle n="05">Radius &amp; Shadows</SectionTitle>
          <Label className="text-body text-neutral-900">Radius</Label>
          <div className="mt-3 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {radii.map((r) => (
              <div key={r.name} className="flex flex-col items-center">
                <div className={cn("size-10 border border-neutral-200 bg-white", r.cls)} />
                <p className="mt-2 text-small text-neutral-700">{r.label}</p>
                <p className="text-small text-neutral-500">({r.name})</p>
              </div>
            ))}
          </div>
          <Label className="mt-6 text-body text-neutral-900">Shadows</Label>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {shadows.map((s) => (
              <div key={s.name} className={cn("rounded-sm bg-white p-3", s.cls)}>
                <p className="text-body text-neutral-900">{s.name}</p>
                <p className="mt-2 text-[0.625rem] leading-4 text-neutral-500">
                  {s.spec}
                  <br />
                  {s.rgba}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        {/* 06 Icons */}
        <Panel className="lg:col-span-3">
          <SectionTitle n="06">Icons</SectionTitle>
          <Label>Outline Style</Label>
          <div className="mt-3 flex flex-wrap gap-2.5 text-neutral-900">
            {icons.map(({ name, Icon }) => (
              <Icon key={name} aria-label={name} className="size-5" />
            ))}
          </div>
          <Label className="mt-6">Filled Style</Label>
          <div className="mt-3 flex flex-wrap gap-2.5 text-neutral-900">
            {icons.map(({ name, Icon }) =>
              name === "Play" ? (
                <FilledCirclePlay key={name} className="size-5 text-neutral-900" />
              ) : (
                <Icon
                  key={name}
                  aria-label={`${name} (filled)`}
                  className={cn("size-5", ["Duration", "Document"].includes(name) ? "fill-neutral-900 text-white" : "fill-current")}
                />
              ),
            )}
          </div>
          <Label className="mt-6 text-neutral-900">Icon Specs</Label>
          <SpecList
            items={["24x24px grid", "2px stroke width (outline)", "Rounded line caps", "Consistent optical balance"]}
          />
        </Panel>

        {/* 07 Buttons */}
        <Panel className="lg:col-span-6">
          <SectionTitle n="07">Buttons</SectionTitle>
          <div className="overflow-x-auto">
            <div className="grid min-w-[440px] grid-cols-[64px_repeat(4,auto)] items-center gap-x-3 gap-y-3">
              <span />
              {["Primary", "Secondary", "Tertiary", "Text"].map((h) => (
                <Label key={h} className="text-center">
                  {h}
                </Label>
              ))}
              {(["Default", "Hover", "Disabled"] as const).map((state) => (
                <ButtonRow key={state} state={state} />
              ))}
            </div>
          </div>
          <Label className="mt-6 text-neutral-900">Button Specs</Label>
          <SpecList
            items={[
              "Height: 44px (default)",
              "Padding: 0 16px (lg), 0 12px (md)",
              "Radius: 12px",
              "Font: Inter Medium (14–16px)",
            ]}
          />
        </Panel>

        {/* 08 Inputs */}
        <Panel className="lg:col-span-3">
          <SectionTitle n="08">Inputs</SectionTitle>
          <Label className="mb-2">Search / Text Input</Label>
          <SearchInput placeholder="Search anything..." shortcut="⌘ K" />
          <Label className="mt-5 mb-2">Select</Label>
          <Select aria-label="Sort" defaultValue="relevant">
            <option value="relevant">Most Relevant</option>
            <option value="newest">Newest</option>
          </Select>
          <Label className="mt-6 text-neutral-900">Field Specs</Label>
          <SpecList
            items={[
              "Height: 44px",
              "Radius: 12px",
              "Border: 1px solid #E2E8F0",
              "Padding: 0 16px",
              "Focus: Border color #FB923C",
            ]}
          />
        </Panel>

        {/* 09 Badges */}
        <Panel className="lg:col-span-4">
          <SectionTitle n="09">Badges / Tags</SectionTitle>
          <div className="grid grid-cols-3 gap-4">
            {(
              [
                ["Video", "video"],
                ["Lesson", "lesson"],
                ["Popular", "popular"],
              ] as const
            ).map(([label, tone]) => (
              <div key={tone}>
                <Label className="mb-2">{label}</Label>
                <Badge tone={tone}>{label}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        {/* 10 Status */}
        <Panel className="lg:col-span-4">
          <SectionTitle n="10">Status / Indicators</SectionTitle>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <StatusIndicator status="in-progress" />
            <StatusIndicator status="completed" />
            <StatusIndicator status="now-playing" />
            <StatusIndicator status="locked" />
          </div>
        </Panel>

        {/* 11 Progress */}
        <Panel className="lg:col-span-4">
          <SectionTitle n="11">Progress Bar</SectionTitle>
          <ProgressBar value={35} showLabel label="Course progress" />
        </Panel>

        {/* 12 Cards */}
        <Panel className="lg:col-span-12">
          <SectionTitle n="12">Cards</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col">
              <Label className="mb-2">Course Card</Label>
              <CourseCard
                className="flex-1"
                href="#"
                icon="N"
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                moduleCount={12}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2">Lesson Card (Video)</Label>
              <VideoLessonCard
                className="flex-1"
                href="#"
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                lessonLabel="Lesson 5.1"
                duration="12:45"
                startLabel="12:45"
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2">Lesson Card (Lesson)</Label>
              <LessonCard
                className="flex-1"
                href="#"
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                moduleLabel="Module 5"
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2">Resource Card</Label>
              <ResourceCard
                className="flex-1"
                href="#"
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                fileType="PDF"
                fileSize="1.2 MB"
              />
            </div>
          </div>
        </Panel>

        {/* 13 Navigation */}
        <Panel className="grid grid-cols-1 gap-8 lg:col-span-12 lg:grid-cols-[1fr_1.3fr_1fr]">
          <div>
            <SectionTitle n="13">Navigation</SectionTitle>
            <div className="flex items-center gap-10">
              <Logo href="/design-system" />
              <nav aria-label="Example" className="flex gap-10 text-body whitespace-nowrap">
                <Link href="#" aria-current="page" className="text-primary-500">
                  Courses
                </Link>
                <Link href="#" className="text-neutral-900 hover:text-primary-500">
                  My Learning
                </Link>
              </nav>
            </div>
          </div>
          <div>
            <Label className="mb-5">Breadcrumbs</Label>
            <Breadcrumbs
              items={[
                { label: "All Courses", href: "#" },
                { label: "Next.js for Production", href: "#" },
                { label: "Data Fetching & Caching" },
              ]}
            />
          </div>
          <div>
            <Label className="mb-4">Pagination</Label>
            <Pagination current={1} total={8} hrefFor={(p) => `/design-system?page=${p}`} />
          </div>
        </Panel>

        {/* 14 Principles */}
        <Panel className="grid items-center gap-6 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-[auto_repeat(4,1fr)]">
          <h2 className="flex items-center gap-4 text-small font-semibold tracking-[0.15em] uppercase sm:col-span-2 lg:col-span-1 lg:pr-6">
            <span className="text-primary-500">14</span>
            <span>Principles</span>
          </h2>
          {principles.map(({ title, body, Icon }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon aria-hidden strokeWidth={1.5} className="size-8 shrink-0 text-neutral-700" />
              <div>
                <p className="text-small font-medium text-neutral-900">{title}</p>
                <p className="mt-1 text-small text-neutral-500">{body}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </main>
  );
}

/** One state row of the buttons matrix. Hover is forced visually for the reference. */
function ButtonRow({ state }: { state: "Default" | "Hover" | "Disabled" }) {
  const disabled = state === "Disabled";
  const hover = state === "Hover";
  return (
    <>
      <Label className="text-neutral-900">{state}</Label>
      <Button size="md" disabled={disabled} className={cn(hover && "bg-primary-600!")}>
        Get Started
      </Button>
      <Button size="md" variant="secondary" disabled={disabled} className={cn(hover && "bg-primary-100!")}>
        Explore Courses
      </Button>
      <Button
        size="md"
        variant="tertiary"
        disabled={disabled}
        className={cn(hover && "border-neutral-300! bg-neutral-50!")}
      >
        View Lesson
        <ExternalLink aria-hidden className="size-4" />
      </Button>
      <Button variant="text" disabled={disabled} className={cn("justify-self-center", hover && "text-primary-600!")}>
        Watch Video
        <CirclePlay aria-hidden className="size-4" />
      </Button>
    </>
  );
}
