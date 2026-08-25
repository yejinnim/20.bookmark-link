import type { Bookmark } from "@/app/_lib/types";
import BookmarkCard from "@/components/BookmarkCard";

type BookmarkGridProps = {
  bookmarks: Bookmark[];
};

export default function BookmarkGrid({ bookmarks }: BookmarkGridProps) {
  if (bookmarks.length === 0) {
    return (
      <p className="px-6 py-16 text-center text-sm text-[var(--text-sub)]">
        저장된 링크가 없습니다.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
