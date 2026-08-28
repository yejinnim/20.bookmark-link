import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// 로그인한 사용자만 접근 가능한 경로
const isProtectedPath = (pathname: string) =>
  pathname === "/" ||
  pathname === "/new" ||
  pathname.startsWith("/folder");

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  // Do not run code between createServerClient and supabase.auth.getUser().
  // Refreshing the auth token.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 비로그인 사용자가 보호된 페이지에 접근하면 로그인 페이지로 이동
  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    const redirectResponse = NextResponse.redirect(url)
    // 인증 쿠키(토큰 갱신 결과)를 리다이렉트 응답에도 복사
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie)
    })
    return redirectResponse
  }

  return supabaseResponse
};
