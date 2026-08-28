"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

const inputClassName =
  "input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] disabled:opacity-50";

type ToastState = { message: string; variant: "error" | "success" };
type Status = "checking" | "ready" | "invalid";

export default function ResetPasswordForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    let done = false;

    supabase.auth.getSession().then(({ data }) => {
      if (!done && data.session) {
        done = true;
        setStatus("ready");
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        done = true;
        setStatus("ready");
      }
    });

    const timer = setTimeout(() => {
      if (!done) setStatus("invalid");
    }, 3000);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [supabase]);

  const canSubmit =
    password !== "" && passwordConfirm !== "" && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submittingRef.current) return;

    if (password !== passwordConfirm) {
      setToast({ message: "비밀번호가 일치하지 않습니다.", variant: "error" });
      return;
    }

    submittingRef.current = true;
    setToast(null);
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        const message = error.message.toLowerCase();
        if (message.includes("session") || message.includes("jwt")) {
          setToast({
            message:
              "재설정 링크가 만료되었습니다. 링크를 다시 요청해주세요.",
            variant: "error",
          });
        } else if (message.includes("6")) {
          setToast({
            message: "비밀번호는 6자 이상이어야 합니다.",
            variant: "error",
          });
        } else if (message.includes("different from the old")) {
          setToast({
            message: "기존 비밀번호와 다른 비밀번호를 사용해주세요.",
            variant: "error",
          });
        } else {
          setToast({
            message: "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.",
            variant: "error",
          });
        }
        setIsSubmitting(false);
        submittingRef.current = false;
        return;
      }

      setToast({
        message: "비밀번호가 변경되었습니다.",
        variant: "success",
      });
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch {
      setToast({
        message: "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.",
        variant: "error",
      });
      setIsSubmitting(false);
      submittingRef.current = false;
    }
  };

  if (status === "checking") {
    return (
      <p className="text-center text-sm text-[var(--text-sub)]">
        링크를 확인하는 중...
      </p>
    );
  }

  if (status === "invalid") {
    return (
      <div className="flex flex-col items-center gap-4 text-center text-sm text-[var(--text-sub)]">
        <p>유효하지 않거나 만료된 재설정 링크입니다.</p>
        <Link
          href="/forgot-password"
          className="link-hover font-medium text-[var(--accent)]"
        >
          재설정 링크 다시 요청하기
        </Link>
      </div>
    );
  }

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
            htmlFor="password"
            className="text-sm font-medium text-[var(--text)]"
          >
            새 비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            disabled={isSubmitting}
            placeholder="새 비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password-confirm"
            className="text-sm font-medium text-[var(--text)]"
          >
            새 비밀번호 확인
          </label>
          <input
            id="password-confirm"
            name="password-confirm"
            type="password"
            autoComplete="new-password"
            required
            disabled={isSubmitting}
            placeholder="새 비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex items-center justify-center rounded-[980px] bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isSubmitting ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </>
  );
}
