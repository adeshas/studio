import Image from "next/image";

export default function About() {
  return (
    <section id="about-us" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">About Us</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Oyewole &amp; Adesina is a law firm in Nigeria with proficiency in dispute resolution, corporate and commercial law, real estate, finance, energy, labour and employment, shipping, admiralty and intellectual property law. Oyewole &amp; Adesina is strategically placed to offer quality and first-class cost-efficient legal services to clients across the major economic hubs and sectors of Nigeria.
            </p>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We have built a reputation for understanding our clients’ peculiar business issues and challenges, and then proffering a legal and business-savvy solution.
            </p>
          </div>
          <div className="relative w-full h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2021/01/ABOUT-US.jpeg"
              alt="Modern office building interior"
              fill
              className="object-cover"
              data-ai-hint="office interior"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
