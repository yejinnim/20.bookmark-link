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
import type { Folder } from "@/app/_lib/types";
import { useAuthUserId } from "@/app/_lib/use-auth-user-id";
import { createClient } from "@/utils/supabase/client";

type FoldersContextValue = {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
  incrementFolderCount: (id: string) => void;
  decrementFolderCount: (id: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

type FolderRow = {
  id: number;
  name: string;
  created_at: string;
};

const toFolder = (row: FolderRow): Folder => ({
  id: String(row.id),
  name: row.name,
  count: 0,
});

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const addingRef = useRef(false);
  const supabase = useMemo(() => createClient(), []);
  const userId = useAuthUserId(supabase);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!userId) {
        if (active) setFolders([]);
        return;
      }

      const { data, error } = await supabase
        .from("folders")
        .select("id, name, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      if (!active || error || !data) return;
      setFolders((data as FolderRow[]).map(toFolder));
    };

    load();

    return () => {
      active = false;
    };
  }, [supabase, userId]);

  const addFolder = useCallback(
    async (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      if (addingRef.current) return;

      addingRef.current = true;
      setIsAddingFolder(true);

      try {
        const { data, error } = await supabase
          .from("folders")
          .insert({ name: trimmed })
          .select("id, name, created_at")
          .single();

        if (error || !data) return;

        setFolders((prev) => [...prev, toFolder(data as FolderRow)]);
      } finally {
        addingRef.current = false;
        setIsAddingFolder(false);
      }
    },
    [supabase]
  );

  const removeFolder = useCallback(
    async (id: string) => {
      const { error } = await supabase
        .from("folders")
        .delete()
        .eq("id", Number(id));

      if (error) return;

      setFolders((prev) => prev.filter((folder) => folder.id !== id));
    },
    [supabase]
  );

  const renameFolder = useCallback(
    async (id: string, name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      const { error } = await supabase
        .from("folders")
        .update({ name: trimmed })
        .eq("id", Number(id));

      if (error) return;

      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === id ? { ...folder, name: trimmed } : folder
        )
      );
    },
    [supabase]
  );

  const incrementFolderCount = useCallback((id: string) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, count: folder.count + 1 } : folder
      )
    );
  }, []);

  const decrementFolderCount = useCallback((id: string) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id
          ? { ...folder, count: Math.max(0, folder.count - 1) }
          : folder
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      folders,
      isAddingFolder,
      addFolder,
      removeFolder,
      renameFolder,
      incrementFolderCount,
      decrementFolderCount,
    }),
    [
      folders,
      isAddingFolder,
      addFolder,
      removeFolder,
      renameFolder,
      incrementFolderCount,
      decrementFolderCount,
    ]
  );

  return (
    <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders는 FoldersProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
