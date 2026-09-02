"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Folder } from "@/app/_lib/types";
import { createClient } from "@/utils/supabase/client";
import { useBookmarks } from "@/app/_lib/bookmarks-context";
import { useFolders } from "@/app/_lib/folders-context";
import { useSidebar } from "@/app/_lib/sidebar-context";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import EditFolderModal from "@/components/EditFolderModal";
import FolderList from "@/components/FolderList";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  const { folders, removeFolder, renameFolder } = useFolders();
  const { bookmarks, removeBookmarksInFolder } = useBookmarks();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  // 모바일에서 페이지를 이동하면 드로어를 닫는다.
  useEffect(() => {
    close();
  }, [pathname, close]);

  const pendingDeleteLinkCount = folderPendingDelete
    ? bookmarks.filter(
        (bookmark) => bookmark.folderId === folderPendingDelete.id
      ).length
    : 0;

  const handleConfirmDelete = async (deleteLinks: boolean) => {
    if (!folderPendingDelete) return;
    const folderId = folderPendingDelete.id;
    setFolderPendingDelete(null);

    // 폴더보다 링크를 먼저 지운다. 폴더가 먼저 삭제되면 링크의 folder_id가
    // 비워져(ON DELETE SET NULL) folder_id로 링크를 찾을 수 없다.
    if (deleteLinks) {
      await removeBookmarksInFolder(folderId);
    }
    await removeFolder(folderId);
  };

  const handleSaveEdit = (name: string) => {
    if (!folderPendingEdit) return;
    renameFolder(folderPendingEdit.id, name);
    setFolderPendingEdit(null);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {/* 모바일 드로어 배경 */}
      <div
        role="presentation"
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/40 md:hidden ${
          isOpen ? "" : "hidden"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-[var(--divider)] bg-[var(--background)] transition-transform duration-300 ease-in-out md:static md:z-auto md:w-56 md:translate-x-0 md:transition-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5 md:hidden">
          <span className="text-[15px] font-semibold text-[var(--text)]">
            메뉴
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="메뉴 닫기"
            className="list-hover flex h-9 w-9 items-center justify-center rounded-lg text-[16px] leading-none text-[var(--text)]"
          >
            <span aria-hidden>✕</span>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
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
        </div>

        <div className="shrink-0 border-t border-[var(--divider)] p-5">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="list-hover flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-sub)] disabled:opacity-50"
          >
            <span
              aria-hidden
              className="flex h-4 w-4 items-center justify-center text-sm leading-none"
            >
              ↩
            </span>
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </button>

          <Link
            href="/privacy"
            className="link-hover mt-1 flex w-full items-center px-3 py-1 text-left text-xs text-[var(--text-sub)]"
          >
            개인정보 처리방침
          </Link>
        </div>
      </aside>

      <EditFolderModal
        folder={folderPendingEdit}
        onCancel={() => setFolderPendingEdit(null)}
        onSave={handleSaveEdit}
      />

      <DeleteFolderModal
        key={folderPendingDelete?.id ?? "closed"}
        folder={folderPendingDelete}
        linkCount={pendingDeleteLinkCount}
        onCancel={() => setFolderPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
