// app/dashboard/page.tsx
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";
export default async function Dashboard() {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar session={session as Session} />
      <SidebarInset>
        <div className="">
          <SidebarTrigger />
          test
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
