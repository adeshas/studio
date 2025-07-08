
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be less than 500 characters."),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80 bg-primary/20">
             <Image
                src="https://www.oyewoleadesina.com/wp-content/uploads/2019/06/legal_insights_1.jpg"
                alt="Contact us background"
                fill
                className="object-cover"
                data-ai-hint="abstract network"
             />
             <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Contact Us</h1>
                <div className="mt-4 text-lg">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Contact Us</span>
                </div>
            </div>
        </section>

        <section id="contact-details" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-12">
                 <div>
                    <h2 className="text-3xl font-bold font-headline mb-6">Lagos Office</h2>
                    <div className="space-y-4 text-lg text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-accent mt-1 shrink-0" />
                            <span>19A, Udi Street<br/>Osborne Foreshore Estate Phase 1, Ikoyi, Lagos</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-accent mt-1 shrink-0" />
                            <div>
                                <p>Mobile: +234 706 210 3941</p>
                                <p>Office: 01 2932 390</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-accent mt-1 shrink-0" />
                            <a href="mailto:info@oyewoleadesina.com" className="hover:text-accent">info@oyewoleadesina.com</a>
                        </div>
                    </div>
                 </div>
                 <div>
                    <h2 className="text-3xl font-bold font-headline mb-6">Abuja Office</h2>
                    <div className="space-y-4 text-lg text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-accent mt-1 shrink-0" />
                            <span>Block 33b, 24 Cairo Street,<br/>Off Ademola Adetokunbo Crescent, Wuse II, Abuja</span>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-accent mt-1 shrink-0" />
                            <div>
                                <p>Mobile: +234 803 657 8169</p>
                                <p>Office: 01 2932 390</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-accent mt-1 shrink-0" />
                            <a href="mailto:info@oyewoleadesina.com" className="hover:text-accent">info@oyewoleadesina.com</a>
                        </div>
                    </div>
                 </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold font-headline mb-6">Send Us A Message</h2>
                <Card className="p-6 sm:p-8 border-none shadow-xl rounded-xl bg-card">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Phone Number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us how we can help..." {...field} className="min-h-[120px]" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
                    </form>
                    </Form>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="map" className="w-full h-[500px] bg-muted">
            <iframe
                src="https://maps.google.com/maps?q=19A,%20Udi%20Street%20Osborne%20Foreshore%20Estate%20Phase%201,%20Ikoyi,%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>

      </main>
      <Footer />
    </div>
  );
}
