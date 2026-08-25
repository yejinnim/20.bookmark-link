import type { Bookmark } from "@/app/_lib/types";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <a
      href={`https://${bookmark.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-xl border border-black/[.08] p-4 transition-colors hover:border-black/[.15] hover:bg-black/[.02] dark:border-white/[.145] dark:hover:border-white/[.25] dark:hover:bg-white/[.04]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[.06] text-sm font-semibold dark:bg-white/[.08]">
          {bookmark.title.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {bookmark.title}
          </p>
          <p className="truncate text-xs text-foreground/50">
            {bookmark.url}
          </p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-foreground/70">
        {bookmark.description}
      </p>
    </a>
  );
}
