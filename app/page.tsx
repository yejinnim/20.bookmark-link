import type { Metadata } from "next";
import BookmarkGrid from "@/components/BookmarkGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "홈",
  description: "저장한 북마크를 폴더별로 확인하세요.",
};

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <BookmarkGrid />
        </main>
      </div>
    </div>
  );
}
