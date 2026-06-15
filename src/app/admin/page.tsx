import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTeamMemberCount } from "@/lib/data/team"
import { getExpertiseCount } from "@/lib/data/expertise"
import { getPublicationsCount } from "@/lib/data/publications"
import { getGalleryCount } from "@/lib/data/gallery"
import { Users, Briefcase, Newspaper, Image } from "lucide-react"

export default async function AdminDashboard() {
  const [teamCount, expertiseCount, publicationsCount, galleryCount] = await Promise.all([
    getTeamMemberCount(),
    getExpertiseCount(),
    getPublicationsCount(),
    getGalleryCount(),
  ])

  const stats = [
    { label: 'Team Members', value: teamCount, icon: Users, href: '/admin/team' },
    { label: 'Practice Areas', value: expertiseCount, icon: Briefcase, href: '/admin/expertise' },
    { label: 'Publications', value: publicationsCount, icon: Newspaper, href: '/admin/publications' },
    { label: 'Gallery Items', value: galleryCount, icon: Image, href: '/admin/gallery' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Oyewole &amp; Adesina — Content Management</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <a href={href} key={label} className="group">
            <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</CardTitle>
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <p className="text-3xl font-bold text-foreground">{value}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
