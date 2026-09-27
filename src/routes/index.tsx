import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Compass,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";

import heroImage from "@/assets/prapul-cinematic-hero.webp";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const NAV_ITEMS = ["Home", "About", "Projects", "Skills", "Education", "Contact"] as const;

const PROJECTS = [
  {
    number: "01",
    title: "StudyPilot AI",
    description: "AI-powered student learning assistant built with Gemini.",
    technologies: ["AI", "Gemini"],
    url: "https://github.com/prapultikota737-beep/StudyPilot-AI",
    detail:
      "A practical exploration of AI-assisted learning. Visit the repository for the verified source, current implementation, and project documentation.",
  },
  {
    number: "02",
    title: "ResumeAI Analyzer",
    description: "AI-powered resume analysis and improvement platform.",
    technologies: ["AI", "Web Development"],
    url: "https://github.com/prapultikota737-beep/ResumeAIAnalyzer",
    detail:
      "A focused platform for AI-assisted resume analysis and improvement. Visit the repository for the verified source and current project details.",
  },
] as const;

// Edit this list to add, remove, or reorder skills.
const SKILLS = [
  "Python",
  "C",
  "C++",
  "Data Structures",
  "SQL",
  "Git",
  "GitHub",
  "Web Development",
  "HTML",
  "CSS",
] as const;

