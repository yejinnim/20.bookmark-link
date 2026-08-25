"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Folder } from "@/app/_lib/types";
import FolderSelect from "@/components/FolderSelect";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 실제 저장 로직 연동
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-foreground">
          링크 주소
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-black/[.2] dark:border-white/[.145] dark:focus:border-white/[.3]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-foreground"
        >
          폴더
        </label>
        <FolderSelect
          folders={folders}
          value={folderId}
          onChange={setFolderId}
        />
      </div>

      <button
        type="submit"
        className="mt-2 flex items-center justify-center rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        저장
      </button>
    </form>
  );
}
