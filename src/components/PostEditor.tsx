import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  COVER_COLORS,
  createPost,
  updatePost,
  type BlogPost,
} from "@/lib/posts";

interface Props {
  post?: BlogPost;
}

export function PostEditor({ post }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tag, setTag] = useState(post?.tag ?? "");
  const [coverColor, setCoverColor] = useState(post?.cover_color ?? "coral");
  const [published, setPublished] = useState(post?.published ?? true);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        excerpt: excerpt.trim() || null,
        content,
        tag: tag.trim() || null,
        cover_color: coverColor,
        published,
      };
      if (isEdit && post) {
        await updatePost(post.id, payload);
        toast.success("Wpis zaktualizowany!");
      } else {
        await createPost(payload);
        toast.success("Wpis dodany!");
      }
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (post) await queryClient.invalidateQueries({ queryKey: ["post", post.id] });
      router.navigate({ to: "/panel" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nie udało się zapisać.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border-2 border-ink bg-card p-6 shadow-flat-sm"
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Tytuł</Label>
        <Input
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tytuł wpisu"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="excerpt">Zajawka</Label>
        <Textarea
          id="excerpt"
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Krótki opis widoczny na kaflu"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content">Treść</Label>
        <Textarea
          id="content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Pełna treść wpisu..."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="tag">Etykieta</Label>
          <Input
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="np. Design"
          />
        </div>
        <div className="grid gap-2">
          <Label>Kolor kafelka</Label>
          <div className="flex flex-wrap gap-2">
            {COVER_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCoverColor(c.value)}
                className={`size-9 rounded-lg border-2 border-ink ${c.className} ${
                  coverColor === c.value ? "ring-2 ring-ring ring-offset-2" : ""
                }`}
                aria-label={c.label}
                title={c.label}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border-2 border-ink bg-muted px-4 py-3">
        <div>
          <p className="font-semibold">Opublikowany</p>
          <p className="text-sm text-muted-foreground">
            Widoczny dla wszystkich na stronie.
          </p>
        </div>
        <Switch checked={published} onCheckedChange={setPublished} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" variant="hero" size="lg" disabled={saving}>
          {saving ? "Zapisywanie..." : isEdit ? "Zapisz zmiany" : "Dodaj wpis"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => router.navigate({ to: "/panel" })}
        >
          Anuluj
        </Button>
      </div>
    </form>
  );
}
