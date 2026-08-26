import Link from "next/link";

export default function FolderNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-lg font-semibold text-[var(--text)]">
        폴더를 찾을 수 없습니다.
      </p>
      <p className="text-sm text-[var(--text-sub)]">
        삭제되었거나 존재하지 않는 폴더예요.
      </p>
      <Link
        href="/"
        className="link-hover text-sm font-medium text-[var(--accent)]"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
