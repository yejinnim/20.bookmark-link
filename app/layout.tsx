import type { Metadata } from "next";
import { BookmarksProvider } from "./_lib/bookmarks-context";
import { FoldersProvider } from "./_lib/folders-context";
import { SidebarProvider } from "./_lib/sidebar-context";
import "./globals.css";

const siteName = "북마크 링크";
const siteDescription = "링크를 폴더별로 정리하는 북마크 서비스";

// 소셜 공유 미리보기(og:image 등)는 절대 URL이 필요하다.
// 1) 직접 지정한 NEXT_PUBLIC_SITE_URL → 2) Vercel 배포 도메인 → 3) 로컬 개발
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    images: [{ url: "/thumbnail.jpg", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/thumbnail.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.dataset.theme='dark';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <FoldersProvider>
          <BookmarksProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </BookmarksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
