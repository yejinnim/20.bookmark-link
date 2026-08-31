import type { Metadata } from "next";
import Header from "@/components/Header";
import NewLinkForm from "@/components/NewLinkForm";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "새 링크 추가",
  description: "새로운 링크를 폴더에 저장하세요.",
};

export default function NewLinkPage() {
  return (
    <div className="flex h-full flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex flex-1 items-center justify-center overflow-y-auto p-6">
          <div className="flex w-full max-w-md flex-col items-center gap-6">
            <h1 className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
              새 링크 추가
            </h1>
            <NewLinkForm />
          </div>
        </main>
      </div>
    </div>
  );
}
