"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { Loader2, LogOut, Mountain, User, Menu } from "lucide-react";
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
} from "./ui/alert-dialog";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

export default function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "Photo Wall", href: "/photo-wall" },
    { name: "Fitness", href: "/fitness" },
    { name: "Pomodoro", href: "/pomodoro" },
    { name: "About me", href: "/about" },
  ];

  const handleSignOut = async () => {
    setIsExiting(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsLogoutOpen(false);
          setIsSheetOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
    setIsExiting(false);
  };

  return (
    <header className="sticky top-0 z-50000 w-full border-b border-gray-100 bg-background/50 backdrop-blur">
      <div className="w-full h-16 mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/">
          <div className="flex justify-start items-center shrink-0 gap-2">
            <Mountain className="w-8 h-8" />
            <span className="text-xl md:text-2xl font-bold tracking-tighter">
              At&apos;s blog
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center text-sm font-medium gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-2 rounded-md hover:bg-slate-100 transition-all">
              {link.name}
            </Link>
          ))}
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
            <button
              onClick={() => setIsLogoutOpen(true)}
              className="flex items-center gap-2 p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all">
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-all">
              <User className="w-4 h-4" />
              <span>Log in</span>
            </Link>
          )}
        </nav>

        {/* mobile device */}
        <div className="md:hidden flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] border-l-0 p-0 flex flex-col z-99999">
              <SheetTitle className="flex justify-start items-center gap-4 p-4">
                <Mountain className="w-4 h-4" />
                Menu
              </SheetTitle>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsSheetOpen(false)}
                    className="text-lg font-medium p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    {link.name}
                  </Link>
                ))}

                <div className="my-2 border-t border-slate-100" />

                {isPending ? (
                  <div className="w-full h-12 bg-slate-50 animate-pulse rounded-xl" />
                ) : session ? (
                  <Button
                    variant="ghost"
                    onClick={() => setIsLogoutOpen(true)}
                    className="w-full justify-start gap-3 h-14 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl">
                    <LogOut className="w-5 h-5" />
                    <span className="text-lg">Log out</span>
                  </Button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsSheetOpen(false)}
                    className="flex items-center gap-3 p-3 text-lg font-medium text-slate-600 hover:bg-slate-50 rounded-xl">
                    <User className="w-5 h-5" />
                    <span>Log in</span>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <AlertDialogContent className="max-w-[90vw] md:max-w-95 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-left">
              Confirm Logout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-left">
              Are you sure to log out?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4 flex-col gap-2 sm:flex-row">
            <AlertDialogCancel className="rounded-md border-slate-100 hover:border-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              disabled={isExiting}
              className="rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
              {isExiting && <Loader2 className="w-4 h-4 animate-spin" />}
              Confirm Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
