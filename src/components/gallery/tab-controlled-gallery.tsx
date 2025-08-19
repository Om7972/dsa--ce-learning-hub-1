"use client";

import { useEffect, useRef, useState } from "react";
import { Code, Database, Server, Users, Layers, DollarSign, Clock, TrendingUp } from "lucide-react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const items = [
  {
    title: (
      <>
        Software
        <br />
        Engineer
      </>
    ),
    description: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Required Skills:</h4>
            <p className="text-sm">Programming languages (JavaScript, Python, Java), algorithms, data structures, system design, version control (Git)</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Career Timeline:</h4>
            <p className="text-sm">Junior Developer (0-2 years) → Mid-level (2-5 years) → Senior (5-8 years) → Tech Lead/Architect (8+ years)</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Salary Range:</h4>
            <p className="text-sm">$70k - $200k+ depending on experience and location</p>
          </div>
        </div>
      </>
    ),
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Software Engineer",
    icon: Code,
  },
  {
    title: (
      <>
        Data
        <br />
        Scientist
      </>
    ),
    description: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Required Skills:</h4>
            <p className="text-sm">Python/R, SQL, machine learning, statistics, data visualization, domain expertise, business acumen</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Career Timeline:</h4>
            <p className="text-sm">Data Analyst (0-2 years) → Data Scientist (2-5 years) → Senior Data Scientist (5-8 years) → Principal/Lead (8+ years)</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Salary Range:</h4>
            <p className="text-sm">$80k - $220k+ with high demand in AI/ML fields</p>
          </div>
        </div>
      </>
    ),
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Data Scientist",
    icon: Database,
  },
  {
    title: (
      <>
        DevOps
        <br />
        Engineer
      </>
    ),
    description: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Required Skills:</h4>
            <p className="text-sm">Cloud platforms (AWS, Azure, GCP), containerization (Docker, Kubernetes), CI/CD, infrastructure as code, monitoring</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Career Timeline:</h4>
            <p className="text-sm">Systems Admin (0-2 years) → DevOps Engineer (2-5 years) → Senior DevOps (5-8 years) → Platform Architect (8+ years)</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Salary Range:</h4>
            <p className="text-sm">$75k - $180k+ with cloud expertise commanding premium</p>
          </div>
        </div>
      </>
    ),
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "DevOps Engineer",
    icon: Server,
  },
  {
    title: (
      <>
        Product
        <br />
        Manager
      </>
    ),
    description: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Required Skills:</h4>
            <p className="text-sm">Product strategy, user research, data analysis, project management, cross-functional collaboration, technical understanding</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Career Timeline:</h4>
            <p className="text-sm">Associate PM (0-2 years) → Product Manager (2-5 years) → Senior PM (5-8 years) → Director/VP Product (8+ years)</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Salary Range:</h4>
            <p className="text-sm">$90k - $250k+ with equity compensation potential</p>
          </div>
        </div>
      </>
    ),
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Product Manager",
    icon: Users,
  },
  {
    title: (
      <>
        Full Stack
        <br />
        Developer
      </>
    ),
    description: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Required Skills:</h4>
            <p className="text-sm">Frontend (React, Vue, Angular), backend (Node.js, Python, Java), databases, APIs, deployment, full product lifecycle</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Career Timeline:</h4>
            <p className="text-sm">Junior Full Stack (0-2 years) → Mid-level (2-5 years) → Senior (5-8 years) → Lead Developer/CTO (8+ years)</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Salary Range:</h4>
            <p className="text-sm">$65k - $190k+ with versatility highly valued by startups</p>
          </div>
        </div>
      </>
    ),
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Full Stack Developer",
    icon: Layers,
  },
];

const TabControlledGallery = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(items[0].category);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    const currentIndex = items.findIndex((item) => item.category === current);
    const activeTab = tabRefs.current[currentIndex];

    if (activeTab) {
      const { offsetWidth, offsetLeft } = activeTab;
      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft,
      });
    }
  }, [current]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const currentIndex = items.findIndex((item) => item.category === current);
    api.scrollTo(currentIndex);

    const onSelect = () => {
      const idx = api.selectedScrollSnap();
      setCurrent(items[idx].category);
    };
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current]);

  return (
    <section className="overflow-hidden py-32 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Tech Career Paths</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore different technology career paths, their requirements, progression timelines, and growth opportunities in the tech industry.
          </p>
        </div>
        
        <Carousel
          setApi={setApi}
          className="[&>div[data-slot=carousel-content]]:overflow-visible"
        >
          <div className="flex items-center justify-between">
            <Tabs
              value={current}
              onValueChange={setCurrent}
              className="mb-8 flex justify-center"
            >
              <TabsList className="relative h-auto gap-6 bg-background">
                {items.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <TabsTrigger
                      key={idx}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      value={item.category}
                      className="text-base transition-all duration-700 ease-out [&[data-state=active]]:shadow-none flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4" />
                      {item.category}
                    </TabsTrigger>
                  );
                })}
                <div
                  className="absolute bottom-0 h-0.5 bg-primary transition-all duration-700 ease-out"
                  style={{
                    width: `${indicatorStyle.width}px`,
                    left: `${indicatorStyle.left}px`,
                  }}
                />
              </TabsList>
            </Tabs>
            <div className="hidden items-center gap-4 sm:flex">
              <CarouselPrevious className="static size-10 translate-0" />
              <CarouselNext className="static size-10 translate-0" />
            </div>
          </div>
          <CarouselContent className="max-w-4xl">
            {items.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <CarouselItem key={idx} className="w-fit max-w-4xl">
                  <div className="relative grid h-full max-w-4xl gap-0 rounded-xl border border-border shadow-sm select-none md:max-h-[450px] md:grid-cols-2 overflow-hidden bg-card">
                    <div className="flex flex-col justify-between gap-4 p-6 sm:p-10">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <h2 className="text-2xl font-medium sm:text-4xl">
                            {item.title}
                          </h2>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground sm:mt-6">
                          {item.description}
                        </div>
                        
                        <div className="mt-6 flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-success" />
                            <span className="text-success font-medium">High Growth</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-accent" />
                            <span className="text-accent font-medium">Competitive Pay</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-warning" />
                            <span className="text-warning font-medium">Flexible Hours</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-full min-h-[300px] md:min-h-[450px]">
                      <img
                        src={item.image}
                        alt={`${item.category} career path visualization`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { TabControlledGallery };