import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
            🔖 북마크 링크
          </span>
          <p className="text-sm text-[var(--text-sub)]">
            로그인하고 링크를 정리해보세요
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-[var(--text-sub)]">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="link-hover font-medium text-[var(--accent)]"
          >
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
