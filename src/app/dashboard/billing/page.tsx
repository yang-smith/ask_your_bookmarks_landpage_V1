import { BillingForm } from "@/src/components/dashboard/billing-form";
import { DashboardHeader } from "@/src/components/dashboard/dashboard-header";
import { DashboardNav } from "@/src/components/dashboard/nav";
import { DashboardShell } from "@/src/components/dashboard/shell";
import { subscribeInfo } from "@/src/components/subscribe/Subscribe";
import { dashboardConfig } from "@/src/config/dashboard";
import { MEMBERSHIP_ROLE_VALUE } from "@/src/lib/constants";
import { getUserSubscriptionPlan } from "@/src/lib/lemonsqueezy/subscription";
import { getCurrentUser } from "@/src/lib/session";
import { SubScriptionInfo, UserSubscriptionPlan } from "@/types/subscribe";
import { UserInfo } from "@/types/user";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
    const user = (await getCurrentUser());
  const subscription: SubScriptionInfo | null = await getUserSubscriptionPlan({
    userId: user==null? '': user.id,
  });

  let subscriptionPlan: UserSubscriptionPlan = {
    role: 0,
    isPro: false,
    name: "Free",
    description: subscribeInfo["free"].description,
    subscriptionId: "",
    membershipExpire: 0,
    customerId: "",
    variantId: 0,
    isCanceled: true,
    updatePaymentMethodURL: "",
  };
  if (subscription) {
    subscriptionPlan = {
      role: subscription.role,
      isPro: subscription.role === MEMBERSHIP_ROLE_VALUE,
      name: subscription.role === MEMBERSHIP_ROLE_VALUE ? "PRO" : "Free",
      description:
        subscription.role === MEMBERSHIP_ROLE_VALUE
          ? subscribeInfo["membership"].description
          : subscribeInfo["free"].description,
      subscriptionId: subscription.subscriptionId,
      membershipExpire: subscription.membershipExpire,
      customerId: subscription.customerId,
      variantId: subscription.variantId,
      isCanceled: subscription.isCanceled,
      updatePaymentMethodURL: subscription.updatePaymentMethodURL,
    };
  }

  return (
    <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <DashboardShell>
          <DashboardHeader
            heading="Billing"
            text="Manage billing and your subscription plan."
          />
          <BillingForm
            subscriptionPlan={{
              ...subscriptionPlan,
            }}
            user={user}
          />
        </DashboardShell>
      </main>
    </div>
  );
}
