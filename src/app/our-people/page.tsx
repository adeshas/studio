import { getTeamMembers } from '@/lib/data/team'
import OurPeopleClient from './our-people-client'

export const revalidate = 3600

export default async function OurPeoplePage() {
  const members = await getTeamMembers()
  return <OurPeopleClient members={members} />
}
