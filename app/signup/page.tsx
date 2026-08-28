import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
            🔖 북마크 링크
          </span>
          <p className="text-sm text-[var(--text-sub)]">
            계정을 만들고 시작해보세요
          </p>
        </div>

        <form className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요"
              className="input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password-confirm"
              className="text-sm font-medium text-[var(--text)]"
            >
              비밀번호 확인
            </label>
            <input
              id="password-confirm"
              name="password-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="비밀번호를 다시 입력하세요"
              className="input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>

          <button
            type="submit"
            className="btn-primary mt-2 flex items-center justify-center rounded-[980px] bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white"
          >
            회원가입
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="link-hover font-medium text-[var(--accent)]"
          >
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
