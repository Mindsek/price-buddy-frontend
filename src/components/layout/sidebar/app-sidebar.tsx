"use client";

import { ShoppingCartIcon, SquareTerminal, StoreIcon } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Accueil",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Produits",
      url: "/products",
      icon: ShoppingCartIcon,
    },
    {
      title: "Supermarchés",
      url: "/supermarkets",
      icon: StoreIcon,
    },
  ],
};

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: Session }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <Image
                  src="/icons/ic_price_buddy_192.png"
                  alt="Price Buddy"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Price Buddy</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
