import type { Folder } from "@/app/_lib/types";

type FolderSelectProps = {
  folders: Folder[];
  value: string;
  onChange: (folderId: string) => void;
};

export default function FolderSelect({
  folders,
  value,
  onChange,
}: FolderSelectProps) {
  return (
    <select
      id="folder"
      name="folder"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-focus select-arrow w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)]"
    >
      <option value="">폴더 선택 안 함</option>
      {folders.map((folder) => (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      ))}
    </select>
  );
}
