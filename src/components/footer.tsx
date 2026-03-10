import { Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full text-center text-sm p-8 text-[#737373]">
      <div className="flex justify-center items-center gap-4 mb-4">
        <a
          href="https://x.com/andersontomlove"
          target="_blank"
          rel="noopenner noreferrer"
          aria-label="twitter address">
          <Twitter className="w-4 h-4 cursor-pointer" />
        </a>
        <a
          href="https://github.com/tom-anderson-prog"
          target="_blank"
          rel="noopenner noreferrer"
          aria-label="github address">
          <Github className="w-4 h-4 cursor-pointer" />
        </a>
      </div>
      <div>@2026 At&apos;s blog.All rights reserved.</div>
    </footer>
  );
}
