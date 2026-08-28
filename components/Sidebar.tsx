"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Folder } from "@/app/_lib/types";
import { useBookmarks } from "@/app/_lib/bookmarks-context";
import { useFolders } from "@/app/_lib/folders-context";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import EditFolderModal from "@/components/EditFolderModal";
import FolderList from "@/components/FolderList";

export default function Sidebar() {
  const { folders, removeFolder, renameFolder } = useFolders();
  const { bookmarks } = useBookmarks();
  const [folderPendingEdit, setFolderPendingEdit] = useState<Folder | null>(
    null
  );

  const foldersWithCount = useMemo(() => {
    const counts = new Map<string, number>();
    for (const bookmark of bookmarks) {
      if (!bookmark.folderId) continue;
      counts.set(bookmark.folderId, (counts.get(bookmark.folderId) ?? 0) + 1);
    }
    return folders.map((folder) => ({
      ...folder,
      count: counts.get(folder.id) ?? 0,
    }));
  }, [folders, bookmarks]);
  const [folderPendingDelete, setFolderPendingDelete] =
    useState<Folder | null>(null);

  const handleConfirmDelete = () => {
    if (!folderPendingDelete) return;
    removeFolder(folderPendingDelete.id);
    setFolderPendingDelete(null);
  };

  const handleSaveEdit = (name: string) => {
    if (!folderPendingEdit) return;
    renameFolder(folderPendingEdit.id, name);
    setFolderPendingEdit(null);
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-5 border-r border-[var(--divider)] p-5">
      <Link
        href="/"
        className="list-hover flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text)]"
      >
        <span
          aria-hidden
          className="flex h-4 w-4 items-center justify-center text-sm leading-none"
        >
          🗂️
        </span>
        ALL
      </Link>

      <FolderList
        folders={foldersWithCount}
        onEditClick={setFolderPendingEdit}
        onDeleteClick={setFolderPendingDelete}
      />

      <EditFolderModal
        folder={folderPendingEdit}
        onCancel={() => setFolderPendingEdit(null)}
        onSave={handleSaveEdit}
      />

      <DeleteFolderModal
        folder={folderPendingDelete}
        onCancel={() => setFolderPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </aside>
  );
}
