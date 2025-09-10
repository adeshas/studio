
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
        <AdminSidebar />
        <main className="min-h-screen lg:pl-72">
            <div className="p-4 sm:p-6 lg:p-8">
                {children}
            </div>
        </main>
        <Toaster />
    </SidebarProvider>
  )
}
