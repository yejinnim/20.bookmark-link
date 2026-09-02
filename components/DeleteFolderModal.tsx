"use client";

import { useState } from "react";
import type { Folder } from "@/app/_lib/types";

type DeleteFolderModalProps = {
  folder: Folder | null;
  linkCount: number;
  onCancel: () => void;
  onConfirm: (deleteLinks: boolean) => void;
};

export default function DeleteFolderModal({
  folder,
  linkCount,
  onCancel,
  onConfirm,
}: DeleteFolderModalProps) {
  const [deleteLinks, setDeleteLinks] = useState(false);

  if (!folder) return null;

  const hasLinks = linkCount > 0;

  return (
    <div
      role="presentation"
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-folder-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-[var(--card-bg)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <h2
          id="delete-folder-title"
          className="text-lg font-semibold tracking-[-0.3px] text-[var(--text)]"
        >
          폴더를 삭제할까요?
        </h2>
        <p className="mt-2 text-sm text-[var(--text-sub)]">
          {`'${folder.name}' 폴더를 삭제하면 되돌릴 수 없습니다.`}
        </p>

        {hasLinks ? (
          <label className="mt-4 flex items-start gap-2.5 rounded-[10px] border border-[var(--border)] p-3 text-sm text-[var(--text)]">
            <input
              type="checkbox"
              checked={deleteLinks}
              onChange={(e) => setDeleteLinks(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--error)]"
            />
            <span>
              이 폴더에 담긴 링크 {linkCount}개도 함께 삭제
              <span className="mt-0.5 block text-xs text-[var(--text-sub)]">
                선택하지 않으면 링크는 유지되고 폴더에서만 분리됩니다.
              </span>
            </span>
          </label>
        ) : null}

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
            onClick={() => onConfirm(deleteLinks)}
            className="btn-danger flex items-center justify-center rounded-[980px] bg-[var(--error)] px-6 py-2.5 text-[15px] font-medium text-white"
          >
            {hasLinks && deleteLinks ? "폴더·링크 삭제" : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}
