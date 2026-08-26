"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "@/app/_lib/types";
import { folders as initialFolders } from "@/app/_lib/mock-data";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => void;
  incrementFolderCount: (id: string) => void;
  decrementFolderCount: (id: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((prev) => [
      ...prev,
      {
        id: `folder-${Date.now()}`,
        name: trimmed,
        count: 0,
      },
    ]);
  }, []);

  const removeFolder = useCallback((id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }, []);

  const renameFolder = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder
      )
    );
  }, []);

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
      addFolder,
      removeFolder,
      renameFolder,
      incrementFolderCount,
      decrementFolderCount,
    }),
    [
      folders,
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
