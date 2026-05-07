import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Source | Erayaha",
  description:
    "Explore Erayaha's open source projects. We build tools for the developer community to detect UX anti-patterns and improve software quality.",
};

const ossProjects = [
  {
    category: "Developer Tools",
    name: "Anti Dark Pattern Linter",
    subtitle: "Catch UX anti-patterns before they ship",
    description:
      "A GitHub Actions linter that automatically detects UX dark patterns in your codebase. Prevent misleading UI, hidden costs, roach motels, and other deceptive patterns from reaching your users — directly in your CI/CD pipeline.",
    tags: ["GitHub Actions", "UX", "Linting", "CI/CD", "Dark Patterns"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/erayaha/anti-dark-pattern",
        primary: false,
      },
      {
        label: "Actions Marketplace",
        href: "https://github.com/marketplace/actions/erayaha-anti-dark-pattern-linter",
        primary: true,
      },
    ],
  },
  {
    category: "Security",
    name: "Slop Scan",
    subtitle: "Detect hallucinated npm packages before they ship",
    description:
      "A security CLI and GitHub Action that parses your source code and Markdown documentation for npm package references, then verifies every package against the live npm registry. Protect your supply chain from slopsquatting — AI-hallucinated package names that attackers register as malware.",
    tags: ["Security", "npm", "CLI", "GitHub Actions", "Supply Chain"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/erayaha/slop-scan",
        primary: false,
      },
      {
        label: "Actions Marketplace",
        href: "https://github.com/marketplace/actions/slop-scan",
        primary: true,
      },
    ],
  },
];

const ICON_SIZE_SM = 14;
const ICON_SIZE_MD = 18;
const ICON_SIZE_LG = 24;

function GitHubIcon({ size = ICON_SIZE_MD }: { size?: number }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 496 512"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 640 512"
      className="text-primary"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      className="opacity-70"
      height="10"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0z" />
    </svg>
  );
}

export default function OSSPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-16 md:py-24 lg:py-32 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-border">
            <CodeIcon />
            <span>Open Source</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Built for the{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              community
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe in giving back. Erayaha open sources tools that help
            developers build better, more ethical software — starting with
            detection of UX anti-patterns.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
              href="https://github.com/erayaha"
            >
              <GitHubIcon />
              View on GitHub
            </Link>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors font-medium"
              href="#projects"
            >
              Explore projects
            </Link>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Free, open source tools built by the Erayaha team and maintained
              for the community.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ossProjects.map((project) => (
              <div
                key={project.name}
                className="flex flex-col p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-1">
                      {project.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <GitHubIcon size={ICON_SIZE_LG} />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <Link
                      key={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={link.href}
                      className={
                        link.primary
                          ? "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity text-sm font-medium"
                          : "inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm font-medium"
                      }
                    >
                      {!link.primary && <GitHubIcon size={ICON_SIZE_SM} />}
                      {link.label}
                      {link.primary && <ExternalLinkIcon />}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="font-bold text-foreground mb-2">
                Open by default
              </h3>
              <p className="text-sm text-muted-foreground">
                We default to open source for tools that benefit the broader
                developer ecosystem.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-bold text-foreground mb-2">CI/CD native</h3>
              <p className="text-sm text-muted-foreground">
                Our tools integrate directly into your workflow as GitHub
                Actions — no extra setup required.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-bold text-foreground mb-2">
                Community first
              </h3>
              <p className="text-sm text-muted-foreground">
                Contributions, issues, and ideas are always welcome. We build
                these tools together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Get involved
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Star our repos, report issues, submit pull requests, or just spread
            the word. Every contribution counts.
          </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/erayaha"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            <GitHubIcon />
            github.com/erayaha
          </Link>
        </div>
      </section>
    </div>
  );
}
