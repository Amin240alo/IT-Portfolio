import { motion } from "framer-motion";
import Section from "./Section";
import { profile } from "../data/profile";
import { fadeUp } from "./motion";

function Btn({ variant = "ghost", as: Comp = "a", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-display font-bold tracking-tight transition";
  const v =
    variant === "primary"
      ? "text-white/95 bg-gradient-to-br from-accent to-accent2 hover:brightness-110"
      : "text-text/90 border border-line/15 bg-white/0 hover:bg-white/5 hover:border-line/25";
  return <Comp className={`${base} ${v} hover:-translate-y-0.5 active:translate-y-0 ${className}`} {...props} />;
}

export default function Contact() {
  return (
    <Section id="contact" title="Kontakt" desc="Am einfachsten per Mail.">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="card rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted/75">E-Mail</p>
          <a className="mt-2 inline-block font-display font-extrabold tracking-tight underline underline-offset-4" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          <Btn variant="primary" href={`mailto:${profile.email}`}>Mail schreiben</Btn>
          <Btn href={profile.github} target="_blank" rel="noreferrer">GitHub</Btn>
        </div>
      </motion.div>

      <footer className="mt-10 text-sm text-muted/60 flex items-center justify-between">
        <span>{new Date().getFullYear()} · {profile.name}</span>
        <a className="hover:underline" href="#top">Nach oben</a>
      </footer>
    </Section>
  );
}
