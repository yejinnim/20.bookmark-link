"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Bookmark } from "@/app/_lib/types";
import { createClient } from "@/utils/supabase/client";

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
  addBookmark: (input: NewBookmarkInput) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  updateBookmark: (id: string, input: BookmarkUpdateInput) => Promise<void>;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

const LINK_COLUMNS =
  "id, url, title, description, thumbnail_url, folder_id, created_at";

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  created_at: string;
};

const toBookmark = (row: LinkRow): Bookmark => ({
  id: String(row.id),
  title: row.title ?? "",
  url: row.url,
  description: row.description ?? "",
  folderId: row.folder_id == null ? "" : String(row.folder_id),
  thumbnail: row.thumbnail_url,
});

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const supabase = useMemo(() => createClient(), []);
  const addingRef = useRef(false);

  useEffect(() => {
    let active = true;

    supabase
      .from("links")
      .select(LINK_COLUMNS)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active || error || !data) return;
        setBookmarks((data as LinkRow[]).map(toBookmark));
      }, () => {});

    return () => {
      active = false;
    };
  }, [supabase]);

  const addBookmark = useCallback(
    async (input: NewBookmarkInput) => {
      if (addingRef.current) return;

      addingRef.current = true;
      try {
        const { data, error } = await supabase
          .from("links")
          .insert({
            url: input.url,
            title: input.title,
            description: input.description,
            thumbnail_url: input.thumbnail ?? null,
            folder_id: input.folderId ? Number(input.folderId) : null,
          })
          .select(LINK_COLUMNS)
          .single();

        if (error || !data) return;

        setBookmarks((prev) => [toBookmark(data as LinkRow), ...prev]);
      } finally {
        addingRef.current = false;
      }
    },
    [supabase]
  );

  const removeBookmark = useCallback(
    async (id: string) => {
      const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", Number(id));

      if (error) return;

      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    },
    [supabase]
  );

  const updateBookmark = useCallback(
    async (id: string, input: BookmarkUpdateInput) => {
      const { error } = await supabase
        .from("links")
        .update({
          title: input.title,
          description: input.description,
          folder_id: input.folderId ? Number(input.folderId) : null,
        })
        .eq("id", Number(id));

      if (error) return;

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
    },
    [supabase]
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
