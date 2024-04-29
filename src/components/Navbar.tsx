
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/src/lib/utils";

import MaxWidthWrapper from "@/src/components/MaxWidthWrapper";
import { buttonVariants } from "@/src/components/ui/button";
import { MobileNav } from "@/src/components/MobileNav";
import { GetServerSideProps } from "next";
import { getCurrentUser } from "../lib/session";
import { cookies } from "next/headers";


function GetEmail(){
  const cookieStore = cookies()
  const value = cookieStore.getAll().map((cookie) => {
    const regex = /[\w-]+-auth-token$/;
    if(regex.test(cookie.name)){
      return cookie.value;
    }
  })
  const valueString = String(value);
  const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
  const match = valueString.match(emailRegex);

  return match? match[0] : null;
}

const Navbar = () => {
  // Replace with your auth of choice, e.g. Clerk: const { userId } = auth();
  const isUserSignedIn = GetEmail()? true : false;
  const email = GetEmail();

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
              src="/bookmark.png"
              alt="logo"
              width={50}
              height={50}
              quality={100}
              className="w-7 h-7"
            />
            <span className="text-2xl font-semibold">Ask your bookmarks</span>
          </Link>
          <div className="flex gap-1 sm:gap-4 items-center">
          <MobileNav />
            {/* {!isUserSignedIn ? (
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
            )} */}

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
                  {/* <Link
                    className={buttonVariants({
                      size: "sm",
                    })}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link> */}
                </>
              )}
            </div>

            {/* User profile mockup below, e.g using Clerk: <UserButton afterSignOutUrl="/" /> */}
            {isUserSignedIn && (
              <div className="">{email}</div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
