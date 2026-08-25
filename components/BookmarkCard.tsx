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
      className="card-hover flex flex-col gap-3 rounded-xl bg-[var(--card-bg)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--hover-bg)] text-sm font-semibold text-[var(--text)]">
          {bookmark.title.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--text)]">
            {bookmark.title}
          </p>
          <p className="truncate text-xs text-[var(--text-sub)]">
            {bookmark.url}
          </p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
        {bookmark.description}
      </p>
    </a>
  );
}
