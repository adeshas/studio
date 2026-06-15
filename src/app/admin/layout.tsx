
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-theme">
      <SidebarProvider>
          <AdminSidebar />
          <main className="min-h-screen flex-1 bg-[hsl(210,40%,96%)]">
              <div className="p-6 sm:p-8 lg:p-10 max-w-7xl">
                  {children}
              </div>
          </main>
          <Toaster />
      </SidebarProvider>
    </div>
  )
}
