import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "폴더",
  description: "폴더에 저장한 북마크를 확인하세요.",
};

export default function FolderLayout({
  children,
}: LayoutProps<"/folder/[folderId]">) {
  return children;
}
