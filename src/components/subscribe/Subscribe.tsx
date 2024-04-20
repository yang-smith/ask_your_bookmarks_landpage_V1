'use client';

import SubscribeCard from "@/src/components/subscribe/SubscribeCard";
import { axios } from "@/src/lib/axios";
import {
  BOOST_PACK_CREDITS,
  BOOST_PACK_EXPIRE,
  SINGLE_VARIANT_KEY,
  SUBSCRIPTION_VARIANT_KEY,
} from "@/src/lib/constants";
import { CreateCheckoutResponse, SubscribeInfo } from "@/types/subscribe";
import { UserInfo } from "@/types/user";
import { toast } from "react-hot-toast";

export const subscribeInfo: SubscribeInfo = {
  free: {
    title: "Free",
    description: "Begin Your Exploration Journey",
    amount: 0,
    expireType: "day",
    possess: [
      `Support for up to ${
        process.env.NEXT_PUBLIC_COMMON_USER_DAILY_LIMIT_STR || "1,000"
      } bookmarks`,
      "Fuzzy search capability",
      "Automatic configuration of common bookmarks",
    ],
  },
  membership: {
    isPopular: true,
    title: "Premium",
    description: "Enhanced with AI capabilities.",
    amount: 19.9,
    expireType: "year",
    possess: [
        `Support for up to ${
            process.env.NEXT_PUBLIC_COMMON_USER_DAILY_LIMIT_STR || "10,000"
          } bookmarks`,
          "Fuzzy search capability",
          "Automatic configuration of common bookmarks",
          "AI-enhanced search through content summarization",
          "Automatic categorization and management of bookmarks (coming soon)",

    ],
    buttonText: "Upgrade Now",
    mainClassName: "purple-500",
    buttonClassName: "bg-gradient-to-r from-pink-500 to-purple-500",
  },
};

export default function Subscribe({ user }: { user: UserInfo | null }) {
  const getStartFreeVersion = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const subscribe = async () => {
    if (!user || !user.userId) {
      toast.error("Please login first");
      return;
    }
    try {
      const { checkoutURL } = await axios.post<any, CreateCheckoutResponse>(
        "/api/payment/subscribe",
        {
          userId: user.userId,
          type: SUBSCRIPTION_VARIANT_KEY,
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      );
      window.location.href = checkoutURL;
      // window.open(checkoutURL, "_blank", "noopener, noreferrer");
    } catch (err) {
      console.log(err);
    }
  };
  const purchase = async () => {
    if (!user || !user.userId) {
      toast.error("Please login first");
      return;
    }
    console.log("purchase");
    try {
      const { checkoutURL } = await axios.post<any, CreateCheckoutResponse>(
        "/api/payment/subscribe",
        {
          userId: user.userId,
          type: SINGLE_VARIANT_KEY,
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      );
      window.location.href = checkoutURL;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold mb-8 text-zinc-800">UPGRADE</h1>
      </div>
      <section className="w-full py-0 flex items-center justify-center">
        <div className="container px-8 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <SubscribeCard
              info={subscribeInfo.free}
              clickButton={getStartFreeVersion}
            />
            <SubscribeCard
              id="subscription-card"
              info={subscribeInfo.membership}
              clickButton={subscribe}
            />
          </div>
        </div>
      </section>
      {/* <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      /> */}
    </div>
  );
}


