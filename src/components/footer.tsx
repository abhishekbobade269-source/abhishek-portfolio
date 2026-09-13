import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900/5 px-6 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-xs text-zinc-500 sm:flex-row dark:text-zinc-500">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind, and Framer
          Motion.
        </p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
