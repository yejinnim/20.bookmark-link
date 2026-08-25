import Link from "next/link";

export default function Header() {
  return (
    <header className="nav-bar flex h-14 shrink-0 items-center justify-between px-6">
      <Link
        href="/"
        className="text-[17px] font-semibold tracking-[-0.3px] text-[var(--text)]"
      >
        🔖 북마크 링크
      </Link>

      <Link
        href="/new"
        className="btn-primary flex items-center gap-1.5 rounded-[980px] bg-[var(--accent)] px-6 py-2.5 text-[15px] font-medium text-white"
      >
        <span aria-hidden>+</span>
        새 링크
      </Link>
    </header>
  );
}
