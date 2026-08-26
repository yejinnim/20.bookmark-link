"use client";

import { useState } from "react";
import type { Folder } from "@/app/_lib/types";

type EditFolderModalProps = {
  folder: Folder | null;
  onCancel: () => void;
  onSave: (name: string) => void;
};

export default function EditFolderModal({
  folder,
  onCancel,
  onSave,
}: EditFolderModalProps) {
  if (!folder) return null;

  // 폴더가 바뀔 때마다 입력값을 새로 초기화하기 위해 id를 key로 사용해 리마운트한다.
  return (
    <EditFolderDialog
      key={folder.id}
      folder={folder}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
}

type EditFolderDialogProps = {
  folder: Folder;
  onCancel: () => void;
  onSave: (name: string) => void;
};

function EditFolderDialog({ folder, onCancel, onSave }: EditFolderDialogProps) {
  const [name, setName] = useState(folder.name);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    onSave(trimmed);
  };

  return (
    <div
      role="presentation"
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-folder-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-[var(--card-bg)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <h2
          id="edit-folder-title"
          className="text-lg font-semibold tracking-[-0.3px] text-[var(--text)]"
        >
          폴더 이름 수정
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-folder-name"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더 이름
            </label>
            <input
              id="edit-folder-name"
              name="edit-folder-name"
              type="text"
              autoFocus
              required
              placeholder="폴더 이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="link-hover px-4 py-2.5 text-[15px] font-medium text-[var(--accent)]"
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center justify-center rounded-[980px] bg-[var(--accent)] px-6 py-2.5 text-[15px] font-medium text-white"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
