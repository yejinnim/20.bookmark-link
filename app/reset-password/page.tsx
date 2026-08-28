import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
            🔖 북마크 링크
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
