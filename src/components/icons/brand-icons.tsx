// lucide-react dropped brand/logo glyphs in recent versions, so GitHub and
// LinkedIn marks are inlined here as simple, license-free (CC0-style) SVG
// paths — sized and colored like the rest of the lucide icon set.
import type { SVGProps } from "react";

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.1c-3.16.69-3.83-1.36-3.83-1.36-.52-1.3-1.26-1.65-1.26-1.65-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.01 1.73 2.66 1.23 3.3.94.1-.74.4-1.23.72-1.51-2.53-.29-5.18-1.26-5.18-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.38-2.66 5.34-5.19 5.62.41.35.77 1.04.77 2.11v3.13c0 .3.2.66.79.55A11.02 11.02 0 0 0 23 11.52C23 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1s2.5 1.12 2.5 2.5ZM.24 8.25h4.5V23h-4.5V8.25ZM8.02 8.25h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.98c0-1.66-.03-3.8-2.31-3.8-2.32 0-2.67 1.81-2.67 3.68V23h-4.5V8.25Z" />
    </svg>
  );
}
