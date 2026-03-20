"use client";

import { motion } from "framer-motion";
import { Dumbbell, FolderClosed, Images, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Articles",
    href: "/admin-articles",
    icon: Newspaper,
  },
  {
    name: "Categories",
    href: "/admin-category",
    icon: FolderClosed,
  },
  {
    name: "Photos",
    href: "/admin-photo",
    icon: Images,
  },
  {
    name: "Fitness",
    href: "/admin-fitness",
    icon: Dumbbell,
  },
];

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className="w-64 h-full flex flex-col p-6">
      <Link href="/" className="mb-10 px-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tighter cursor-pointer">
          At&apos;s blog
        </h1>
      </Link>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-colors">
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-slate-900 rounded-xl"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              <span
                className={`relative z-10 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900"}`}>
                <Icon size={20} />
              </span>
              <span
                className={`relative z-10 font-medium text-sm ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900"}`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
