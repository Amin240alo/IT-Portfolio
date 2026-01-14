import { motion } from "framer-motion";
import { fadeUp } from "../components/motion";

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-3 text-sm md:text-base text-muted/75">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent to-accent2" />
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="snap-start min-h-[calc(100vh-6px)] flex items-center"
    >
      <div className="container-x w-full">
        {/* ✅ Titel höher + etwas kompakter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="text-center -mt-8 md:-mt-10 lg:-mt-12"
        >
          <h2 className="font-display font-extrabold tracking-tight text-[clamp(38px,4.8vw,64px)]">
            <span className="bg-gradient-to-br from-accent to-accent2 bg-clip-text text-transparent">
              About
            </span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-muted/70">
            Clean UI · klare Logik · saubere Details
          </p>
        </motion.div>

        {/* ✅ Breiter wirken + mehr Abstand + Bild etwas weiter rechts */}
        <div className="mt-8 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 lg:gap-16 items-center">
          {/* TEXT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="lg:pr-2"
          >
            {/* ✅ leicht größer */}
            <h3 className="font-display font-extrabold tracking-tight text-[clamp(28px,3.4vw,46px)] leading-[1.05]">
              Hello, I’m <br />
              Mohammad Amin Alo
            </h3>

            <div className="mt-6 space-y-4 max-w-[66ch]">
              <p className="text-base md:text-lg text-muted/75 leading-relaxed">
                Ich baue moderne Frontends, die nicht nur gut aussehen, sondern
                sich sauber und konsistent verhalten – vom Layout bis zu UI-States
                und JavaScript-Logik.
              </p>

              <p className="text-base md:text-lg text-muted/75 leading-relaxed">
                Ich arbeite strukturiert und iterativ: planen, umsetzen, testen,
                verbessern. Aktuell suche ich eine Ausbildung als Fachinformatiker
                für Anwendungsentwicklung und vertiefe meine Skills in
                JavaScript, API-Integration und Fullstack-Grundlagen.
              </p>

              {/* ✅ bullets bisschen “luftiger” */}
              <ul className="mt-6 space-y-3">
                <Bullet>UI-States, Validierung & klare Komponentenstruktur</Bullet>
                <Bullet>API-Integration, Fehlerbehandlung & saubere Datenflüsse</Bullet>
                <Bullet>Fokus auf Spacing, Typografie und UX-Details</Bullet>
              </ul>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="hidden lg:flex justify-end"
          >
            {/* ✅ etwas größer + weiter rechts */}
            <div className="relative h-[360px] w-[360px] lg:translate-x-3">
              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/25 to-accent2/25 blur-2xl" />

              {/* Subtiler Ring */}
              <div className="absolute inset-0 rounded-full border border-line/20" />

              {/* Rahmen + Bild */}
              <div className="relative h-full w-full rounded-full border border-line/15 overflow-hidden">
                <img
                  src="/placeholders/MO.jpeg"
                  alt="Mohammad Amin Alo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
