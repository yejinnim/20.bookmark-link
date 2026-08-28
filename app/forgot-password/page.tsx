import Link from "next/link";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
            🔖 북마크 링크
          </span>
          <p className="text-sm text-[var(--text-sub)]">
            가입한 이메일로 재설정 링크를 보내드려요
          </p>
        </div>

        <ForgotPasswordForm />

        <p className="text-center text-sm text-[var(--text-sub)]">
          <Link
            href="/login"
            className="link-hover font-medium text-[var(--accent)]"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </main>
  );
}
