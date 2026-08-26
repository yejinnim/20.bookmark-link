"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_lib/types";
import { useBookmarks } from "@/app/_lib/bookmarks-context";
import BookmarkCard from "@/components/BookmarkCard";
import DeleteBookmarkModal from "@/components/DeleteBookmarkModal";

type BookmarkGridProps = {
  folderId?: string;
};

export default function BookmarkGrid({ folderId }: BookmarkGridProps) {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [bookmarkPendingDelete, setBookmarkPendingDelete] =
    useState<Bookmark | null>(null);

  const visibleBookmarks = folderId
    ? bookmarks.filter((bookmark) => bookmark.folderId === folderId)
    : bookmarks;

  const handleConfirmDelete = () => {
    if (!bookmarkPendingDelete) return;
    removeBookmark(bookmarkPendingDelete.id);
    setBookmarkPendingDelete(null);
  };

  if (visibleBookmarks.length === 0) {
    return (
      <p className="px-6 py-16 text-center text-sm text-[var(--text-sub)]">
        저장된 링크가 없습니다.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleBookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDeleteClick={setBookmarkPendingDelete}
          />
        ))}
      </div>

      <DeleteBookmarkModal
        bookmark={bookmarkPendingDelete}
        onCancel={() => setBookmarkPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
