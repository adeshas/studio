import { Scale, Users, PenSquare } from 'lucide-react';

const features = [
  {
    name: 'Legal Practitioners',
    icon: <Scale className="h-10 w-10 text-primary" />,
  },
  {
    name: 'Consultants',
    icon: <Users className="h-10 w-10 text-primary" />,
  },
  {
    name: 'Notary Public',
    icon: <PenSquare className="h-10 w-10 text-primary" />,
  },
];

export default function Intro() {
  return (
    <section id="intro" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center space-y-3">
                {feature.icon}
                <h3 className="text-xl font-bold font-headline text-foreground">{feature.name}</h3>
              </div>
            ))}
          </div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            At <span className="font-semibold text-foreground">Oyewole &amp; Adesina</span>, we combine deep legal expertise with a strategic, business-focused mindset to guide clients through every challenge. As a full-service firm headquartered in Lagos, we pride ourselves on delivering tailored, end-to-end solutions—backed by rigorous analysis, clear communication, and an unwavering commitment to integrity.
          </p>
        </div>
      </div>
    </section>
  );
}
