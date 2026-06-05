import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-1 text-3xl font-bold">
            <span>3</span>
            <span className="text-primary">pix</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-foreground/70">
            Interaktywna agencja kreatywna. Projektujemy, kodujemy i ożywiamy marki.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">Menu</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-foreground/70">
            <li><Link to="/" className="hover:text-primary">Start</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary">Kontakt</Link></li>
            <li><Link to="/login" className="hover:text-primary">Zaloguj</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">Kontakt</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-foreground/70">
            <li>hej@3pix.mom</li>
            <li>+48 500 300 100</li>
            <li>Warszawa, PL</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/15 px-4 py-4 text-center text-xs text-ink-foreground/50">
        © {new Date().getFullYear()} 3pix. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
