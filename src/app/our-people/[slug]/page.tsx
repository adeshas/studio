import { getTeamMemberBySlug, getTeamMembers } from '@/lib/data/team'
import { notFound } from 'next/navigation'
import ProfileClientPage from './profile-client-page'
import type { Metadata, ResolvingMetadata } from 'next'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params
  const member = await getTeamMemberBySlug(slug)

  if (!member) {
    return { title: 'Team Member Not Found', description: 'The requested team member could not be found.' }
  }

  const description = member.description?.split('\n\n')[0] ?? `Learn more about ${member.name}, ${member.role} at Oyewole & Adesina.`
  return {
    title: member.name,
    description,
    openGraph: { images: member.image ? [member.image] : [] },
  }
}

export async function generateStaticParams() {
  const members = await getTeamMembers()
  return members.map(m => ({ slug: m.slug }))
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [member, allMembers] = await Promise.all([getTeamMemberBySlug(slug), getTeamMembers()])
  if (!member) notFound()

  const excluded = ['ademola-shasanya']
  const others = allMembers
    .filter(m => m.slug !== slug && !excluded.includes(m.slug))
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)

  return <ProfileClientPage member={member} otherMembers={others} />
}
