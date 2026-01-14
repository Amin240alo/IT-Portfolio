const tech = ["JavaScript", "Tailwind CSS", "React", "Vite", "HTML", "CSS", "Node.js", "APIs", "PWA"];

export default function TechTicker() {
  const items = [...tech, ...tech]; // doppelt = endlos

  return (
    <div className="ticker">
      <div className="ticker-track" aria-hidden="true">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="text-sm text-muted/75 whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
