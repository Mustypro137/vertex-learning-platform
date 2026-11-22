import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { HomeSearch } from "@/components/home-search";
import { SiteHeader } from "@/components/site-header";
import { buttonClasses } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/cards";
import { placeholderCourses } from "@/lib/placeholder-courses";

/** Decorative bottom band: [left %, width %, height %] per bar. */
const bars: Array<[number, number, number]> = [
  [0, 7.5, 48], [7.5, 6, 66], [13.5, 4.5, 81], [17.5, 6, 100], [23.5, 9.5, 70], [32.5, 4.5, 50],
  [49, 3, 30], [52, 9, 42], [61, 6.5, 62], [67.5, 5, 80], [72.5, 6.5, 100], [79, 5, 46],
  [84, 4, 70], [88, 12, 90],
];

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col bg-canvas md:px-[30px] md:[background-image:repeating-linear-gradient(135deg,transparent_0_6px,var(--color-neutral-200)_6px_7px)]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col overflow-hidden bg-canvas md:border-x md:border-neutral-200">
        <SiteHeader />

        <main className="flex flex-1 flex-col">
          {/* Hero */}
          <section className="flex flex-col items-center px-5 pt-14 pb-12 text-center sm:px-10 sm:pt-[4.25rem] sm:pb-14">
            <p className="rounded-sm border border-primary-200 bg-primary-100/40 px-3.5 py-2.5 text-small font-semibold tracking-[0.2em] text-primary-500 uppercase">
              Intelligent learning
            </p>
            <h1 className="mt-8 font-display text-[2rem] leading-[1.15] font-medium tracking-tight text-neutral-900 sm:text-[4rem] sm:leading-[4.5rem]">
              Search your learning
              <br />
              in plain English.
            </h1>
            <p className="mt-6 max-w-[27rem] text-body-lg text-neutral-700 sm:mt-8 sm:max-w-[28.5rem] sm:text-xl sm:leading-8">
              Vertex understands what you want to learn and finds the exact lessons across all your
              courses.
            </p>
            <Link
              href="/courses"
              className={buttonClasses({
                className: "mt-9 h-[3.75rem] gap-5 px-6 text-xl font-normal shadow-md",
              })}
            >
              Explore Courses
              <ArrowRight aria-hidden className="size-6" strokeWidth={1.75} />
            </Link>
            <div className="mt-11 w-full max-w-[46.5rem]">
              <HomeSearch />
            </div>
          </section>

          {/* All Courses */}
          <section
            aria-labelledby="all-courses"
            className="border-t border-neutral-200 px-5 pt-14 sm:px-10 md:px-[3.25rem]"
          >
            <div className="mx-auto max-w-[83.5rem]">
              <div className="flex items-center justify-between gap-4">
                <h2
                  id="all-courses"
                  className="font-display text-[1.625rem] leading-9 font-medium text-neutral-900"
                >
                  All Courses
                </h2>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2.5 rounded-xs text-body-lg whitespace-nowrap text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                >
                  View all courses
                  <ArrowRight aria-hidden className="size-5" strokeWidth={1.75} />
                </Link>
              </div>

              <ul className="mt-7 grid gap-4 md:grid-cols-3">
                {placeholderCourses.map((course) => (
                  <li key={course.slug} className="flex">
                    <CourseCard
                      variant="featured"
                      className="w-full md:min-h-[23.25rem]"
                      href={`/courses/${course.slug}`}
                      icon={<Image src={course.iconSrc} alt="" width={72} height={72} />}
                      title={course.title}
                      description={course.summary}
                      level={course.level}
                      duration={course.duration}
                      moduleCount={course.moduleCount}
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-[4.5rem] flex items-center gap-6">
                <span aria-hidden className="h-px flex-1 bg-neutral-200" />
                <p className="flex items-center gap-4 text-body text-neutral-700 sm:text-body-lg">
                  <Star aria-hidden className="size-6 shrink-0 text-primary-500" strokeWidth={1.5} />
                  New courses and lessons added every week.
                </p>
                <span aria-hidden className="h-px flex-1 bg-neutral-200" />
              </div>
            </div>
          </section>

          {/* Decorative gradient bars */}
          <div aria-hidden className="relative mt-8 h-24 sm:h-48">
            {bars.map(([left, width, height]) => (
              <span
                key={left}
                className="absolute bottom-0 bg-linear-to-t from-primary-300/90 via-primary-200/50 to-transparent"
                style={{ left: `${left}%`, width: `${width}%`, height: `${height}%` }}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
