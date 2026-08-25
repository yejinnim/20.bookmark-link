import type { Bookmark, Folder } from "./types";

export const folders: Folder[] = [
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 2 },
  { id: "news", name: "뉴스", count: 2 },
];

export const bookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Next.js Docs",
    url: "nextjs.org",
    description: "Next.js 공식 문서 사이트",
    folderId: "dev",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "developer.mozilla.org",
    description: "웹 표준 기술 레퍼런스",
    folderId: "dev",
  },
  {
    id: "3",
    title: "GitHub",
    url: "github.com",
    description: "코드 저장소 및 협업 플랫폼",
    folderId: "dev",
  },
  {
    id: "4",
    title: "Stack Overflow",
    url: "stackoverflow.com",
    description: "개발자 Q&A 커뮤니티",
    folderId: "dev",
  },
  {
    id: "5",
    title: "Dribbble",
    url: "dribbble.com",
    description: "디자인 영감 공유 플랫폼",
    folderId: "design",
  },
  {
    id: "6",
    title: "Figma",
    url: "figma.com",
    description: "협업 디자인 툴",
    folderId: "design",
  },
  {
    id: "7",
    title: "Hacker News",
    url: "news.ycombinator.com",
    description: "기술/스타트업 뉴스",
    folderId: "news",
  },
  {
    id: "8",
    title: "TechCrunch",
    url: "techcrunch.com",
    description: "IT 및 스타트업 소식",
    folderId: "news",
  },
];
