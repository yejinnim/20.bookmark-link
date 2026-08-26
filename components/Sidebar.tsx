"use client";

import Link from "next/link";
import { useState } from "react";
import type { Folder } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/folders-context";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import FolderList from "@/components/FolderList";

export default function Sidebar() {
  const { folders, removeFolder } = useFolders();
  const [folderPendingDelete, setFolderPendingDelete] =
    useState<Folder | null>(null);

  const handleConfirmDelete = () => {
    if (!folderPendingDelete) return;
    removeFolder(folderPendingDelete.id);
    setFolderPendingDelete(null);
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-5 border-r border-[var(--divider)] p-5">
      <Link
        href="/"
        className="list-hover flex w-full items-center gap-2 rounded-lg bg-[var(--hover-bg)] px-3 py-2 text-left text-sm font-medium text-[var(--text)]"
      >
        <span aria-hidden>🗂️</span>
        ALL
      </Link>

      <FolderList folders={folders} onDeleteClick={setFolderPendingDelete} />

      <DeleteFolderModal
        folder={folderPendingDelete}
        onCancel={() => setFolderPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </aside>
  );
}
