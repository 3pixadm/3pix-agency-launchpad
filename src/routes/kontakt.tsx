import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — 3pix" },
      {
        name: "description",
        content:
          "Skontaktuj się z agencją 3pix. Opowiedz nam o swoim projekcie — odpowiadamy w 24h.",
      },
      { property: "og:title", content: "Kontakt — 3pix" },
      { property: "og:description", content: "Opowiedz nam o swoim projekcie." },
    ],
  }),
  component: ContactPage,
});

const details = [
  { icon: Mail, label: "E-mail", value: "hej@3pix.studio" },
  { icon: Phone, label: "Telefon", value: "+48 500 300 100" },
  { icon: MapPin, label: "Adres", value: "Warszawa, Polska" },
];

function ContactPage() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Dziękujemy! Odezwiemy się wkrótce.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="border-b-2 border-ink bg-teal">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-4xl font-bold text-teal-foreground md:text-5xl">
            Porozmawiajmy
          </h1>
          <p className="mt-3 max-w-xl text-teal-foreground/80">
            Masz pomysł? My mamy narzędzia, by go zrealizować.
          </p>
        </div>
      </section>

      <section className="flex-1 bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border-2 border-ink bg-card p-6 shadow-flat-sm"
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Imię i nazwisko</Label>
                <Input id="name" name="name" required placeholder="Jan Kowalski" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" required placeholder="jan@firma.pl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Wiadomość</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Opowiedz nam o projekcie..."
                />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={sending}>
                <Send className="size-4" /> {sending ? "Wysyłanie..." : "Wyślij wiadomość"}
              </Button>
            </div>
          </form>

          <div className="flex flex-col gap-4">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-card p-5 shadow-flat-sm"
              >
                <div className="flex size-12 items-center justify-center rounded-xl border-2 border-ink bg-coral text-coral-foreground">
                  <d.icon className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{d.label}</p>
                  <p className="text-lg font-bold">{d.value}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border-2 border-ink bg-violet p-6 text-violet-foreground shadow-flat-sm">
              <h3 className="text-xl font-bold">Godziny pracy</h3>
              <p className="mt-2 text-violet-foreground/90">
                Pon – Pt: 9:00 – 18:00
                <br />
                Weekend: tylko pilne sprawy
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
