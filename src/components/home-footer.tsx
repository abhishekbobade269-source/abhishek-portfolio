import { profile } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

export function HomeFooter() {
  return (
    <footer
      id="contact"
      className="flex flex-col items-center justify-between gap-3 px-4 py-6 text-xs font-medium text-black/50 sm:flex-row md:px-6"
    >
      <p>
        © {new Date().getFullYear()} {profile.name}. {profile.location}.
      </p>
      <div className="flex items-center gap-4">
        <a href={`mailto:${profile.email}`} className="hover:text-black">
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-black">
          <GithubIcon width={14} height={14} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-black">
          <LinkedinIcon width={14} height={14} />
        </a>
      </div>
    </footer>
  );
}
