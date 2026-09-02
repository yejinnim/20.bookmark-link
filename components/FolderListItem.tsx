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
        <span
          aria-hidden
          className="flex h-4 w-4 items-center justify-center text-sm leading-none"
        >
          📁
        </span>
        <span className="truncate">{folder.name}</span>
      </Link>

      <div className="flex shrink-0 items-center justify-end gap-1 md:w-10">
        <span className="hidden text-xs text-[var(--text-sub)] md:inline md:group-hover:hidden">
          {folder.count}
        </span>
        <div className="flex items-center gap-1 md:hidden md:group-hover:flex">
          <button
            type="button"
            onClick={() => onEditClick(folder)}
            aria-label={`${folder.name} 폴더 수정`}
            className="flex items-center justify-center text-[var(--text-sub)] transition-colors hover:text-[var(--accent)]"
          >
            <span
              aria-hidden
              className="flex h-4 w-4 items-center justify-center text-sm leading-none"
            >
              ✏️
            </span>
          </button>
          <button
            type="button"
            onClick={() => onDeleteClick(folder)}
            aria-label={`${folder.name} 폴더 삭제`}
            className="flex items-center justify-center text-[var(--text-sub)] transition-colors hover:text-[var(--error)]"
          >
            <span
              aria-hidden
              className="flex h-4 w-4 items-center justify-center text-sm leading-none"
            >
              🗑️
            </span>
          </button>
        </div>
      </div>
    </li>
  );
}
