"use client";

import { useState } from "react";
import { useFolders } from "@/app/_lib/folders-context";

type NewFolderModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewFolderModal({ open, onClose }: NewFolderModalProps) {
  const { addFolder, isAddingFolder } = useFolders();
  const [name, setName] = useState("");

  if (!open) return null;

  const handleClose = () => {
    if (isAddingFolder) return;
    setName("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || isAddingFolder) return;

    await addFolder(trimmed);
    setName("");
    onClose();
  };

  return (
    <div
      role="presentation"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-folder-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-[var(--card-bg)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <h2
          id="new-folder-title"
          className="text-lg font-semibold tracking-[-0.3px] text-[var(--text)]"
        >
          새 폴더 만들기
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="folder-name"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더 이름
            </label>
            <input
              id="folder-name"
              name="folder-name"
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
              onClick={handleClose}
              disabled={isAddingFolder}
              className="link-hover px-4 py-2.5 text-[15px] font-medium text-[var(--accent)] disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isAddingFolder}
              className="btn-primary flex items-center justify-center rounded-[980px] bg-[var(--accent)] px-6 py-2.5 text-[15px] font-medium text-white disabled:opacity-60"
            >
              {isAddingFolder ? "저장 중…" : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
