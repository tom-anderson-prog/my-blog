"use client";

import { signIn } from "@/lib/auth-client";
import { Github } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGithubLogin = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/admin-articles",
      });
    } catch (error) {
      console.error("Login failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-50 bg-[radial-gradient(#e5e7eb_1px, transparent_1px)] bg-size-[16px_16px]">
      <div className="w-full max-w-100 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h2 className="text-sm font-bold tracking-tight text-slate-900 uppercase">
            At&apos;s blog
          </h2>
          <div className="h-px w-8 bg-slate-900 mx-auto mt-2" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-slate-500 text-sm text-center mb-8 leading-relaxed">
          Sign in to access your curated dashboard
          <br />
          and latest tech deep-dives.
        </p>

        <button
          onClick={handleGithubLogin}
          disabled={loading}
          className="w-full h-12 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
          <Github className="w-5 h-5" />
          <span>{loading ? "Connecting..." : "Log in with Github"}</span>
        </button>
      </div>
    </div>
  );
}
