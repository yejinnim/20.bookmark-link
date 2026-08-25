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
      className="w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-black/[.2] dark:border-white/[.145] dark:focus:border-white/[.3]"
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
