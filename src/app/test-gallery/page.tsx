import Header from "@/components/header";
import Footer from "@/components/footer";
import TestGallerySlider from "@/components/test-gallery-slider";
import Link from "next/link";


export default function TestGalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80 bg-primary/20">
          <img
            src="https://picsum.photos/seed/testgallery/1200/400"
            alt="Test Gallery Hero"
            className="object-cover w-full h-full absolute inset-0"
            data-ai-hint="abstract art"
            style={{ objectFit: 'cover', position: 'absolute', inset: 0 }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
            <h1 className="text-4xl md:text-6xl font-bold font-headline">Test Gallery</h1>
            <div className="mt-4 text-lg">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <span>Test Gallery</span>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">SwiperJS Gallery</h2>
            <TestGallerySlider />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
