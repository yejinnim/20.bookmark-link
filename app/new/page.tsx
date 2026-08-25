import Header from "@/components/Header";
import NewLinkForm from "@/components/NewLinkForm";
import Sidebar from "@/components/Sidebar";
import { folders } from "../_lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex h-full flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} />

        <main className="flex flex-1 items-center justify-center overflow-y-auto p-6">
          <div className="flex w-full max-w-md flex-col items-center gap-6">
            <h1 className="text-xl font-semibold text-foreground">
              새 링크 추가
            </h1>
            <NewLinkForm folders={folders} />
          </div>
        </main>
      </div>
    </div>
  );
}
