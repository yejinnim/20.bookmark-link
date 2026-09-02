"use client";

import { useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // 인라인 스크립트가 파싱 시점에 data-theme을 세팅하지만,
  // 개발 모드의 Strict Mode 리마운트가 이를 초기화하므로 다시 적용한다.
  useLayoutEffect(() => {
    const current = readStoredTheme();
    setTheme(current);
    document.documentElement.dataset.theme = current;
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage 접근 불가 시 무시
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트모드로 전환" : "다크모드로 전환"}
      title={isDark ? "라이트모드로 전환" : "다크모드로 전환"}
      className="list-hover flex h-[44px] w-[44px] items-center justify-center rounded-[980px] border border-[var(--border)] text-[16px] leading-none text-[var(--text)]"
    >
      <span aria-hidden>{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
