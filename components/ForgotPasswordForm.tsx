"use client";

import { useRef, useState } from "react";
import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

const inputClassName =
  "input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] disabled:opacity-50";

type ToastState = { message: string; variant: "error" | "success" };

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const submittingRef = useRef(false);

  const canSubmit = email.trim() !== "" && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submittingRef.current) return;

    submittingRef.current = true;
    setToast(null);
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setToast({
          message: "링크 발송에 실패했습니다. 잠시 후 다시 시도해주세요.",
          variant: "error",
        });
        setIsSubmitting(false);
        submittingRef.current = false;
        return;
      }

      setIsSent(true);
      setToast({
        message: "입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.",
        variant: "success",
      });
    } catch {
      setToast({
        message: "링크 발송에 실패했습니다. 잠시 후 다시 시도해주세요.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
      submittingRef.current = false;
    }
  };

  return (
    <>
      {toast ? (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onDismiss={() => setToast(null)}
        />
      ) : null}

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
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
            required
            disabled={isSubmitting}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
          />
        </div>

        {isSent ? (
          <p className="text-sm text-[var(--text-sub)]">
            메일이 도착하지 않았다면 스팸함을 확인하거나 다시 시도해주세요.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex items-center justify-center rounded-[980px] bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isSubmitting ? "발송 중..." : "비밀번호 재설정 링크 발송"}
        </button>
      </form>
    </>
  );
}
