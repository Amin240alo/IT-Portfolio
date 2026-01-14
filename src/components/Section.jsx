import { motion } from "framer-motion";
import { fadeUp } from "./motion";

export default function Section({ id, title, desc, children }) {
  return (
    <section id={id} className="py-14">
      <div className="container-x">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <h2 className="font-display font-extrabold tracking-tight text-xl">{title}</h2>
          {desc ? <p className="mt-2 text-sm text-muted/75 max-w-2xl">{desc}</p> : null}
        </motion.div>

        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
