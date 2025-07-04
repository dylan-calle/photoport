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

type User = {
  id: string;
  name: string;
  user: string;
  avatar: string;
  email: string;
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [user, setUser] = useState<User>({ id: "", name: "", user: "", avatar: "", email: "" });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get("/api/users/verify-token", {
          withCredentials: true,
        });
        setUser({
          ...user.data.data,
          avatar: user.data.data.avatar
            ? user.data.data.avatar
            : "https://scontent.fcbb3-1.fna.fbcdn.net/v/t1.6435-9/142361511_829750594254181_8096284960001906280_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=x6EgCsfl1iQQ7kNvwEyUuM3&_nc_oc=Adk8B1wg7byBEFa8vYJvyC70L4YneutY0wJwQzTQKC_df6-ccMGAHMW94yTuNIXDCNzFH3n6ZVvtQWfzZo_TBLgv&_nc_zt=23&_nc_ht=scontent.fcbb3-1.fna&_nc_gid=yJLRAxYY1u-eCpViSRBMug&oh=00_AfQcUfhVlTr33VuZC1etuK6yLuoX70ic6IUOxCDO_gW04w&oe=688FD76B",
        });
      } catch (err) {
        console.error(err);
      }
    };
    const fetchLogo = async () => {
      try {
        const logo = await axios.get("/api/logo");
        console.log("logo", logo);
        setLogoUrl(logo.data.logo.url);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
