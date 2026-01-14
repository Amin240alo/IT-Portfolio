import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return setTheme(saved);

    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="orb -left-56 -top-64"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(124,92,255,.95), transparent 60%)",
          }}
        />
        <div
          className="orb -right-60 top-20"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(32,227,178,.85), transparent 60%)",
          }}
        />
      </div>

      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      {/* ✅ Wichtig: kein overflow-y-auto + kein snap-y => nix rastet ein */}
      <main className="pt-16">
        <Home />
        <About />
        <Portfolio />
        <Contact />
        <Footer />
        <ScrollTop />
      </main>
    </div>
  );
}
