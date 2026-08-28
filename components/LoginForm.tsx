"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

const inputClassName =
  "input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] disabled:opacity-50";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const canSubmit = email.trim() !== "" && password !== "" && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submittingRef.current) return;

    submittingRef.current = true;
    setError(null);
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        const message = signInError.message.toLowerCase();
        if (message.includes("invalid login credentials")) {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else if (message.includes("email not confirmed")) {
          setError("이메일 인증이 완료되지 않았습니다.");
        } else {
          setError("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
        setIsSubmitting(false);
        submittingRef.current = false;
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setIsSubmitting(false);
      submittingRef.current = false;
    }
  };

  return (
    <>
      {error ? (
        <Toast message={error} onDismiss={() => setError(null)} />
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
            autoComplete="current-password"
            required
            disabled={isSubmitting}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex items-center justify-center rounded-[980px] bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </>
  );
}
