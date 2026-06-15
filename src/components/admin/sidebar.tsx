"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Users, Newspaper, Briefcase, LayoutDashboard, ImageIcon, Settings2, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Logo from "../logo"

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/expertise", label: "Expertise", icon: Briefcase },
  { href: "/admin/publications", label: "Publications", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings2 },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-28">
            <Logo variant="white" />
          </div>
          <SidebarTrigger className="ml-auto opacity-60 hover:opacity-100" />
        </div>
        <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 mt-3 font-medium">Admin Console</p>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="gap-0.5">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
                className="rounded-lg text-sm font-medium"
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-2 py-4 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip={{ children: "Logout" }} className="rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
