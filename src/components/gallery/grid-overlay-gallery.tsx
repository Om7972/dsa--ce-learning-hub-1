"use client";
import { ArrowRight, Star, Users, Code, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProjectMetric = {
  icon: string;
  value: string;
  label: string;
};

interface ProjectData {
  title: string;
  description: string;
  category: string;
  link: string;
  githubLink: string;
  background: string;
  techStack: string[];
  metrics: Array<ProjectMetric>;
}

// Featured Engineering Projects
const PROJECTS: Array<ProjectData> = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack web application with payment integration and real-time inventory management",
    category: "Web Applications",
    link: "https://example-ecommerce.com",
    githubLink: "https://github.com/student/ecommerce-platform",
    background: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    techStack: ["React", "Node.js", "MongoDB"],
    metrics: [
      { icon: "⭐", value: "234", label: "stars" },
      { icon: "👥", value: "12", label: "contributors" },
      { icon: "🔧", value: "React", label: "primary tech" }
    ]
  },
  {
    title: "Smart Health Monitor",
    description: "Cross-platform mobile app for tracking health metrics with AI-powered insights",
    category: "Mobile Apps",
    link: "https://example-health-app.com",
    githubLink: "https://github.com/student/health-monitor",
    background: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1000&auto=format&fit=crop",
    techStack: ["React Native", "TensorFlow", "Firebase"],
    metrics: [
      { icon: "⭐", value: "189", label: "stars" },
      { icon: "📱", value: "5K", label: "downloads" },
      { icon: "🔧", value: "React Native", label: "primary tech" }
    ]
  },
  {
    title: "ML Stock Predictor",
    description: "Machine learning model for stock price prediction using LSTM networks and sentiment analysis",
    category: "Machine Learning Projects",
    link: "https://example-ml-stock.com",
    githubLink: "https://github.com/student/stock-predictor",
    background: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Python", "TensorFlow", "Pandas"],
    metrics: [
      { icon: "⭐", value: "456", label: "stars" },
      { icon: "🎯", value: "87%", label: "accuracy" },
      { icon: "🔧", value: "Python", label: "primary tech" }
    ]
  },
  {
    title: "Distributed Chat System",
    description: "Scalable real-time messaging system with microservices architecture and load balancing",
    category: "System Design Projects",
    link: "https://example-chat-system.com",
    githubLink: "https://github.com/student/distributed-chat",
    background: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Go", "Redis", "Docker"],
    metrics: [
      { icon: "⭐", value: "312", label: "stars" },
      { icon: "⚡", value: "1M+", label: "messages/day" },
      { icon: "🔧", value: "Go", label: "primary tech" }
    ]
  },
  {
    title: "Open Source UI Library",
    description: "Comprehensive React component library with accessibility features and TypeScript support",
    category: "Open Source Contributions",
    link: "https://example-ui-lib.com",
    githubLink: "https://github.com/opensource/ui-library",
    background: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    techStack: ["TypeScript", "React", "Storybook"],
    metrics: [
      { icon: "⭐", value: "1.2K", label: "stars" },
      { icon: "👥", value: "45", label: "contributors" },
      { icon: "🔧", value: "TypeScript", label: "primary tech" }
    ]
  },
  {
    title: "IoT Smart Home Hub",
    description: "Centralized control system for smart home devices with voice commands and automation",
    category: "System Design Projects",
    link: "https://example-smart-home.com",
    githubLink: "https://github.com/student/smart-home-hub",
    background: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Raspberry Pi", "Python", "MQTT"],
    metrics: [
      { icon: "⭐", value: "178", label: "stars" },
      { icon: "🏠", value: "50+", label: "devices supported" },
      { icon: "🔧", value: "Python", label: "primary tech" }
    ]
  }
];

const ProjectCard = ({ title, description, category, link, githubLink, background, techStack, metrics }: ProjectData) => {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="before:content-[] relative min-h-auto w-full overflow-hidden rounded-[.5rem] bg-black/80 bg-cover bg-center bg-no-repeat p-5 transition-all duration-300 before:absolute before:top-0 before:left-0 before:z-10 before:block before:size-full before:bg-black/50 before:transition-all before:duration-300 hover:before:bg-black/30 sm:aspect-square md:aspect-auto md:min-h-[30rem] md:max-w-[30rem] group"
    >
      <div className="relative z-20 flex size-full flex-col justify-between gap-4">
        {/* Category Badge */}
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm text-white text-xs rounded-full font-medium">
            {category}
          </span>
          <div className="flex gap-2">
            <a
              href={githubLink}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code className="size-4" />
            </a>
            <a
              href={link}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        {/* Project Metrics */}
        <div className="flex gap-3 flex-wrap">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md">
              <span className="text-sm">{metric.icon}</span>
              <span className="text-white text-sm font-medium">{metric.value}</span>
              <span className="text-white/70 text-xs">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Project Info */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl leading-[1.2] font-semibold text-white md:text-3xl">
              {title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="default" 
            className="w-fit bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white group-hover:bg-white/20"
            asChild
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              View Project
              <ArrowRight className="size-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

const GridOverlayGallery = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Featured Engineering Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore innovative student and professional projects showcasing cutting-edge technologies, 
              creative problem-solving, and real-world applications across various engineering disciplines.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={`project-${i}`} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { GridOverlayGallery };