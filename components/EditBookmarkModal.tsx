"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/folders-context";
import FolderSelect from "@/components/FolderSelect";

type BookmarkEditInput = {
  title: string;
  description: string;
  folderId: string;
};

type EditBookmarkModalProps = {
  bookmark: Bookmark | null;
  onCancel: () => void;
  onSave: (input: BookmarkEditInput) => void;
};

export default function EditBookmarkModal({
  bookmark,
  onCancel,
  onSave,
}: EditBookmarkModalProps) {
  if (!bookmark) return null;

  // 대상 링크가 바뀔 때마다 입력값을 새로 초기화하기 위해 id를 key로 리마운트한다.
  return (
    <EditBookmarkDialog
      key={bookmark.id}
      bookmark={bookmark}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
}

type EditBookmarkDialogProps = {
  bookmark: Bookmark;
  onCancel: () => void;
  onSave: (input: BookmarkEditInput) => void;
};

function EditBookmarkDialog({
  bookmark,
  onCancel,
  onSave,
}: EditBookmarkDialogProps) {
  const { folders } = useFolders();
  const [folderId, setFolderId] = useState(bookmark.folderId);
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onSave({ title: trimmedTitle, description: description.trim(), folderId });
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
        aria-labelledby="edit-bookmark-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl bg-[var(--card-bg)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <h2
          id="edit-bookmark-title"
          className="text-lg font-semibold tracking-[-0.3px] text-[var(--text)]"
        >
          링크 정보 수정
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
              폴더
            </label>
            <FolderSelect
              folders={folders}
              value={folderId}
              onChange={setFolderId}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-bookmark-name"
              className="text-sm font-medium text-[var(--text)]"
            >
              제목
            </label>
            <input
              id="edit-bookmark-name"
              name="edit-bookmark-name"
              type="text"
              autoFocus
              required
              placeholder="링크 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-bookmark-description"
              className="text-sm font-medium text-[var(--text)]"
            >
              설명
            </label>
            <textarea
              id="edit-bookmark-description"
              name="edit-bookmark-description"
              rows={3}
              placeholder="링크 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-focus w-full resize-none rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
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
