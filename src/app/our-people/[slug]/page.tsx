import { teamMembers } from "@/lib/team-data";
import { notFound } from 'next/navigation';
import ProfileClientPage from "./profile-client-page";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }> // Changed: Added Promise wrapper
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params; // Changed: await params
  const member = teamMembers.find((item) => item.slug === slug); // Changed: use slug variable

  if (!member) {
    return {
      title: 'Team Member Not Found',
      description: 'The requested team member could not be found.',
    }
  }

  const description = member.description?.split('\n\n')[0] || `Learn more about ${member.name}, ${member.role} at Oyewole & Adesina.`;

  return {
    title: member.name,
    description: description,
    openGraph: {
      images: [member.image],
    },
  }
}

// Changed: Added async and Promise wrapper
export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Changed: await params
  const member = teamMembers.find((m) => m.slug === slug); // Changed: use slug variable

  if (!member) {
    notFound();
  }

  return <ProfileClientPage member={member} />;
}

export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}