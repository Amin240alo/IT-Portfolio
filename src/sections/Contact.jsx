import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../components/motion";

const cx = (...c) => c.filter(Boolean).join(" ");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const EMAIL = "amin.alo@posteo.com";
  const GITHUB = "https://github.com/Amin240alo";

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const email = form.email.trim();
  const name = form.name.trim();
  const message = form.message.trim();

  const isValid = useMemo(() => {
    const emailOk = EMAIL_RE.test(email);
    const msgOk = message.length >= 10;
    return emailOk && msgOk;
  }, [email, message]);

  const mailtoHref = useMemo(() => {
    const subject = `Kontakt über Portfolio${name ? ` – ${name}` : ""}`;
    const body = [
      "Hallo Mohammad,",
      "",
      message || "(keine Nachricht)",
      "",
      "—",
      name ? `Name: ${name}` : null,
      `E-Mail: ${email}`,
    ]
      .filter(Boolean)
      .join("\n");

    // mailto values should be URL-encoded to handle spaces/special chars/line breaks reliably [web:48]
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [EMAIL, name, email, message]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    window.location.href = mailtoHref;
  };

  return (
    <section id="contact" className="snap-start min-h-[calc(100vh-64px)] flex items-center">
      <div className="container-x w-full">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="font-display font-extrabold tracking-tight text-[clamp(34px,4vw,54px)]">
              Contact
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted/75 max-w-2xl mx-auto">
              Haben Sie Fragen? Schicken Sie mir eine Nachricht, und ich werde <br /> Ihnen umgehend antworten.
            </p>
          </motion.div>

          {/* Card (light + dark safe) */}
          <motion.div
            variants={fadeUp}
            className="mt-10 mx-auto w-full max-w-5xl rounded-2xl p-6 md:p-7
                       bg-white text-slate-900 border border-slate-200
                       dark:bg-slate-900/40 dark:text-slate-100 dark:border-white/10"
          >
            <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
              {/* Top: Title */}
              <div className="lg:col-span-2">
                <h3 className="font-display font-bold text-lg">Nachricht</h3>
                
              </div>

              

              {/* Main form (big) */}
              <div className="lg:col-span-3">

                <form className="grid gap-3" onSubmit={onSubmit} noValidate>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="w-full rounded-xl border px-4 py-2.5 outline-none
                               bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400
                               focus:border-accent/60 focus:ring-2 focus:ring-accent/20
                               dark:bg-white/5 dark:border-white/10 dark:text-slate-100 dark:placeholder:text-white/40"
                    placeholder="Name (optional)"
                    autoComplete="name"
                  />

                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    className="w-full rounded-xl border px-4 py-2.5 outline-none
                               bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400
                               focus:border-accent/60 focus:ring-2 focus:ring-accent/20
                               dark:bg-white/5 dark:border-white/10 dark:text-slate-100 dark:placeholder:text-white/40"
                    placeholder="E-Mail *"
                    autoComplete="email"
                    inputMode="email"
                  />

                  <textarea
                    name="message"
                    required
                    rows={7}
                    value={form.message}
                    onChange={onChange}
                    className="w-full resize-none rounded-xl border px-4 py-2.5 outline-none
                               bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400
                               focus:border-accent/60 focus:ring-2 focus:ring-accent/20
                               dark:bg-white/5 dark:border-white/10 dark:text-slate-100 dark:placeholder:text-white/40"
                    placeholder="Deine Nachricht * (mind. 10 Zeichen)"
                  />

                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      className={cx("btn-primary", !isValid && "opacity-60 cursor-not-allowed")}
                      type="submit"
                      disabled={!isValid}
                    >
                      E-Mail öffnen
                    </button>

                    <span className="text-xs text-slate-500 dark:text-white/50">
                      Öffnet deinen Mail-Client mit vorbereiteter Nachricht
                    </span>
                    
                  </div>
                </form>
               {/* Secondary actions (small) */}
              <div className="lg:col-span-1 lg:justify-self-end">
                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
               

                  <a
                    className="rounded-xl border px-3 py-2 text-sm transition
                               bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100
                               dark:bg-white/5 dark:border-white/10 dark:text-slate-100 dark:hover:bg-white/10"
                    href={GITHUB}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-slate-500 dark:text-white/60">GitHub:</span>{" "}
                    <span className="font-semibold">Amin240alo</span>
                  </a>
                </div>
              </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
