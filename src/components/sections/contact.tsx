import { Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

const links = [
  { href: `mailto:${profile.email}`, label: profile.email, icon: Mail },
  { href: `tel:${profile.phone.replace(/\s+/g, "")}`, label: profile.phone, icon: Phone },
  { href: profile.github, label: "GitHub", icon: GithubIcon, external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: LinkedinIcon, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          07 — Contact
        </span>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Let&apos;s talk about operations, automation, or your next hire.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-zinc-900/10 px-4 py-3 text-sm text-zinc-700 transition-colors hover:border-zinc-900/30 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-white"
            >
              <Icon width={16} height={16} className="text-emerald-600 dark:text-emerald-400" />
              {label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
