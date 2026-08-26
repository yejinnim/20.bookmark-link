"use client";

import type { Bookmark } from "@/app/_lib/types";

type DeleteBookmarkModalProps = {
  bookmark: Bookmark | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteBookmarkModal({
  bookmark,
  onCancel,
  onConfirm,
}: DeleteBookmarkModalProps) {
  if (!bookmark) return null;

  return (
    <div
      role="presentation"
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-bookmark-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-[var(--card-bg)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <h2
          id="delete-bookmark-title"
          className="text-lg font-semibold tracking-[-0.3px] text-[var(--text)]"
        >
          링크를 삭제할까요?
        </h2>
        <p className="mt-2 text-sm text-[var(--text-sub)]">
          {`'${bookmark.title}' 링크를 삭제하면 되돌릴 수 없습니다.`}
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="link-hover px-4 py-2.5 text-[15px] font-medium text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger flex items-center justify-center rounded-[980px] bg-[var(--error)] px-6 py-2.5 text-[15px] font-medium text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
