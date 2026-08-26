"use client";

import { useBookmarks } from "@/app/_lib/bookmarks-context";
import BookmarkCard from "@/components/BookmarkCard";

type BookmarkGridProps = {
  folderId?: string;
};

export default function BookmarkGrid({ folderId }: BookmarkGridProps) {
  const { bookmarks } = useBookmarks();
  const visibleBookmarks = folderId
    ? bookmarks.filter((bookmark) => bookmark.folderId === folderId)
    : bookmarks;

  if (visibleBookmarks.length === 0) {
    return (
      <p className="px-6 py-16 text-center text-sm text-[var(--text-sub)]">
        저장된 링크가 없습니다.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {visibleBookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
