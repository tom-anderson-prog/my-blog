"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { Loader2, LogOut, Mountain, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleSignOut = async () => {
    setIsExiting(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
    setIsExiting(false);
  };

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

          <div className="h-4 w-px bg-slate-200 mx-2" />

          {isPending ? (
            <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-md" />
          ) : session ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex items-center gap-2 p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all">
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent className="max-w-95 rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-bold">
                    Confirm Logout
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-500">
                    Are you sure to log out?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4">
                  <AlertDialogCancel className="rounded-xl border-slate-100 hover:border-slate-50">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleSignOut}
                    disabled={isExiting}
                    className="rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                    {isExiting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    Confirm Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-all">
              <User className="w-4 h-4" />
              <span>Log in</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
