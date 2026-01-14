import { useEffect, useState } from "react";

export default function ScrollTop() {
  const [show, setShow] = useState(false);
  const [rootEl, setRootEl] = useState(null);

  useEffect(() => {
    // 1) Versuch: expliziter Container (falls du später id setzt)
    const byId = document.getElementById("scrollRoot");

    // 2) Fallback: finde wahrscheinlichsten Scroll-Container automatisch
    const auto =
      document.querySelector("[data-scroll-root='true']") ||
      document.querySelector(".snap-y") ||
      document.querySelector("[class*='overflow-y-auto']") ||
      document.scrollingElement; // window fallback

    const root = byId || auto || document.scrollingElement;
    setRootEl(root);

    const getY = () => {
      // window scroll
      if (root === document.scrollingElement) return window.scrollY;
      // container scroll
      return root?.scrollTop || 0;
    };

    const onScroll = () => setShow(getY() > 300);

    // initial
    onScroll();

    // listen on both (safe)
    window.addEventListener("scroll", onScroll, { passive: true });
    root?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      root?.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTop = () => {
    if (!rootEl || rootEl === document.scrollingElement) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      rootEl.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!show) return null;

  return (
<button
  onClick={goTop}
  aria-label="Nach oben"
  className="
    fixed bottom-6 right-6 z-[9999]
    flex items-center justify-center
    h-12 w-12 rounded-2xl
    border border-accent/30
    bg-white/10 backdrop-blur-md
    text-sm font-display font-bold text-text/95
    shadow-[0_0_0_1px_rgba(99,102,241,.25),0_20px_60px_-30px_rgba(0,0,0,.8)]
    transition
    hover:bg-white/15 hover:-translate-y-0.5 hover:scale-105

  "
>
  ↑
</button>


  );
}
