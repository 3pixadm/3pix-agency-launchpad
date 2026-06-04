import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PostEditor } from "@/components/PostEditor";
import { fetchPost } from "@/lib/posts";

export const Route = createFileRoute("/_authenticated/panel/$id")({
  component: EditPostPage,
});

function EditPostPage() {
  const { id } = Route.useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/panel">
              <ArrowLeft className="size-4" /> Wróć do panelu
            </Link>
          </Button>
          <h1 className="mb-6 text-3xl font-bold">Edytuj wpis</h1>
          {isLoading ? (
            <div className="h-96 animate-pulse rounded-2xl border-2 border-ink bg-muted" />
          ) : !post ? (
            <p className="text-muted-foreground">Nie znaleziono wpisu.</p>
          ) : (
            <PostEditor post={post} />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
