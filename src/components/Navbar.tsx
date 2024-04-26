import Link from "next/link";
import Image from "next/image";

import { cn } from "@/src/lib/utils";

import MaxWidthWrapper from "@/src/components/MaxWidthWrapper";
import { buttonVariants } from "@/src/components/ui/button";
import { MobileNav } from "@/src/components/MobileNav";
import { GetServerSideProps } from "next";
import { getCurrentUser } from "../lib/session";
import { User } from '@supabase/supabase-js';

export const getServerSideProps: GetServerSideProps = async context => {
  return {
      props: {
        user: await getCurrentUser()
      }
  };
};

const Navbar = ({user}: {user: User | undefined}) => {
  // Replace with your auth of choice, e.g. Clerk: const { userId } = auth();
  const isUserSignedIn = (user != undefined);
  console.log(user);

  return (
    <nav
      className={cn(
        "sticky h-14 inset-x-0 top-0 z-30 border-b border-gray-200  bg-white/40 backdrop-blur-lg transition-all"
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="flex z-40 justify-center items-center gap-1"
          >
            <Image
              src="/logo.png"
              alt="convo logo"
              width={50}
              height={50}
              quality={100}
              className="w-7 h-7"
            />
            <span className="text-2xl font-semibold">Ask your bookmarks</span>
          </Link>
          <div className="flex gap-1 sm:gap-4 items-center">
            {!isUserSignedIn ? (
              <MobileNav />
            ) : (
              <Link
                className={buttonVariants({
                  size: "sm",
                  className: "sm:hidden mr-3",
                })}
                href="/dashboard"
              >
                Dashboard
              </Link>
            )}

            <div className="hidden items-center space-x-4 sm:flex">
              {!isUserSignedIn ? (
                <>
                  <Link
                    href="#subscribe"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Pricing
                  </Link>
                  <Link
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                  <Link
                    className={buttonVariants({
                      size: "sm",
                    })}
                    href="/sign-up"
                  >
                    Get started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className={buttonVariants({
                      size: "sm",
                    })}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>

            {/* User profile mockup below, e.g using Clerk: <UserButton afterSignOutUrl="/" /> */}
            {isUserSignedIn && (
              <div className="bg-emerald-600 border-2 border-black shadow-lg rounded-full w-10 h-10"></div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
