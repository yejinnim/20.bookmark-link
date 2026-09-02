"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_lib/types";
import { useBookmarks } from "@/app/_lib/bookmarks-context";
import BookmarkCard from "@/components/BookmarkCard";
import DeleteBookmarkModal from "@/components/DeleteBookmarkModal";
import EditBookmarkModal from "@/components/EditBookmarkModal";

type BookmarkGridProps = {
  folderId?: string;
};

export default function BookmarkGrid({ folderId }: BookmarkGridProps) {
  const { bookmarks, removeBookmark, updateBookmark } = useBookmarks();
  const [bookmarkPendingEdit, setBookmarkPendingEdit] =
    useState<Bookmark | null>(null);
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

  const handleSaveEdit = (input: {
    title: string;
    description: string;
    folderId: string;
  }) => {
    if (!bookmarkPendingEdit) return;
    updateBookmark(bookmarkPendingEdit.id, input);
    setBookmarkPendingEdit(null);
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
      <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
        {visibleBookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onEditClick={setBookmarkPendingEdit}
            onDeleteClick={setBookmarkPendingDelete}
          />
        ))}
      </div>

      <EditBookmarkModal
        bookmark={bookmarkPendingEdit}
        onCancel={() => setBookmarkPendingEdit(null)}
        onSave={handleSaveEdit}
      />

      <DeleteBookmarkModal
        bookmark={bookmarkPendingDelete}
        onCancel={() => setBookmarkPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
