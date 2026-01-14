import { motion } from "framer-motion";
import Lottie from "lottie-react";
import codingAnim from "../assets/lottie/Coding.json";
import { fadeUp, stagger } from "../components/motion";

function Chip({ children }) {
  return (
    <span className="rounded-full border border-line/15 bg-white/0 px-4 py-2 text-xs md:text-sm text-muted/75">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <section
      id="home"
      className="snap-start min-h-[calc(80vh-64px)] flex items-center"
    >
      <div className="container-x w-full">
        {/* ✅ Mehr Platz + bessere Spalten-Gewichtung + größerer Abstand */}
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 lg:gap-16 items-center">
          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="lg:pr-2">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-line/15 bg-white/5 px-4 py-2 text-xs text-muted/75"
            >
              Ausbildung gesucht · FIAE
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display font-extrabold tracking-tight leading-[0.95] text-[clamp(52px,6.8vw,102px)]"
            >
              <span className="block text-text/95">Frontend</span>
              <span className="block bg-gradient-to-br from-accent to-accent2 bg-clip-text text-transparent">
                Developer
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 text-base md:text-lg text-muted/75">
              HTML · CSS · JavaScript · UI-States · Responsive
            </motion.p>

            {/* ✅ Text etwas größer + Zeilen angenehmer */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-base md:text-lg text-muted/75 max-w-2xl leading-relaxed"
            >
              Ich entwickle strukturierte Frontends mit klarem Spacing, sauberen UI-States
              und nachvollziehbarer JavaScript-Logik – damit sich Web-Apps nicht nur gut
              ansehen, sondern auch sauber anfühlen.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <Chip>UI-States</Chip>
              <Chip>Responsive Layout</Chip>
              <Chip>JavaScript (DOM & Logik)</Chip>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
              <a className="btn-primary" href="#portfolio">
                Projects
              </a>
              <a className="btn-ghost" href="#contact">
                Contact
              </a>
              <a className="btn-ghost" href="#portfolio">
                AIRealCheck ansehen
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT (Lottie) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hidden lg:flex justify-end"
          >
            {/* ✅ größer + weiter nach rechts + mehr Abstand zum Text */}
            <div className="relative w-[560px] max-w-full lg:translate-x-3">
              {/* weicher Glow im Hintergrund */}
              <div className="absolute -inset-8 rounded-[32px] bg-gradient-to-br from-accent/22 to-accent2/22 blur-2xl" />

              <div className="relative overflow-hidden rounded-[28px] bg-white/0">
                <Lottie
                  animationData={codingAnim}
                  loop
                  autoplay
                  className="w-full h-auto scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
