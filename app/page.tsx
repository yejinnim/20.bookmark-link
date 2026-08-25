import BookmarkGrid from "@/components/BookmarkGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { bookmarks, folders } from "./_lib/mock-data";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} />

        <main className="flex-1 overflow-y-auto">
          <BookmarkGrid bookmarks={bookmarks} />
        </main>
      </div>
    </div>
  );
}
