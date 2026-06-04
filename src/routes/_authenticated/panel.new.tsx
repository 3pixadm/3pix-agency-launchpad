import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PostEditor } from "@/components/PostEditor";

export const Route = createFileRoute("/_authenticated/panel/new")({
  component: NewPostPage,
});

function NewPostPage() {
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
          <h1 className="mb-6 text-3xl font-bold">Nowy wpis</h1>
          <PostEditor />
        </div>
      </section>
      <Footer />
    </div>
  );
}
