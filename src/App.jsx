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
          <a className="nav-cta" href={`mailto:${site.email}`}>
            Email
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="wrap hero-layout">
        <div className="hero-content">
          <h1 className="hero-brand hero-rise">{site.name}</h1>
          <p className="hero-role hero-rise-delay">{site.role}</p>
          <p className="hero-support hero-rise-delay-2">{site.heroSupport}</p>
          <div className="hero-ctas hero-rise-delay-3">
            <a className="btn btn-primary" href={`mailto:${site.email}`}>
              Email me
            </a>
            <a
              className="btn btn-ghost"
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
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
          From Amazon backends to founding FDE at Rippling.
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
            <h3>Languages &amp; frameworks</h3>
            <ul className="tag-list">
              {toolkit.languages.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="toolkit-group">
            <h3>Platform &amp; tools</h3>
            <ul className="tag-list">
              {toolkit.platforms.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="toolkit-group">
            <h3>Domain</h3>
            <ul className="tag-list">
              {toolkit.domain.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="toolkit-group">
            <h3>Leadership</h3>
            <ul className="tag-list">
              {toolkit.leadership.map((t) => (
                <li key={t}>{t}</li>
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
