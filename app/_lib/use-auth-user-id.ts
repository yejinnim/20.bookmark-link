"use client";

import { useEffect, useState } from "react";
import type { createClient } from "@/utils/supabase/client";

type SupabaseClient = ReturnType<typeof createClient>;

/** 현재 로그인된 사용자의 id를 반환하고, 로그인/로그아웃/계정 전환 시 최신 값으로 갱신한다. */
export function useAuthUserId(supabase: SupabaseClient): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUserId(data.user?.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUserId(session?.user?.id ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return userId;
}
