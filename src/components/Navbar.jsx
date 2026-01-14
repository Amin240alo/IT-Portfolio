export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/10 bg-bg/70 backdrop-blur">
      <div className="container-x h-16 flex items-center justify-between gap-4">
        <a className="font-display font-extrabold tracking-tight" href="#home">
         Amin Alo
        </a>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {[
            ["#home", "Home"],
            ["#about", "About"],
            ["#portfolio", "Portfolio"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-xl px-3 py-2 text-muted/75 hover:text-text/90 hover:bg-white/5 transition"
            >
              {label}
            </a>
          ))}
        </nav>
      
        {/*
        <button
          className="rounded-xl border border-line/15 px-3 py-2 text-sm hover:bg-white/5 transition"
          type="button"
          onClick={onToggleTheme}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>   

        */}
      </div>
    </header>
  );
}
