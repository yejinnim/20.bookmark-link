import type { Bookmark } from "@/app/_lib/types";

type BookmarkCardProps = {
  bookmark: Bookmark;
  onDeleteClick: (bookmark: Bookmark) => void;
};

export default function BookmarkCard({
  bookmark,
  onDeleteClick,
}: BookmarkCardProps) {
  return (
    <div className="group relative">
      <a
        href={
          bookmark.url.startsWith("http")
            ? bookmark.url
            : `https://${bookmark.url}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex flex-col overflow-hidden rounded-xl bg-[var(--card-bg)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        {bookmark.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.thumbnail}
            alt=""
            className="h-32 w-full shrink-0 object-cover"
          />
        ) : null}

        <div className="flex flex-1 flex-col gap-3 p-6">
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
        </div>
      </a>

      <button
        type="button"
        onClick={() => onDeleteClick(bookmark)}
        aria-label={`${bookmark.title} 링크 삭제`}
        className="absolute right-3 top-3 hidden items-center justify-center rounded-full bg-[var(--card-bg)] p-1.5 text-[var(--text-sub)] shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-colors hover:text-[var(--error)] group-hover:flex"
      >
        <span aria-hidden>🗑️</span>
      </button>
    </div>
  );
}
