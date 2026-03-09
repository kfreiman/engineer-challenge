"use client"

import * as React from "react"

import { NavMain } from "#/components/nav-main"
import { NavUser } from "#/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "#/components/ui/sidebar"
import { LifeBuoyIcon, ActivityIcon, ShuffleIcon, GlobeIcon } from "lucide-react"
import Logo from "./logo"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Exchange Internal",
      url: "/exchange-internal",
      icon: (
        <ActivityIcon />
      ),
    },
    {
      title: "Between Exchanges",
      url: "/between-exchanges",
      icon: (
        <ShuffleIcon />
      ),
    },
    {
      title: "DEX Arbitrage",
      url: "/dex-arbitrage",
      icon: (
        <GlobeIcon />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <Logo />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/help">
                <LifeBuoyIcon />
                <span>Help</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
