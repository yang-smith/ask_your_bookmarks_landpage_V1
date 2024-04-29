import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/src/components/UserAuthForm";
import { getCurrentUser } from "@/src/lib/session";
import { User } from '@supabase/supabase-js';
import Image from "next/image";
import AuthForm from "@/src/components/auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const user = (await getCurrentUser());

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
             <AuthForm view="sign_up" />
          </div>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          If you want to sign in click{" "}
          <Link
            href="/sign-in"
            className="hover:text-brand underline underline-offset-4"
          >
            Here
          </Link>
        </p>
      </div>
    </div>
  );
}
