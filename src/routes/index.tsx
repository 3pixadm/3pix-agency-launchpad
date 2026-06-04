import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Rocket, Palette, Code2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/lib/posts";
import heroImg from "@/assets/hero-3pix.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "3pix — interaktywna agencja kreatywna" },
      {
        name: "description",
        content:
          "3pix projektuje, koduje i ożywia marki. Sprawdź nasze realizacje i blog pełen wiedzy o designie i technologii.",
      },
      { property: "og:title", content: "3pix — interaktywna agencja kreatywna" },
      {
        property: "og:description",
        content: "Projektujemy, kodujemy i ożywiamy marki w żywych kolorach.",
      },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Palette, title: "Design & Branding", desc: "Tożsamości wizualne i interfejsy, które zapadają w pamięć.", color: "bg-coral text-coral-foreground" },
  { icon: Code2, title: "Web Development", desc: "Szybkie, skalowalne strony i aplikacje webowe.", color: "bg-teal text-teal-foreground" },
  { icon: Sparkles, title: "Motion & 3D", desc: "Animacje i mikrointerakcje, które ożywiają produkt.", color: "bg-violet text-violet-foreground" },
  { icon: Rocket, title: "Strategia", desc: "Od pomysłu do wdrożenia — prowadzimy za rękę.", color: "bg-yellow text-yellow-foreground" },
];

function Index() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const published = (posts ?? []).filter((p) => p.published);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="border-b-2 border-ink bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-yellow px-4 py-1.5 text-sm font-bold text-yellow-foreground">
              <Sparkles className="size-4" /> Interaktywna agencja kreatywna
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl">
              Tworzymy cyfrowe
              <span className="text-primary"> doświadczenia</span>, które działają.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              W 3pix łączymy odważny design, czysty kod i ruch. Budujemy marki,
              które wyróżniają się w sieci.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/kontakt">Rozpocznij projekt</Link>
              </Button>
              <Button asChild variant="flat" size="xl">
                <Link to="/blog">Zobacz blog</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border-2 border-ink shadow-flat">
            <img
              src={heroImg}
              alt="Kolorowa flat-designowa ilustracja agencji 3pix"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b-2 border-ink bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold md:text-4xl">Co robimy</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border-2 border-ink bg-card p-6 shadow-flat-sm"
              >
                <div className={`flex size-12 items-center justify-center rounded-xl border-2 border-ink ${s.color}`}>
                  <s.icon className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog tiles */}
      <section id="blog" className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Z naszego bloga</h2>
              <p className="mt-2 text-muted-foreground">
                Wiedza, inspiracje i kulisy naszych projektów.
              </p>
            </div>
            <Button asChild variant="flat">
              <Link to="/blog">Wszystkie wpisy</Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl border-2 border-ink bg-muted" />
              ))}
            </div>
          ) : published.length === 0 ? (
            <p className="mt-10 text-muted-foreground">Brak wpisów. Wróć wkrótce!</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {published.slice(0, 6).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
