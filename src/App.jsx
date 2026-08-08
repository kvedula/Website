import { useEffect, useEffectEvent, useState } from "react";
import heroImage from "./assets/hero.jpg";
import {
  about,
  career,
  companies,
  education,
  givingBack,
  site,
  spotlight,
  toolkit,
} from "./content.js";

function getInitialTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useEffectEvent(() => {
    setScrolled(window.scrollY > 24);
  });

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.05 5.05l1.55 1.55M17.4 17.4l1.55 1.55M18.95 5.05l-1.55 1.55M6.6 17.4l-1.55 1.55"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.5 13.2A7.5 7.5 0 0 1 10.8 4.5 7.6 7.6 0 1 0 19.5 13.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Nav({ theme, onToggleTheme, scrolled }) {
  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a className="nav-brand" href="#top">
          {site.name}
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#career">Career</a>
            </li>
            <li>
              <a href="#spotlight">Spotlight</a>
            </li>
            <li>
              <a href="#toolkit">Toolkit</a>
            </li>
          </ul>
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 11.2 20 4.6l-3.2 15.2-4.4-4.1-2.7 2.6.5-5.2 7.4-6.7-9.6 5.9-4.5-1.1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C17.7 4.2 18.7 4.5 18.7 4.5a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

function Hero() {
  const { before, highlights, after } = site.heroIntro;

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="wrap hero-layout">
        <div className="hero-content">
          <p className="hero-eyebrow hero-rise">{site.eyebrow}</p>
          <h1 className="hero-brand hero-rise-delay">
            Hello, I&apos;m {site.firstName}.
          </h1>
          <p className="hero-intro hero-rise-delay-2">
            {before}
            {highlights.map((phrase, i) => (
              <span key={phrase}>
                <span className="hero-accent">{phrase}</span>
                {i < highlights.length - 1
                  ? i === highlights.length - 2
                    ? ", and "
                    : ", "
                  : null}
              </span>
            ))}
            {after}
          </p>
          <p className="hero-tagline hero-rise-delay-2">{site.heroTagline}</p>
          <div className="hero-ctas hero-rise-delay-3">
            <a
              className="btn btn-primary"
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a className="btn btn-ghost" href={`mailto:${site.email}`}>
              <EmailIcon />
              Email
            </a>
            <a
              className="btn btn-ghost"
              href={site.github}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
        <div className="hero-portrait hero-rise-delay">
          <img
            src={heroImage}
            alt={`${site.name}`}
            width={1024}
            height={682}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section className="logos" aria-label="Companies">
      <div className="wrap">
        <p className="logos-label">Built, shipped &amp; studied at</p>
        <div className="logos-row">
          {companies.map((name) => (
            <span className="logo-word" key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="wrap reveal">
        <p className="section-label">About</p>
        <h2 className="section-title">{about.headline}</h2>
        <div className="about-grid">
          <div className="about-copy">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <aside className="about-aside">
            <div className="aside-note">
              <h3>Coaching on Exponent</h3>
              <p>
                Helping people break into forward deployed roles — and building
                Exponent’s FDE course from the ground up.
              </p>
              <a
                href="https://www.tryexponent.com/coach/Kamesh-Vedula"
                target="_blank"
                rel="noreferrer"
              >
                Book coaching →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Career() {
  return (
    <section className="section" id="career">
      <div className="wrap reveal">
        <p className="section-label">Career</p>
        <h2 className="section-title">
          From Amazon backends to founding FDE — and now interim management — at
          Rippling.
        </h2>
        <p className="section-lead">
          Five-plus years delivering complex customer implementations —
          always in the seat where business problems meet production software.
        </p>
        <div className="career-list">
          {career.map((job) => (
            <article className="job" key={`${job.company}-${job.title}`}>
              <div className="job-head">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-dates">{job.dates}</span>
              </div>
              <div className="job-meta">
                <span className="job-company">{job.company}</span>
                <span>{job.location}</span>
                {job.meta ? <span className="job-tag">{job.meta}</span> : null}
              </div>
              <ul className="job-bullets">
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 40)}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spotlight() {
  return (
    <section className="section" id="spotlight">
      <div className="wrap reveal">
        <p className="section-label">Spotlight</p>
        <h2 className="section-title">Selected work, talks &amp; moments.</h2>
        <p className="section-lead">
          Customer stories, panels, Builder School, and the occasional office
          breakdance for the brand.
        </p>
        <ul className="spotlight-list">
          {spotlight.map((item) => (
            <li className="spotlight-item" key={item.href}>
              <a href={item.href} target="_blank" rel="noreferrer">
                <p className="spotlight-title">
                  <span>{item.title}</span>
                  <span className="spotlight-arrow" aria-hidden="true">
                    ↗
                  </span>
                </p>
                <p className="spotlight-blurb">{item.blurb}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GivingBack() {
  return (
    <section className="section" id="giving-back">
      <div className="wrap reveal">
        <p className="section-label">Giving back</p>
        <h2 className="section-title">Sending the ladder down.</h2>
        {givingBack.map((item) => (
          <article className="giving-item" key={item.title}>
            <h3>{item.title}</h3>
            <div className="dates">{item.dates}</div>
            <p>{item.blurb}</p>
            <a href={item.href} target="_blank" rel="noreferrer">
              View coach profile →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section" id="education">
      <div className="wrap reveal">
        <p className="section-label">Education</p>
        <h2 className="section-title">Computer science, Southern California.</h2>
        <div className="edu">
          <div>
            <h3>{education.school}</h3>
            <p>{education.degree}</p>
            <p>{education.location}</p>
          </div>
          <span className="edu-dates">{education.dates}</span>
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="section" id="toolkit">
      <div className="wrap reveal">
        <p className="section-label">Toolkit</p>
        <h2 className="section-title">More than a tech stack.</h2>
        <div className="toolkit-grid">
          <div className="toolkit-group">
            <h3>Programming languages</h3>
            <ul className="tag-list">
              {toolkit.languages.map((t) => (
                <li key={t.name}>
                  <img src={t.logo} alt="" aria-hidden="true" />
                  <span>{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="toolkit-group">
            <h3>Frameworks &amp; data</h3>
            <ul className="tag-list">
              {toolkit.frameworks.map((t) => (
                <li key={t.name}>
                  <img src={t.logo} alt="" aria-hidden="true" />
                  <span>{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="toolkit-group toolkit-group-wide">
            <h3>AI and platforms</h3>
            <ul className="tag-list">
              {toolkit.ai.map((t) => (
                <li key={t}>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="toolkit-group toolkit-group-wide">
            <h3>Leadership &amp; management</h3>
            <ul className="tag-list">
              {toolkit.leadership.map((t) => (
                <li key={t}>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <p className="footer-brand">{site.name}</p>
          <p className="footer-meta">
            {site.role} · {site.location}
          </p>
        </div>
        <ul className="footer-links">
          <li>
            <a href={`mailto:${site.email}`}>Email</a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();
  const scrolled = useNavScroll();
  useReveal();

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggle} scrolled={scrolled} />
      <main>
        <Hero />
        <Logos />
        <About />
        <Career />
        <Spotlight />
        <GivingBack />
        <Education />
        <Toolkit />
      </main>
      <Footer />
    </>
  );
}
