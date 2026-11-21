"use client";

import { useEffect, useRef } from "react";
import Form from "next/form";
import { Search } from "lucide-react";

/** Hero search: GET /search?q=… and Cmd/Ctrl+K focuses the field. */
export function HomeSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      const active = document.activeElement;
      const typingElsewhere =
        active instanceof HTMLElement &&
        active !== inputRef.current &&
        (active.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName));
      if (typingElsewhere) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Form action="/search" role="search" className="w-full">
      <div className="relative flex h-16 items-center rounded-lg border border-neutral-200 bg-white shadow-md transition-colors focus-within:border-primary-400 sm:h-[5.25rem]">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-5 size-5 text-neutral-700 sm:left-6 sm:size-7"
          strokeWidth={1.75}
        />
        <input
          ref={inputRef}
          type="search"
          name="q"
          required
          aria-label="Search your learning"
          placeholder="Ask anything about your learning..."
          className="h-full w-full rounded-lg bg-transparent pr-4 pl-13 text-body-lg text-neutral-900 placeholder:text-neutral-500 focus:outline-none sm:pr-24 sm:pl-[4.5rem] sm:text-xl"
        />
        <kbd className="pointer-events-none absolute right-6 hidden h-11 items-center rounded-sm border border-neutral-200 px-3.5 font-sans text-body-lg text-neutral-700 sm:flex">
          ⌘ K
        </kbd>
      </div>
    </Form>
  );
}
