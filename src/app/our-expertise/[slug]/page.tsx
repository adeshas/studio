import { getExpertise, getExpertiseBySlug } from "@/lib/data/expertise";
import Header from "@/components/header";
import Footer from "@/components/footer";

import Link from "next/link";
import { notFound } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }> // Changed: Promise wrapper
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params
  const item = await getExpertiseBySlug(slug)
  if (!item) return { title: 'Expertise Not Found', description: 'The requested practice area could not be found.' }
  return {
    title: item.title,
    description: item.shortDescription ?? undefined,
    openGraph: { images: item.image ? [item.image] : [] },
  }
}

export async function generateStaticParams() {
  const items = await getExpertise()
  return items.map(e => ({ slug: e.slug }))
}

export default async function ExpertiseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const expertise = await getExpertiseBySlug(slug)

  if (!expertise) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80">
          <img
            src={expertise.image ?? ''}
            alt={expertise.title}
            className="object-cover w-full h-full absolute inset-0"
            data-ai-hint={expertise.hint ?? ''}
            loading="eager"
            style={{ objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
            <h1 className="text-4xl md:text-6xl font-bold font-headline">{expertise.title}</h1>
            <div className="mt-4 text-lg">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/our-expertise" className="hover:underline">Our Expertise</Link>
              <span className="mx-2">/</span>
              <span>{expertise.title}</span>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-lg text-muted-foreground space-y-6">
                {(expertise.longDescription ?? []).map((paragraph, index) => {
                  const desc = expertise.longDescription ?? []
                  if (paragraph.startsWith('-')) {
                    const items = desc.slice(index).filter(p => p.startsWith('-')).map(p => p.substring(2));
                    if (index > 0 && desc[index - 1].startsWith('-')) return null;
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 pl-4">
                        {items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>

              <div className="mt-12">
                <Button asChild variant="outline">
                  <Link href="/our-expertise">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Our Expertise
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}