const GITHUB_URL = "https://github.com/prapultikota737-beep";
const LINKEDIN_URL = "https://www.linkedin.com/in/prapul-rajakumar-tikota-5733a1385";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prapul Rajakumar Tikota — AI & Data Science Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Prapul Rajakumar Tikota, a B.Tech Artificial Intelligence & Data Science student at REVA University, Bangalore.",
      },
      { property: "og:title", content: "Prapul Rajakumar Tikota — Explorer of Technology" },
      {
        property: "og:description",
        content: "Exploring technology, building intelligence, and creating impact through AI and data science.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 48);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const sections = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", updateHeader);
      observer.disconnect();
    };
  }, []);

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${String(data.get("name") || "a visitor")}`);
    const body = encodeURIComponent(
      `Name: ${String(data.get("name") || "")}\nEmail: ${String(data.get("email") || "")}\n\n${String(data.get("message") || "")}`,
    );
    setSent(true);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleMagneticMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    element.style.transform = `translate(${x}px, ${y}px)`;
  };

  const resetMagnetic = (event: ReactMouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "translate(0, 0)";
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground selection:bg-primary/30">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? "border-b border-border bg-background/88 backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 md:px-10 lg:px-14">
          <a href="#home" className="group flex items-center gap-3" aria-label="Prapul portfolio home">
            <span className="grid size-10 place-items-center border border-primary/50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Compass size={18} aria-hidden="true" />
            </span>
            <span className="font-display text-sm font-semibold uppercase tracking-[0.2em]">PRT</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="hidden border border-border bg-background/30 sm:inline-flex">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="Open Prapul's GitHub">
                <Github />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hidden border border-border bg-background/30 sm:inline-flex">
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="Open Prapul's LinkedIn">
                <Linkedin />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="border border-border bg-background/30 lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-[1480px] gap-1">
              {NAV_ITEMS.map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="flex items-center justify-between border-b border-border py-3 font-display text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="relative flex min-h-[920px] items-end overflow-hidden pt-20 md:min-h-screen">
        <img
          src={heroImage}
          alt="Prapul Rajakumar Tikota overlooking an ocean horizon with Earth, an aircraft, and Indian stone architecture"
          className="hero-image absolute inset-0 h-full w-full object-cover object-[67%_center] md:object-center"
          fetchPriority="high"
        />
        <div className="hero-shade absolute inset-0" />
        <div className="stars absolute inset-0 opacity-55" aria-hidden="true" />
        <div className="flight-path absolute left-[20%] top-[29%] hidden w-[29%] lg:block" aria-hidden="true">
          <span />
        </div>
        <div className="compass-mark absolute bottom-24 right-8 hidden size-40 rounded-full border border-primary/30 xl:block" aria-hidden="true">
          <span className="absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[10px] text-primary">N</span>
          <span className="absolute left-1/2 top-1/2 h-[1px] w-24 -translate-x-1/2 -translate-y-1/2 bg-primary/30" />
          <span className="absolute left-1/2 top-1/2 h-24 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-primary/30" />
          <Compass className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={42} strokeWidth={1} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 pb-14 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
          <div className="max-w-3xl animate-fade-in">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">
              <span className="h-px w-10 bg-primary" /> Explorer of technology
            </p>
            <h1 className="font-display text-[clamp(3.15rem,8vw,7.6rem)] font-semibold uppercase leading-[0.84] text-foreground">
              Prapul
              <span className="block text-stroke">Rajakumar</span>
              <span className="block">Tikota</span>
            </h1>
            <div className="mt-7 border-l border-primary pl-5">
              <p className="text-sm font-medium uppercase text-foreground sm:text-base">
                B.Tech <span className="mx-2 text-primary">|</span> Artificial Intelligence &amp; Data Science
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">REVA University, Bangalore</p>
            </div>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Exploring Technology. Building Intelligence. Creating Impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="magnetic h-12 rounded-none px-6 uppercase tracking-[0.12em]" onMouseMove={handleMagneticMove} onMouseLeave={resetMagnetic}>
                <a href="#projects">Explore my projects <ArrowDown /></a>
              </Button>
              <Button variant="outline" size="lg" className="h-12 rounded-none px-6 uppercase tracking-[0.12em]" disabled title="Resume file has not been supplied">
                <Download /> Resume coming soon
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-12 rounded-none px-5 uppercase tracking-[0.12em]">
                <a href="#contact">Contact me</a>
              </Button>
            </div>
          </div>
          <div className="mt-12 flex items-end justify-between border-t border-foreground/15 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Bengaluru · India</span>
            <a href="#about" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:text-primary">
              Begin the journey <ArrowDown size={14} />
            </a>
          </div>
        </div>
        <div className="ocean-line absolute inset-x-0 bottom-0 h-6" aria-hidden="true" />
      </section>

      <section id="about" className="section-shell relative border-b border-border" data-reveal>
        <div className="mx-auto grid max-w-[1360px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24 lg:px-14">
          <SectionHeading number="01" eyebrow="Coordinates" title="About" />
          <div>
            <p className="font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Learning to turn <span className="text-primary">curiosity</span> into intelligent, useful systems.
            </p>
            <div className="mt-10 grid gap-7 border-t border-border pt-8 sm:grid-cols-2">
              <p className="text-base leading-8 text-muted-foreground">
                I am a B.Tech Artificial Intelligence &amp; Data Science student at REVA University, Bangalore, building a strong foundation across programming, data structures, and web development.
              </p>
              <p className="text-base leading-8 text-muted-foreground">
                My current journey is focused on AI-related technologies and practical projects—learning by building, examining ideas closely, and steadily expanding what I can create.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <span className="flex items-center gap-2"><Compass size={15} className="text-primary" /> Bangalore, India</span>
              <span className="flex items-center gap-2"><Sparkles size={15} className="text-primary" /> AI &amp; Data Science</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section-shell relative overflow-hidden border-b border-border bg-card/40" data-reveal>
        <div className="map-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <SectionHeading number="02" eyebrow="Selected work" title="Projects" />
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Two practical AI projects, each tracing a different route from an everyday problem toward a useful digital experience.
            </p>
          </div>
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {PROJECTS.map((project) => (
              <article key={project.title} className="project-card group relative overflow-hidden border border-border bg-card/70 p-6 backdrop-blur-sm sm:p-9">
                <div className="absolute right-6 top-5 font-display text-7xl text-foreground/[0.035] transition-colors group-hover:text-primary/[0.08]">{project.number}</div>
                <div className="relative">
                  <div className="mb-14 flex items-center justify-between">
                    <span className="grid size-11 place-items-center border border-primary/40 text-primary"><Code2 size={19} /></span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Project {project.number}</span>
                  </div>
                  <h3 className="font-display text-3xl font-semibold sm:text-4xl">{project.title}</h3>
                  <p className="mt-4 max-w-md leading-7 text-muted-foreground">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="border border-border bg-secondary/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{technology}</span>
                    ))}
                  </div>
                  <Accordion type="single" collapsible className="mt-8 border-t border-border">
                    <AccordionItem value="details" className="border-b-0">
                      <AccordionTrigger className="py-4 font-mono text-[11px] uppercase tracking-[0.16em] hover:no-underline">Project details</AccordionTrigger>
                      <AccordionContent className="leading-7 text-muted-foreground">{project.detail}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button asChild variant="outline" className="rounded-none">
                      <a href={project.url} target="_blank" rel="noreferrer"><Github /> GitHub</a>
                    </Button>
                    <Button asChild className="rounded-none">
                      <a href={project.url} target="_blank" rel="noreferrer">View project <ArrowUpRight /></a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section-shell relative overflow-hidden border-b border-border" data-reveal>
        <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="grid items-center gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <SectionHeading number="03" eyebrow="Technology map" title="Skills" />
              <p className="mt-8 max-w-md leading-7 text-muted-foreground">
                A growing constellation of programming foundations, development tools, and data-focused thinking.
              </p>
            </div>
            <div className="skill-orbit relative mx-auto aspect-square w-full max-w-[620px]" aria-label="Technology constellation">
              <div className="absolute inset-[9%] rounded-full border border-border" />
              <div className="absolute inset-[26%] rounded-full border border-primary/30" />
              <div className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/50 bg-card text-center shadow-[0_0_60px_var(--primary-soft)] sm:size-40">
                <div><Code2 className="mx-auto mb-2 text-primary" /><span className="font-display text-lg">Technology<br />Explorer</span></div>
              </div>
              {SKILLS.map((skill, index) => {
                const angle = (index / SKILLS.length) * Math.PI * 2 - Math.PI / 2;
                const radius = index % 2 === 0 ? 43 : 35;
                const left = 50 + Math.cos(angle) * radius;
                const top = 50 + Math.sin(angle) * radius;
                return (
                  <span key={skill} className="skill-node absolute -translate-x-1/2 -translate-y-1/2 border border-border bg-card px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-foreground shadow-lg sm:px-4 sm:text-xs" style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * -0.35}s` }}>
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="section-shell relative overflow-hidden border-b border-border bg-card/40" data-reveal>
        <div className="architecture-silhouette absolute inset-x-0 bottom-0 h-44 opacity-20" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <SectionHeading number="04" eyebrow="Academic path" title="Education" />
            <article className="relative border-l border-primary pl-7 sm:pl-12">
              <span className="absolute -left-5 top-0 grid size-10 place-items-center border border-primary bg-background text-primary"><GraduationCap size={18} /></span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">REVA University · Bangalore</p>
              <h3 className="mt-6 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">B.Tech in Artificial Intelligence &amp; Data Science</h3>
              <p className="mt-7 max-w-xl leading-7 text-muted-foreground">
                Building an academic foundation at the intersection of intelligent systems, data, programming, and practical technology.
              </p>
              <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <BookOpen size={15} className="text-primary" /> Current academic journey
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell relative overflow-hidden" data-reveal>
        <div className="stars absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <SectionHeading number="05" eyebrow="Open channel" title="Contact" />
              <p className="mt-8 max-w-md font-display text-3xl leading-tight sm:text-4xl">Have an idea, a question, or a route worth exploring?</p>
              <div className="mt-10 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Email</p>
                <p className="text-sm text-foreground">Email address to be added</p>
              </div>
              <div className="mt-8 flex gap-3">
                <Button asChild variant="outline" size="icon" className="size-11 rounded-none">
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
                </Button>
                <Button asChild variant="outline" size="icon" className="size-11 rounded-none">
                  <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
                </Button>
              </div>
            </div>

            <form onSubmit={handleContact} className="border border-border bg-card/65 p-6 backdrop-blur-sm sm:p-9">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Your name
                  <Input name="name" required autoComplete="name" placeholder="Name" className="h-12 rounded-none border-border bg-background/50 font-sans normal-case tracking-normal" />
                </label>
                <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Your email
                  <Input name="email" required type="email" autoComplete="email" placeholder="you@example.com" className="h-12 rounded-none border-border bg-background/50 font-sans normal-case tracking-normal" />
                </label>
              </div>
              <label className="mt-6 grid gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Message
                <Textarea name="message" required placeholder="Tell me what you would like to discuss..." className="min-h-36 resize-y rounded-none border-border bg-background/50 font-sans normal-case tracking-normal" />
              </label>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" className="rounded-none uppercase tracking-[0.12em]">
                  <Send /> Open in email app
                </Button>
                {sent && <span className="flex items-center gap-2 text-xs text-primary"><Check size={15} /> Draft prepared</span>}
              </div>
              <p className="mt-5 text-xs leading-5 text-muted-foreground">
                This prepares a message in your email app. Add Prapul’s email address there before sending.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-14">
          <span>© 2026 Prapul Rajakumar Tikota</span>
          <a href="#home" className="flex items-center gap-2 hover:text-primary">Return to top <ArrowDown className="rotate-180" size={14} /></a>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return (
    <div>
      <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        <span>{number}</span><span className="h-px w-9 bg-primary" />{eyebrow}
      </p>
      <h2 className="mt-5 font-display text-5xl font-semibold uppercase sm:text-6xl">{title}</h2>
    </div>
  );
}