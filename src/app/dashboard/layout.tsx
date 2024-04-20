import { DashboardLayout } from "@/src/components/layout/DashboardLayout";
import { getCurrentUser } from "@/src/lib/session";
import { HomeLayoutChildren } from "@/types/layout";

export default async function HomePageLayout({ children }: HomeLayoutChildren) {
    const user = (await getCurrentUser());

  return (
    <>
      <DashboardLayout children={children} user={user} />
    </>
  );
}
