"use client";

import supabase from "../lib/supabase";
import * as React from "react";

import { Icons } from "@/src/components/Icons";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { User } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User | null;
}

export function UserAuthForm({ className, user, ...props }: UserAuthFormProps) {
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const login = async (platform: string) => {
    // user已登录，返回首页
    if (user && user.id) {
      router.push("/");
      return;
    }
    if (platform === "github") {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
          })
      setIsGitHubLoading(true);
    }
    if (platform === "google") {
        supabase.auth.signInWithOAuth({
            provider: 'google',
          })
      setIsGoogleLoading(true);
    }
  };

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <button
        type="button"
        className={cn(buttonVariants())}
        onClick={() => login("google")}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
      <Button
        variant="outline"
        className="border-gray-400"
        onClick={() => login("github")}
        disabled={isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
