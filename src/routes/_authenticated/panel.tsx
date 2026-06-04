import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fetchPosts, deletePost, coverClass } from "@/lib/posts";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/panel")({
  component: PanelPage,
});

function PanelPage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  const queryClient = useQueryClient();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deletePost(id);
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Wpis usunięty.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nie udało się usunąć.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.navigate({ to: "/" });
  };

  const all = posts ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="border-b-2 border-ink bg-coral">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-12">
          <div>
            <h1 className="text-4xl font-bold text-coral-foreground">Panel wpisów</h1>
            <p className="mt-2 text-coral-foreground/80">
              Zalogowano jako {user?.email}
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="flatInk">
              <Link to="/panel/new">
                <Plus className="size-4" /> Nowy wpis
              </Link>
            </Button>
            <Button variant="flat" onClick={handleSignOut}>
              <LogOut className="size-4" /> Wyloguj
            </Button>
          </div>
        </div>
      </section>

      <section className="flex-1 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10">
          {isLoading ? (
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl border-2 border-ink bg-muted" />
              ))}
            </div>
          ) : all.length === 0 ? (
            <div className="rounded-2xl border-2 border-ink bg-card p-10 text-center shadow-flat-sm">
              <p className="text-lg font-semibold">Brak wpisów.</p>
              <p className="mt-1 text-muted-foreground">Dodaj swój pierwszy wpis.</p>
              <Button asChild variant="hero" className="mt-6">
                <Link to="/panel/new">
                  <Plus className="size-4" /> Nowy wpis
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {all.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border-2 border-ink bg-card p-4 shadow-flat-sm"
                >
                  <div className={`size-14 shrink-0 rounded-xl border-2 border-ink ${coverClass(post.cover_color)}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-bold">{post.title}</h3>
                      {post.published ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-secondary-foreground">
                          <Eye className="size-3" /> Publiczny
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                          <EyeOff className="size-3" /> Szkic
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="truncate text-sm text-muted-foreground">{post.excerpt}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/panel/$id" params={{ id: post.id }}>
                        <Pencil className="size-4" /> Edytuj
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" disabled={deletingId === post.id}>
                          <Trash2 className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Usunąć wpis?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tej operacji nie można cofnąć. Wpis „{post.title}" zostanie trwale usunięty.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Anuluj</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(post.id)}>
                            Usuń
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
