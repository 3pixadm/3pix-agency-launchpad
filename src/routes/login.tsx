import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Logowanie — 3pix" },
      { name: "description", content: "Panel logowania dla zespołu 3pix." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.navigate({ to: "/panel" });
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Zalogowano pomyślnie!");
        router.navigate({ to: "/panel" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Konto utworzone! Możesz się zalogować.");
        router.navigate({ to: "/panel" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Coś poszło nie tak.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex flex-1 items-center justify-center bg-muted px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border-2 border-ink bg-card p-8 shadow-flat">
          <div className="flex items-center gap-1 text-3xl font-bold">
            <span>3</span>
            <span className="text-primary">pix</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">
            {mode === "login" ? "Zaloguj się" : "Załóż konto"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Wejdź do panelu, aby zarządzać wpisami."
              : "Utwórz konto zespołu 3pix."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ty@3pix.studio"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" disabled={loading}>
              {loading ? "Proszę czekać..." : mode === "login" ? "Zaloguj" : "Zarejestruj"}
            </Button>
          </form>

          <button
            className="mt-5 w-full text-center text-sm font-semibold text-primary hover:underline"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "Nie masz konta? Zarejestruj się"
              : "Masz już konto? Zaloguj się"}
          </button>

          <Link
            to="/"
            className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground"
          >
            ← Wróć na stronę główną
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
