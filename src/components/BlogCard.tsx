import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/posts";
import { coverClass } from "@/lib/posts";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.created_at).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      to="/blog/$id"
      params={{ id: post.id }}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-flat-sm transition-transform hover:-translate-y-1"
    >
      <div className={`relative flex h-44 items-end p-5 ${coverClass(post.cover_color)}`}>
        {post.tag && (
          <span className="absolute left-5 top-5 rounded-full border-2 border-ink bg-background px-3 py-1 text-xs font-bold text-foreground">
            {post.tag}
          </span>
        )}
        <ArrowUpRight className="absolute right-5 top-5 size-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        <span className="text-sm font-semibold opacity-90">{date}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-bold leading-snug">{post.title}</h3>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        )}
        <span className="mt-auto pt-3 text-sm font-bold text-primary">
          Czytaj dalej →
        </span>
      </div>
    </Link>
  );
}
