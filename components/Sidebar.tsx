import Link from "next/link";
import type { Folder } from "@/app/_lib/types";
import FolderList from "@/components/FolderList";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <aside className="flex w-56 shrink-0 flex-col gap-5 border-r border-[var(--divider)] p-5">
      <Link
        href="/"
        className="list-hover flex w-full items-center gap-2 rounded-lg bg-[var(--hover-bg)] px-3 py-2 text-left text-sm font-medium text-[var(--text)]"
      >
        <span aria-hidden>🗂️</span>
        ALL
      </Link>

      <FolderList folders={folders} />
    </aside>
  );
}
