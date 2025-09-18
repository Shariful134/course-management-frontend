/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {

  // IconInnerShadowTop,
  IconReport,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";

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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/auth/authSlice";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector(selectCurrentUser) as any;
  console.log(user);

  const data = {
    user: {
      name: `${user?.userEmail}`,
      email: `${user?.userEmail}`,
      avatar: "/avatars/shadcn.jpg",
    },
    documents: [
      {
        name: user?.role === "admin" ? "Course-List" : "Home",
        url: user?.role === "admin" ? "/dashboard/course-list" : "/",
        icon: IconReport,
      },
      {
        name: user?.role === "admin" ? "Story-List" : "All-Courses",
        url: user?.role === "admin" ? "/dashboard/story-list" : "/courses",
        icon: IconReport,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  EduPlatform
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
