import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "계정을 만들고 춘천 마임축제 북마크링크를 시작해보세요.",
};

export default function SignupPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
            🔖 춘천 마임축제 북마크링크
          </span>
          <p className="text-sm text-[var(--text-sub)]">
            계정을 만들고 시작해보세요
          </p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="link-hover font-medium text-[var(--accent)]"
          >
            로그인
          </Link>
        </p>

        <Link
          href="/privacy"
          className="link-hover text-center text-xs text-[var(--text-sub)]"
        >
          개인정보 처리방침
        </Link>
      </div>
    </main>
  );
}
