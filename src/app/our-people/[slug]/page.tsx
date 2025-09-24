import { teamMembers } from "@/lib/team-data";
import { notFound } from 'next/navigation';
import ProfileClientPage from "./profile-client-page";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const member = teamMembers.find((item) => item.slug === params.slug);

  if (!member) {
    return {
      title: 'Team Member Not Found',
      description: 'The requested team member could not be found.',
    }
  }

  return {
    title: member.name,
    description: member.description.split('\n')[0], // Use first line of description
    openGraph: {
      images: [member.image],
    },
  }
}


export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = teamMembers.find((m) => m.slug === params.slug);

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
