import { Handshake } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    logo: {
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spotify.svg",
      alt: "Spotify logo",
      width: 58,
      height: 22,
    },
    quote:
      "This platform has revolutionized how we approach rapid prototyping. The intuitive interface saves us countless hours.",
    author: {
      name: "Sarah Mitchell",
      role: "UX Director, Spotify",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah%20Mitchell",
    },
  },
  {
    logo: {
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airbnb.svg",
      alt: "Airbnb logo",
      width: 54,
      height: 22,
    },
    quote:
      "The seamless workflow integration has transformed our design process. We can iterate and deploy faster than ever before.",
    author: {
      name: "Marcus Rodriguez",
      role: "Senior Product Designer, Airbnb",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Marcus%20Rodriguez",
    },
  },
  {
    logo: {
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg",
      alt: "Discord logo",
      width: 60,
      height: 22,
    },
    quote:
      "Finally, a tool that bridges the gap between design and development. Our team collaboration has never been smoother.",
    author: {
      name: "Jessica Wong",
      role: "Lead Developer, Discord",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jessica%20Wong",
    },
  },
  {
    logo: {
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
      alt: "Stripe logo",
      width: 66,
      height: 22,
    },
    quote:
      "The automation features have streamlined our entire deployment pipeline. It's a game-changer for productivity.",
    author: {
      name: "David Kim",
      role: "Engineering Lead, Stripe",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=David%20Kim",
    },
  },
  {
    logo: {
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dropbox.svg",
      alt: "Dropbox logo",
      width: 58,
      height: 22,
    },
    quote:
      "As a creative professional, this tool gives me the freedom to bring ideas to life without technical barriers.",
    author: {
      name: "Ana Silva",
      role: "Creative Director, Dropbox",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ana%20Silva",
    },
  },
  {
    logo: {
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg",
      alt: "Shopify logo",
      width: 58,
      height: 22,
    },
    quote:
      "The collaborative features keep our distributed team aligned and productive. It's become essential to our workflow.",
    author: {
      name: "Thomas Anderson",
      role: "Product Manager, Shopify",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Thomas%20Anderson",
    },
  },
];

const CompanyLogoTestimonials = () => {
  return (
    <section className="py-32 bg-background">
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            What our users are saying
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Trusted by teams at leading companies who build amazing products
          </p>
        </div>
      </div>

      <div className="container mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="flex flex-col gap-6 rounded-md bg-background p-6 shadow-sm"
          >
            <img
              src={testimonial.logo.src}
              alt={testimonial.logo.alt}
              width={testimonial.logo.width}
              height={testimonial.logo.height}
              className="object-contain dark:invert"
            />

            <blockquote className="text-muted-foreground-subtle text-lg font-normal italic">{`"${testimonial.quote}"`}</blockquote>

            <div className="mt-auto flex items-center gap-4">
              <img
                src={testimonial.author.image}
                alt={`${testimonial.author.name}'s profile picture`}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-lg tracking-[-0.36px]">
                  {testimonial.author.name}
                </p>
                <p className="text-muted-foreground">
                  {testimonial.author.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { CompanyLogoTestimonials };