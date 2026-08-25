import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "북마크 링크",
  description: "링크를 폴더별로 정리하는 북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
