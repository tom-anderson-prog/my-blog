"use client";
import { useSession } from "@/lib/auth-client";
import { Mountain } from "lucide-react";
import Link from "next/link";

export default function Header() {
  // const { data: session } = useSession();
  const session = true;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-background/50 backdrop-blur">
      <div className="w-full h-16 mx-auto px-8 flex items-center justify-between">
        <Link href="/">
          <div className="flex justify-start items-center">
            <Mountain className="mr-2 w-8 h-8" />
            <span className="text-2xl font-bold tracking-tighter">
              At&apos;s blog
            </span>
          </div>
        </Link>
        <nav className="flex items-center text-sm font-medium gap-8">
          <Link
            href="/"
            className="p-2 rounded-md hover:bg-[#f3f4f6] hover:text-foreground/80 transition-all duration-200">
            Home
          </Link>
          <Link
            href="/articles"
            className="p-2 rounded-md hover:bg-[#f3f4f6] hover:text-foreground/80 transition-all duration-200">
            Articles
          </Link>
          <Link
            href="/photo-wall"
            className="p-2 rounded-md hover:bg-[#f3f4f6] hover:text-foreground/80 transition-all duration-200">
            Photo Wall
          </Link>
          <Link
            href="/fitness"
            className="p-2 rounded-md hover:bg-[#f3f4f6] hover:text-foreground/80 transition-all duration-200">
            Fitness
          </Link>
          <Link
            href="/about"
            className="p-2 rounded-md hover:bg-[#f3f4f6] hover:text-foreground/80 transition-all duration-200">
            About Me
          </Link>
          {session && (
            <Link
              href="/admin-articles"
              className="p-2 rounded-md hover:bg-[#f3f4f6] hover:text-foreground/80 transition-all duration-200">
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
