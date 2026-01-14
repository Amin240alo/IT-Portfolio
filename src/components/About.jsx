import { motion } from "framer-motion";
import Section from "./Section";
import { profile } from "../data/profile";
import { fadeUp } from "./motion";

export default function About() {
  return (
    <Section id="about" title="Über mich" desc="Kurz, ehrlich, professionell.">
      <div className="grid lg:grid-cols-2 gap-4 items-start">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="card rounded-xl p-5">
          {profile.about.map((p, i) => (
            <p key={i} className="text-sm text-muted/75 leading-relaxed mt-3 first:mt-0">{p}</p>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="card rounded-xl p-5">
          <h3 className="font-display font-extrabold tracking-tight">Stärken</h3>
          <div className="mt-4 grid gap-2">
            {profile.strengths.map(({ k, v }) => (
              <div key={k} className="flex items-center justify-between rounded-xl border border-line/10 bg-white/0 px-4 py-3">
                <span className="text-sm text-text/90">{k}</span>
                <span className="text-sm text-muted/65">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
