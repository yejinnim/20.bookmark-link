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

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => void;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const { incrementFolderCount } = useFolders();

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

  const value = useMemo(
    () => ({ bookmarks, addBookmark }),
    [bookmarks, addBookmark]
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
