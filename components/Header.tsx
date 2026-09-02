"use client";

import Link from "next/link";
import { useState } from "react";
import NewFolderModal from "@/components/NewFolderModal";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  return (
    <header className="nav-bar flex h-14 shrink-0 items-center justify-between px-6">
      <Link
        href="/"
        className="text-[17px] font-semibold tracking-[-0.3px] text-[var(--text)]"
      >
        🔖 북마크 링크
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <button
          type="button"
          onClick={() => setIsFolderModalOpen(true)}
          className="list-hover flex items-center gap-1.5 rounded-[980px] border border-[var(--border)] px-6 py-2.5 text-[15px] font-medium text-[var(--text)]"
        >
          <span aria-hidden>+</span>
          새 폴더
        </button>

        <Link
          href="/new"
          className="btn-primary flex items-center gap-1.5 rounded-[980px] bg-[var(--accent)] px-6 py-2.5 text-[15px] font-medium text-white"
        >
          <span aria-hidden>+</span>
          새 링크
        </Link>
      </div>

      <NewFolderModal
        open={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
      />
    </header>
  );
}
