"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSidebar } from "@/app/_lib/sidebar-context";
import NewFolderModal from "@/components/NewFolderModal";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const { open } = useSidebar();

  return (
    <header className="nav-bar relative flex h-14 shrink-0 items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
      <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <Image
          src="/mime-logo.png"
          alt="춘천 마임축제"
          width={713}
          height={241}
          priority
          className="h-7 w-auto"
        />
      </span>

      <div className="flex min-w-0 items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={open}
          aria-label="메뉴 열기"
          className="list-hover flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[18px] leading-none text-[var(--text)] md:hidden"
        >
          <span aria-hidden>☰</span>
        </button>

        <Link
          href="/"
          className="truncate text-[15px] font-semibold tracking-[-0.3px] text-[var(--text)] sm:text-[17px]"
        >
          🔖 춘천 마임축제 북마크링크
        </Link>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <ThemeToggle />

        <button
          type="button"
          onClick={() => setIsFolderModalOpen(true)}
          aria-label="새 폴더 만들기"
          className="list-hover flex items-center gap-1.5 rounded-[980px] border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--text)] sm:px-6 sm:py-2.5 sm:text-[15px]"
        >
          <span aria-hidden>+</span>
          <span className="hidden sm:inline">새 폴더</span>
        </button>

        <Link
          href="/new"
          aria-label="새 링크 추가"
          className="btn-primary flex items-center gap-1.5 rounded-[980px] bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white sm:px-6 sm:py-2.5 sm:text-[15px]"
        >
          <span aria-hidden>+</span>
          <span>새 링크</span>
        </Link>
      </div>

      <NewFolderModal
        open={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
      />
    </header>
  );
}
