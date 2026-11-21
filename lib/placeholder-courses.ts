/**
 * PLACEHOLDER: the home page's course list until the Sanity catalog exists.
 * Mirrors the design reference (design/vertex-home.png). Replace with a
 * server-side GROQ fetch of the same shape and delete this file.
 */
export type CourseSummary = {
  title: string;
  slug: string;
  summary: string;
  level: string;
  duration: string;
  moduleCount: number;
  iconSrc: string;
};

export const placeholderCourses: CourseSummary[] = [
  {
    title: "Next.js for Production",
    slug: "nextjs-for-production",
    summary: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    moduleCount: 12,
    iconSrc: "/course-icons/nextjs.svg",
  },
  {
    title: "Docker Essentials",
    slug: "docker-essentials",
    summary: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    moduleCount: 8,
    iconSrc: "/course-icons/docker.svg",
  },
  {
    title: "TypeScript Deep Dive",
    slug: "typescript-deep-dive",
    summary: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    moduleCount: 10,
    iconSrc: "/course-icons/typescript.svg",
  },
];
