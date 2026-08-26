import Link from "next/link";
import type { Folder } from "@/app/_lib/types";

type FolderListItemProps = {
  folder: Folder;
  onEditClick: (folder: Folder) => void;
  onDeleteClick: (folder: Folder) => void;
};

export default function FolderListItem({
  folder,
  onEditClick,
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

      <div className="flex w-10 shrink-0 items-center justify-end gap-1">
        <span className="text-xs text-[var(--text-sub)] group-hover:hidden">
          {folder.count}
        </span>
        <div className="hidden items-center gap-1 group-hover:flex">
          <button
            type="button"
            onClick={() => onEditClick(folder)}
            aria-label={`${folder.name} 폴더 수정`}
            className="flex items-center justify-center text-[var(--text-sub)] transition-colors hover:text-[var(--accent)]"
          >
            <span aria-hidden>✏️</span>
          </button>
          <button
            type="button"
            onClick={() => onDeleteClick(folder)}
            aria-label={`${folder.name} 폴더 삭제`}
            className="flex items-center justify-center text-[var(--text-sub)] transition-colors hover:text-[var(--error)]"
          >
            <span aria-hidden>🗑️</span>
          </button>
        </div>
      </div>
    </li>
  );
}
