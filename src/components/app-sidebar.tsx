"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

import { IconDashboard, IconCashBanknote, IconLibraryPhoto, IconLivePhoto, IconSettings } from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Pricing",
      url: "/admin/pricing",
      icon: IconCashBanknote,
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: IconLibraryPhoto,
    },
    {
      title: "Home Page",
      url: "/admin/home",
      icon: IconLivePhoto,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [logoUrl, setLogoUrl] = useState<string>("");
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const logo = await axios.get("/api/logo");
        console.log("logo", logo);
        setLogoUrl(logo.data.logo.url);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogo();
  }, []);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!py-8 data-[slot=sidebar-menu-button]:!px-1.5"
            >
              <Link href="/" className="flex">
                {logoUrl !== "" && <Image src={logoUrl} alt="Logo_Empresa" width={40} height={40} className="" />}
                <span className="text-3xl font-semibold">PhotoPort</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
