import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { fadeUp, stagger } from "./motion";

function Chip({ children }) {
  return (
    <span className="text-xs rounded-full px-3 py-2 border border-line/10 text-muted/75 bg-white/0">
      {children}
    </span>
  );
}

function Btn({ variant = "ghost", as: Comp = "a", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-display font-bold tracking-tight transition";
  const v =
    variant === "primary"
      ? "text-white/95 bg-gradient-to-br from-accent to-accent2 hover:brightness-110"
      : "text-text/90 border border-line/15 bg-white/0 hover:bg-white/5 hover:border-line/25";
  return <Comp className={`${base} ${v} hover:-translate-y-0.5 active:translate-y-0 ${className}`} {...props} />;
}

export default function Hero() {
  return (
    <section id="top" className="pt-16 pb-10">
      <div className="container-x">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.22em] text-muted/60">
            {profile.role}
          </motion.p>

          <motion.h1 variants={fadeUp} className="mt-4 font-display font-extrabold tracking-tight text-[clamp(32px,4.4vw,56px)] leading-[1.03] max-w-3xl">
            {profile.headline}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-sm text-muted/75 max-w-2xl leading-relaxed">
            {profile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
            <Btn variant="primary" href="#projects">Projekte ansehen</Btn>
            <Btn href="#contact">Kontakt</Btn>
            <Btn href={profile.github} target="_blank" rel="noreferrer">GitHub</Btn>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
            {profile.chips.map((s) => <Chip key={s}>{s}</Chip>)}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid lg:grid-cols-3 gap-4">
            <div className="card rounded-xl p-5 lg:col-span-2">
              <p className="text-sm text-muted/70">Kurzprofil</p>
              <p className="mt-2 font-display font-extrabold tracking-tight">{profile.name}</p>
              <p className="mt-1 text-sm text-muted/75">{profile.location} · {profile.goal}</p>

              <div className="hairline my-4" />

              <div className="flex flex-wrap gap-2 text-sm">
                <a className="underline underline-offset-4 hover:opacity-90" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <span className="text-muted/60">·</span>
                <a className="underline underline-offset-4 hover:opacity-90" href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>

            <div className="card rounded-xl p-5">
              <p className="text-sm text-muted/70">Arbeitsweise</p>
              <ul className="mt-3 text-sm text-muted/75 space-y-2 list-disc pl-5">
                <li>Mobile-first Layout & saubere Typografie</li>
                <li>UI-Details: Spacing, States, Micro-Interactions</li>
                <li>Fokus auf strukturierten Code</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
