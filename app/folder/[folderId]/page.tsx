import { notFound } from "next/navigation";
import BookmarkGrid from "@/components/BookmarkGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { bookmarks, folders } from "../../_lib/mock-data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folder = folders.find((f) => f.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderBookmarks = bookmarks.filter((b) => b.folderId === folderId);

  return (
    <div className="flex h-full flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 px-6 pt-8">
            <span aria-hidden>📁</span>
            <h1 className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
              {folder.name}
            </h1>
          </div>
          <BookmarkGrid bookmarks={folderBookmarks} />
        </main>
      </div>
    </div>
  );
}
