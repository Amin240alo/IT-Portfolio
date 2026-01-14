export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container-x py-10">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Amin Alo
          </p>

          <p className="text-xs text-white/55">
            Built with React · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
