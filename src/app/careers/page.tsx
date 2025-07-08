import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80 bg-primary/20">
             <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/05/hunters-race-MYbhN8KaaEc-unsplash.jpg"
                alt="Careers background"
                fill
                className="object-cover"
                data-ai-hint="recruitment office"
             />
             <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Careers</h1>
                <div className="mt-4 text-lg">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Careers</span>
                </div>
            </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto prose lg:prose-xl prose-stone space-y-6">
              <p>
                Oyewole & Adesina offers its lawyers unparalleled career opportunities whilst encouraging and providing its lawyers with unique professional development opportunities. We are interested in individuals who have an appetite for challenging work, a detailed understanding of the law and the ability to manage complex transactions. Beyond that, we are also looking for people who fit in easily with colleagues and clients and can deliver under pressure.
              </p>
              <p>
                We welcome applications from lawyers who want to be a part of our team. To apply please send your resume and a covering letter to <a href="mailto:info@oyewoleadesina.com" className="text-accent hover:underline">info@oyewoleadesina.com</a>.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
