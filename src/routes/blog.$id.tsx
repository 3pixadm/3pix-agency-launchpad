import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Pencil } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { fetchPost, coverClass } from "@/lib/posts";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/blog/$id")({
  component: PostPage,
});

function PostPage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const router = useRouter();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  const date = post
    ? new Date(post.created_at).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <article className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/blog">
              <ArrowLeft className="size-4" /> Wróć do bloga
            </Link>
          </Button>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-56 animate-pulse rounded-2xl bg-muted" />
            </div>
          ) : !post ? (
            <div className="rounded-2xl border-2 border-ink bg-card p-8 text-center">
              <h1 className="text-2xl font-bold">Nie znaleziono wpisu</h1>
              <p className="mt-2 text-muted-foreground">
                Ten wpis nie istnieje lub został usunięty.
              </p>
              <Button asChild variant="hero" className="mt-6">
                <Link to="/blog">Przeglądaj blog</Link>
              </Button>
            </div>
          ) : (
            <>
              <div
                className={`flex h-48 items-end rounded-2xl border-2 border-ink p-6 shadow-flat-sm ${coverClass(post.cover_color)}`}
              >
                {post.tag && (
                  <span className="rounded-full border-2 border-ink bg-background px-3 py-1 text-xs font-bold text-foreground">
                    {post.tag}
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-muted-foreground">{date}</span>
                {user && (
                  <Button
                    variant="flat"
                    size="sm"
                    onClick={() => router.navigate({ to: "/panel/$id", params: { id: post.id } })}
                  >
                    <Pencil className="size-4" /> Edytuj
                  </Button>
                )}
              </div>
              <h1 className="mt-3 text-4xl font-bold leading-tight">{post.title}</h1>
              {post.excerpt && (
                <p className="mt-4 text-xl text-muted-foreground">{post.excerpt}</p>
              )}
              <div className="mt-8 whitespace-pre-wrap text-lg leading-relaxed text-foreground">
                {post.content}
              </div>
            </>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}
