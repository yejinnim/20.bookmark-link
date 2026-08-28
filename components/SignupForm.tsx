"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

const inputClassName =
  "input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] disabled:opacity-50";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const canSubmit =
    email.trim() !== "" &&
    password !== "" &&
    passwordConfirm !== "" &&
    !isSubmitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submittingRef.current) return;

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    submittingRef.current = true;
    setError(null);
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signUpError) {
        if (signUpError.message.toLowerCase().includes("already registered")) {
          setError("이미 가입된 이메일입니다.");
        } else if (
          signUpError.message.toLowerCase().includes("password") &&
          signUpError.message.toLowerCase().includes("6")
        ) {
          setError("비밀번호는 6자 이상이어야 합니다.");
        } else {
          setError("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
        setIsSubmitting(false);
        submittingRef.current = false;
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
            autoComplete="new-password"
            required
            disabled={isSubmitting}
            placeholder="비밀번호를 입력하세요"
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
            비밀번호 확인
          </label>
          <input
            id="password-confirm"
            name="password-confirm"
            type="password"
            autoComplete="new-password"
            required
            disabled={isSubmitting}
            placeholder="비밀번호를 다시 입력하세요"
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
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>
      </form>
    </>
  );
}
