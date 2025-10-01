"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Users, Newspaper, Briefcase, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "../logo"

const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/team", label: "Team", icon: Users },
    { href: "/admin/expertise", label: "Expertise", icon: Briefcase },
    { href: "/admin/publications", label: "Publications", icon: Newspaper },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <div className="w-32">
                        <Logo variant="white" />
                    </div>
                    <SidebarTrigger className="ml-auto" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href} legacyBehavior passHref>
                                <SidebarMenuButton
                                    isActive={pathname === item.href}
                                    tooltip={{
                                        children: item.label,
                                    }}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}