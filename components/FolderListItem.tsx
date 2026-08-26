import Link from "next/link";
import type { Folder } from "@/app/_lib/types";

type FolderListItemProps = {
  folder: Folder;
  onDeleteClick: (folder: Folder) => void;
};

export default function FolderListItem({
  folder,
  onDeleteClick,
}: FolderListItemProps) {
  return (
    <li className="list-hover group flex items-center justify-between gap-1 rounded-lg px-3 py-2">
      <Link
        href={`/folder/${folder.id}`}
        className="flex min-w-0 flex-1 items-center gap-2 text-sm text-[var(--text)]"
      >
        <span aria-hidden>📁</span>
        <span className="truncate">{folder.name}</span>
      </Link>

      <div className="flex w-5 shrink-0 items-center justify-center">
        <span className="text-xs text-[var(--text-sub)] group-hover:hidden">
          {folder.count}
        </span>
        <button
          type="button"
          onClick={() => onDeleteClick(folder)}
          aria-label={`${folder.name} 폴더 삭제`}
          className="hidden items-center justify-center text-[var(--text-sub)] transition-colors hover:text-[var(--error)] group-hover:flex"
        >
          <span aria-hidden>🗑️</span>
        </button>
      </div>
    </li>
  );
}
