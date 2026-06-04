import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Start" },
  { to: "/blog", label: "Blog" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-1 text-2xl font-bold tracking-tight">
          <span className="text-foreground">3</span>
          <span className="text-primary">pix</span>
          <span className="ml-1 inline-block h-2 w-2 translate-y-1 rounded-full bg-secondary" />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="flat" size="sm">
                <Link to="/panel">Panel</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Wyloguj
              </Button>
            </div>
          ) : (
            <Button asChild variant="hero" size="sm">
              <Link to="/login">Zaloguj</Link>
            </Button>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t-2 border-ink bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-semibold"
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/panel" className="text-sm font-semibold" onClick={() => setOpen(false)}>
                  Panel
                </Link>
                <button className="text-left text-sm font-semibold" onClick={handleSignOut}>
                  Wyloguj
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-semibold text-primary" onClick={() => setOpen(false)}>
                Zaloguj
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
