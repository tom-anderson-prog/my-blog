"use client";

import { MdPreview } from "md-editor-rt";

export default function ArticlePreview({ content }: { content: string }) {
  return (
    <MdPreview
      value={content}
      previewTheme="github"
      codeTheme="atom-one-dark"
      id="preview-only"
      className="bg-transparent! border-none! p-0!"
    />
  );
}
