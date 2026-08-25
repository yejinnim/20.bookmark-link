import Link from "next/link";
import type { Folder } from "@/app/_lib/types";

type FolderListProps = {
  folders: Folder[];
};

export default function FolderList({ folders }: FolderListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <li key={folder.id}>
          <Link
            href={`/folder/${folder.id}`}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-black/[.04] dark:hover:bg-white/[.08]"
          >
            <span className="flex items-center gap-2">
              <span aria-hidden>📁</span>
              {folder.name}
            </span>
            <span className="text-xs text-foreground/40">{folder.count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
