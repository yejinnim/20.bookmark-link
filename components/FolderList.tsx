import type { Folder } from "@/app/_lib/types";
import FolderListItem from "@/components/FolderListItem";

type FolderListProps = {
  folders: Folder[];
  onEditClick: (folder: Folder) => void;
  onDeleteClick: (folder: Folder) => void;
};

export default function FolderList({
  folders,
  onEditClick,
  onDeleteClick,
}: FolderListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <FolderListItem
          key={folder.id}
          folder={folder}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </ul>
  );
}
