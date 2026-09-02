import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
  description: "이메일 또는 카카오 계정으로 로그인하고 북마크를 관리하세요.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
            🔖 춘천 마임축제 북마크링크
          </span>
          <p className="text-sm text-[var(--text-sub)]">
            로그인하고 링크를 정리해보세요
          </p>
        </div>

        <LoginForm />

        <div className="flex flex-col items-center gap-2 text-center text-sm text-[var(--text-sub)]">
          <Link
            href="/forgot-password"
            className="link-hover font-medium text-[var(--accent)]"
          >
            비밀번호를 잊으셨나요?
          </Link>
          <p>
            아직 계정이 없으신가요?{" "}
            <Link
              href="/signup"
              className="link-hover font-medium text-[var(--accent)]"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
