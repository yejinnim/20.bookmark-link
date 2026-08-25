import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/[.08] px-6 dark:border-white/[.145]">
      <Link
        href="/"
        className="text-lg font-bold tracking-tight text-foreground"
      >
        🔖 북마크 링크
      </Link>

      <Link
        href="/new"
        className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        <span aria-hidden>+</span>
        새 링크
      </Link>
    </header>
  );
}
