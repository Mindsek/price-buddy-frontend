import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { ReactNode } from "react";

export default async function SidebarWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar session={session as Session} />
      <SidebarInset>
        <div className="flex-1 overflow-hidden">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
