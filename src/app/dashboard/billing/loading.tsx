import { CardSkeleton } from "@/src/components/dashboard/card-skeleton";
import { DashboardHeader } from "@/src/components/dashboard/dashboard-header";
import { DashboardShell } from "@/src/components/dashboard/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
