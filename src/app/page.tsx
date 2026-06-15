import Clients from '@/components/clients';
import Expertise from '@/components/services';
import Contact from '@/components/contact';
import About from '@/components/about';
import Intro from '@/components/intro';
import FirmIntroduction from '@/components/firm-introduction';
import PeopleHighlight from '@/components/people-highlight';
import PublicationsHighlight from '@/components/publications-highlight';
import Hero from '@/components/hero';
import HomePageClient from '@/components/home-page-client';
import VideoWallDynamic from '@/components/video-wall-dynamic';
import { getExpertise } from '@/lib/data/expertise';
import { getPublications } from '@/lib/data/publications';
import { getGalleryItems } from '@/lib/data/gallery';
import { getHeroSlides } from '@/lib/data/settings';

export const revalidate = 3600;

export default async function Home() {
  const [expertiseItems, publications, galleryItems, heroSlides] = await Promise.all([
    getExpertise(),
    getPublications(),
    getGalleryItems(),
    getHeroSlides(),
  ]);

  return (
    <HomePageClient hero={<Hero slides={heroSlides} />}>
      <Intro />
      <FirmIntroduction />
      <Clients />
      <About />
      <Expertise items={expertiseItems} />
      <VideoWallDynamic items={galleryItems} />
      <PeopleHighlight />
      <PublicationsHighlight items={publications.slice(0, 3)} />
      <Contact />
    </HomePageClient>
  );
}
