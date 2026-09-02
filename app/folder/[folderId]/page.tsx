"use client";

import { useParams } from "next/navigation";
import { useFolders } from "@/app/_lib/folders-context";
import BookmarkGrid from "@/components/BookmarkGrid";
import FolderNotFound from "@/components/FolderNotFound";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders } = useFolders();
  const folder = folders.find((f) => f.id === folderId);

  return (
    <div className="flex h-dvh flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          {folder ? (
            <>
              <div className="flex items-center gap-2 px-4 pt-8 sm:px-6">
                <span aria-hidden>📁</span>
                <h1 className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
                  {folder.name}
                </h1>
              </div>
              <BookmarkGrid folderId={folderId} />
            </>
          ) : (
            <FolderNotFound />
          )}
        </main>
      </div>
    </div>
  );
}
