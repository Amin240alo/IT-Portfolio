import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../components/motion";
import TechTicker from "../components/TechTicker";
import { projects } from "../data/projects";

const cx = (...c) => c.filter(Boolean).join(" ");

const MAIN_PROJECT_ID = "airealcheck";

const skills = [
  { name: "HTML", icon: "/icons/html.svg", note: "Semantik & sauberes Markup" },
  { name: "CSS", icon: "/icons/css.svg", note: "Grid/Flex, Spacing, Responsive" },
  { name: "JavaScript", icon: "/icons/js.svg", note: "DOM, UI-States, Logik" },
  { name: "APIs", icon: "/icons/api.svg", note: "Fetch, Async-Flows, Daten → UI" },
  { name: "PWA", icon: "/icons/pwa.svg", note: "Installierbar, App-Feeling" },
  { name: "GitHub", icon: "/icons/github.svg", note: "Versionierung & Deploy" },
  { name: "Firebase", icon: "/icons/firebase.svg", note: "Auth/DB (Basics)" },
  { name: "AI Tools", icon: "/icons/openai.svg", note: "Prototyping & Workflows" },
];

function Tab({ active, children, ...props }) {
  return (
    <button
      className={cx(
        "relative flex-1 rounded-2xl px-4 py-4 text-sm font-display font-extrabold border transition",
        active
          ? "border-line/25 bg-white/5 text-text/95"
          : "border-line/10 text-muted/70 hover:border-line/20 hover:bg-white/5"
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function LinkBtn({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-display font-bold
                 border border-line/15 bg-white/0 hover:bg-white/5 hover:border-line/25 transition"
    >
      {children}
      <span className="text-muted/60">↗</span>
    </a>
  );
}

function Badge({ children }) {
  return (
    <span className="text-[11px] px-2.5 py-1 rounded-full border border-line/20 text-muted/70 bg-white/0">
      {children}
    </span>
  );
}

/**
 * ✅ SQUARE ProjectCard:
 * - Card selbst ist quadratisch (aspectRatio 1/1)
 * - Bild bekommt fixen Anteil (52%)
 * - Content ist clamp/hidden, Buttons immer unten
 */
function ProjectCard({ p }) {
  const isMain = String(p.id || "").toLowerCase() === MAIN_PROJECT_ID;

  return (
    <article
      style={{ aspectRatio: "1 / 1" }} // <- sicher, auch wenn Tailwind aspect-square mal zickt
      className={cx(
        "card rounded-2xl overflow-hidden transition hover:-translate-y-0.5",
        "flex flex-col h-full",
        isMain && "border border-line/25 bg-white/5"
      )}
    >
      {/* Bildbereich (fixer Anteil der Square-Card) */}
      <div className="h-[52%] bg-white/5 border-b border-line/10">
        <img
          src={p.thumbnail}
          alt={`${p.title} thumbnail`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Contentbereich */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="min-w-0 truncate font-display font-extrabold tracking-tight text-[18px] text-text/95">
                {p.title}
              </h3>
              {isMain && <Badge>Hauptprojekt</Badge>}
            </div>
          </div>

          {isMain && (
            <span className="shrink-0 text-[11px] text-muted/65">AI · Verification</span>
          )}
        </div>

        {/* ✅ Beschreibung fix: max 2 Zeilen -> gleiche Optik */}
        <p className="mt-2 text-sm text-muted/75 leading-relaxed line-clamp-2">
          {p.description}
        </p>

        {/* ✅ Tags: begrenzen, damit Card nicht “sprengt” */}
        <div className="mt-4 flex flex-wrap gap-2 overflow-hidden max-h-[56px]">
          {p.tags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-[11px] rounded-full px-2.5 py-1 border border-line/10 text-muted/70"
            >
              {t}
            </span>
          ))}
        </div>

        {/* ✅ Buttons immer unten */}
        <div className="mt-auto pt-5 flex flex-wrap gap-2">
          <LinkBtn href={p.liveUrl}>Live Demo</LinkBtn>
          <LinkBtn href={p.codeUrl}>Code</LinkBtn>
        </div>
      </div>
    </article>
  );
}

function TechCard({ name, icon, note }) {
  return (
    <div className="card rounded-2xl p-8 text-center hover:-translate-y-0.5 transition h-full">
      <div className="mx-auto mb-5 grid place-items-center h-20 w-20 rounded-2xl border border-line/12 bg-white/5">
        <img
          src={icon}
          alt={`${name} icon`}
          className="h-12 w-12"
          style={{ imageRendering: "auto" }}
          loading="lazy"
        />
      </div>

      <div className="text-[16px] font-display font-extrabold tracking-tight text-text/95">
        {name}
      </div>

      <p className="mt-2 text-[12px] text-muted/70 leading-relaxed">
        {note}
      </p>
    </div>
  );
}

export default function Portfolio() {
  const [tab, setTab] = useState("projects");

  const sortedProjects = [...projects].sort((a, b) => {
    const aMain = String(a.id || "").toLowerCase() === MAIN_PROJECT_ID ? 1 : 0;
    const bMain = String(b.id || "").toLowerCase() === MAIN_PROJECT_ID ? 1 : 0;
    return bMain - aMain;
  });

  return (
    <section
      id="portfolio"
      className="snap-start min-h-[calc(100vh-64px)] flex items-center"
    >
      <div className="container-x w-full">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2 className="text-center font-display font-extrabold tracking-tight text-[clamp(28px,3.8vw,52px)]">
            Portfolio
          </h2>

          <p className="mt-3 text-center text-sm text-muted/70 max-w-2xl mx-auto">
            Projekte und Tech Stack {/* – kurz, klar und übersichtlich. */}
          </p>

          <div className="mt-6">
            <TechTicker />
          </div>

          <div className="mt-8 card rounded-2xl p-3">
            <div className="grid grid-cols-2 gap-3">
              <Tab active={tab === "projects"} onClick={() => setTab("projects")}>
                Projects
              </Tab>
              <Tab active={tab === "stack"} onClick={() => setTab("stack")}>
                Tech Stack
              </Tab>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {tab === "projects" ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-6"
              >
                {/* ✅ items-stretch + h-full => perfekte Quadrate */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
                >
                  {sortedProjects.map((p) => (
                    <motion.div key={p.id} variants={fadeUp} className="h-full">
                      <ProjectCard p={p} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-6"
              >
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
                >
                  {skills.map((s) => (
                    <motion.div key={s.name} variants={fadeUp} className="h-full">
                      <TechCard {...s} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
