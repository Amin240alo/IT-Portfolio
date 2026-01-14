import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { projects } from "../data/projects";
import { fadeUp, stagger } from "./motion";
const cx = (...c) => c.filter(Boolean).join(" ");


function Tag({ children }) {
  return <span className="text-[11px] rounded-full px-2 py-1 border border-line/10 text-muted/70">{children}</span>;
}

function Btn({ variant = "ghost", as: Comp = "a", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-display font-bold tracking-tight transition";
  const v =
    variant === "primary"
      ? "text-white/95 bg-gradient-to-br from-accent to-accent2 hover:brightness-110"
      : "text-text/90 border border-line/15 bg-white/0 hover:bg-white/5 hover:border-line/25";
  return <Comp className={`${base} ${v} hover:-translate-y-0.5 active:translate-y-0 ${className}`} {...props} />;
}

function ProjectCard({ p, onCopy }) {
  return (
    <motion.article variants={fadeUp} className="card rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted/60">{p.badge}</p>
          <h3 className="mt-2 font-display font-extrabold tracking-tight text-[17px]">{p.title}</h3>
          <p className="mt-2 text-sm text-muted/75">{p.description}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {p.tags.slice(0, 4).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>

      <div className="hairline my-4" />

      <ul className="text-sm text-muted/75 space-y-1 list-disc pl-5">
        {p.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        <Btn variant="primary" href={p.liveUrl} target="_blank" rel="noreferrer">Live</Btn>
        <Btn href={p.codeUrl} target="_blank" rel="noreferrer">Code</Btn>
        <button
          className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-display font-bold tracking-tight border border-line/15 hover:border-line/25 hover:bg-white/5 transition hover:-translate-y-0.5 active:translate-y-0"
          type="button"
          onClick={() => onCopy(p.liveUrl)}
        >
          Link kopieren
        </button>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [toast, setToast] = useState("");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      const okFilter =
        filter === "all" ? true : filter === "featured" ? p.featured : p.categories.includes(filter);
      if (!okFilter) return false;

      if (!query) return true;
      const hay = [p.title, p.description, ...p.tags, ...p.bullets].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [filter, q]);

  async function copy(url) {
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link kopiert");
    } catch {
      setToast("Kopieren nicht möglich");
    }
    window.clearTimeout(window.__t);
    window.__t = window.setTimeout(() => setToast(""), 1500);
  }

  return (
    <Section id="projects" title="Projekte" desc="Live-Demos & Code direkt verlinkt. Filter + Suche für schnellen Überblick.">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="flex flex-wrap items-end justify-between gap-4">
        <div className="w-full sm:w-auto">
          <input
            className="w-full sm:w-[340px] rounded-xl border border-line/15 bg-white/0 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/30"
            placeholder="Suche: AI, Wetter, PWA …"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <div className="mt-2 flex flex-wrap gap-2">
            {[
              ["all", "Alle"],
              ["featured", "Highlights"],
              ["api", "API"],
              ["pwa", "PWA"],
              ["fullstack", "Fullstack"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={cx(
                  "text-sm rounded-full px-3.5 py-2 border transition",
                  filter === key
                    ? "border-line/25 bg-white/5 text-text/90"
                    : "border-line/10 text-muted/75 hover:border-line/20 hover:bg-white/5"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-6 grid md:grid-cols-2 gap-4">
        {list.map((p) => (
          <ProjectCard key={p.id} p={p} onCopy={copy} />
        ))}
      </motion.div>

      {list.length === 0 && (
        <p className="mt-6 text-sm text-muted/75">Keine Treffer. Probier ein anderes Keyword.</p>
      )}

      {toast && (
        <div className="fixed left-1/2 bottom-5 -translate-x-1/2 rounded-full border border-line/15 bg-bg/80 backdrop-blur px-4 py-2 text-sm shadow-[0_12px_40px_rgba(0,0,0,.25)]">
          {toast}
        </div>
      )}
    </Section>
  );
}
