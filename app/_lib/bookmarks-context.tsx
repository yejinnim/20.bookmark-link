"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Bookmark } from "@/app/_lib/types";
import { bookmarks as initialBookmarks } from "@/app/_lib/mock-data";
import { useFolders } from "@/app/_lib/folders-context";

type NewBookmarkInput = {
  title: string;
  url: string;
  description: string;
  folderId: string;
  thumbnail?: string | null;
};

type BookmarkUpdateInput = {
  title: string;
  description: string;
  folderId: string;
};

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, input: BookmarkUpdateInput) => void;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const { incrementFolderCount, decrementFolderCount } = useFolders();

  const addBookmark = useCallback(
    (input: NewBookmarkInput) => {
      const newBookmark: Bookmark = {
        id: `bookmark-${Date.now()}`,
        title: input.title,
        url: input.url,
        description: input.description,
        folderId: input.folderId,
        thumbnail: input.thumbnail ?? null,
      };

      setBookmarks((prev) => [newBookmark, ...prev]);

      if (input.folderId) {
        incrementFolderCount(input.folderId);
      }
    },
    [incrementFolderCount]
  );

  const removeBookmark = useCallback(
    (id: string) => {
      const target = bookmarks.find((bookmark) => bookmark.id === id);

      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));

      if (target?.folderId) {
        decrementFolderCount(target.folderId);
      }
    },
    [bookmarks, decrementFolderCount]
  );

  const updateBookmark = useCallback(
    (id: string, input: BookmarkUpdateInput) => {
      const target = bookmarks.find((bookmark) => bookmark.id === id);

      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === id
            ? {
                ...bookmark,
                title: input.title,
                description: input.description,
                folderId: input.folderId,
              }
            : bookmark
        )
      );

      if (target && target.folderId !== input.folderId) {
        if (target.folderId) decrementFolderCount(target.folderId);
        if (input.folderId) incrementFolderCount(input.folderId);
      }
    },
    [bookmarks, incrementFolderCount, decrementFolderCount]
  );

  const value = useMemo(
    () => ({ bookmarks, addBookmark, removeBookmark, updateBookmark }),
    [bookmarks, addBookmark, removeBookmark, updateBookmark]
  );

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks는 BookmarksProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
