'use client'
import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/src/components/UserAuthForm";
import { getCurrentUser } from "@/src/lib/session";
import { User } from '@supabase/supabase-js';
import Image from "next/image";
import AuthForm from "@/src/components/auth-form";
import { createBrowserClient } from "@supabase/ssr";



export default async function LoginPage() {
  // const user = (await getCurrentUser());
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!)
const session = await supabase.auth.getSession()
console.log(session.data.session?.user);
  return (
    <div className="container flex w-screen flex-col items-center justify-center">
      <div className="mx-auto flex flex-1 w-full flex-col justify-center space-y-6 sm:w-[350px] px-4">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            alt="logo"
            src="/bookmark.png"
            className="sm:w-12 sm:h-12 w-6 h-6 mx-auto"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="mx-auto w-auto">
             <AuthForm view="sign_in" />
          </div>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          If you haven't registered yet, click{" "}
          <Link
            href="/sign-up"
            className="hover:text-brand underline underline-offset-4"
          >
            Here
          </Link>
        </p>
      </div>
    </div>
  );
}
