import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { fetchPosts } from "@/lib/posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — 3pix" },
      {
        name: "description",
        content:
          "Blog agencji 3pix: design, kod, animacje i strategia. Wiedza i inspiracje z pierwszej ręki.",
      },
      { property: "og:title", content: "Blog — 3pix" },
      {
        property: "og:description",
        content: "Design, kod, animacje i strategia od zespołu 3pix.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const published = (posts ?? []).filter((p) => p.published);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="border-b-2 border-ink bg-yellow">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-4xl font-bold text-yellow-foreground md:text-5xl">Blog</h1>
          <p className="mt-3 max-w-xl text-yellow-foreground/80">
            Najnowsze wpisy, case studies i przemyślenia zespołu 3pix.
          </p>
        </div>
      </section>

      <section className="flex-1 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl border-2 border-ink bg-muted" />
              ))}
            </div>
          ) : published.length === 0 ? (
            <p className="text-muted-foreground">Brak wpisów. Wróć wkrótce!</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {published.map((post) => (
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
