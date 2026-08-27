"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useBookmarks } from "@/app/_lib/bookmarks-context";
import { useFolders } from "@/app/_lib/folders-context";
import type { OgData } from "@/app/api/og/route";
import FolderSelect from "@/components/FolderSelect";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addBookmark } = useBookmarks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current || isSubmitting) return;

    submittingRef.current = true;
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data: OgData | { error: string } = await res.json();

      if (!res.ok || "error" in data) {
        throw new Error(
          "error" in data ? data.error : "오픈 그래프 정보를 가져오지 못했습니다."
        );
      }

      await addBookmark({
        title: data.title,
        url: data.url,
        description: data.description,
        thumbnail: data.thumbnail,
        folderId,
      });

      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "링크를 저장하는 중 오류가 발생했습니다."
      );
      setIsSubmitting(false);
      submittingRef.current = false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="url"
          className="text-sm font-medium text-[var(--text)]"
        >
          링크 주소
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          disabled={isSubmitting}
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-focus w-full rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <FolderSelect
          folders={folders}
          value={folderId}
          onChange={setFolderId}
        />
      </div>

      {error ? (
        <p className="text-sm text-[var(--error)]">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-2 flex items-center justify-center rounded-[980px] bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        {isSubmitting ? "가져오는 중..." : "저장"}
      </button>
    </form>
  );
}
