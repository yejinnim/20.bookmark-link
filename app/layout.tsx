import type { Metadata } from "next";
import { BookmarksProvider } from "./_lib/bookmarks-context";
import { FoldersProvider } from "./_lib/folders-context";
import { SidebarProvider } from "./_lib/sidebar-context";
import "./globals.css";

const siteName = "북마크 링크";
const siteDescription = "링크를 폴더별로 정리하는 북마크 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
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
    images: [{ url: "/thumbnail.png", width: 2400, height: 1260 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/thumbnail.png"],
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
