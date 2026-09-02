import type { Metadata } from "next";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
  description: "새로운 비밀번호를 설정해주세요.",
};

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
            🔖 춘천 마임축제 북마크링크
          </span>
          <p className="text-sm text-[var(--text-sub)]">
            새로운 비밀번호를 설정해주세요
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </main>
  );
}
