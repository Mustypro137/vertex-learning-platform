import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { buttonClasses } from "@/components/ui/button";

// Placeholder until the catalog page is designed and built.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
      <Logo size="lg" />
      <Link href="/design-system" className={buttonClasses({ variant: "secondary" })}>
        View design system
      </Link>
    </main>
  );
}
