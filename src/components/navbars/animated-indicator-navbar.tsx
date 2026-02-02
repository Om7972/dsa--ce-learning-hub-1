"use client";

import { Menu, X, Crosshair, Trophy, BarChart2, Users, Network, Scale, AlertTriangle, Cpu, TrendingUp, GitMerge, Map as MapIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NAV_LOGO = {
  url: "/",
  src: "/orchids-logo.png",
  alt: "DSA Master logo",
  title: "DSA Master",
};
const NAV_ITEMS = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Subjects", link: "/subjects" },
  { name: "Problems", link: "/problems" },
  { name: "Projects", link: "/projects" },
  { name: "Career Paths", link: "/career-paths" },
  { name: "Community", link: "/community" },
];

const AnimatedIndicatorNavbar = () => {
  const [activeItem, setActiveItem] = useState(NAV_ITEMS[0].name);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = document.querySelector(
        `[data-nav-item="${activeItem}"]`
      ) as HTMLElement;

      if (activeEl && indicatorRef.current && menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        indicatorRef.current.style.width = `${itemRect.width}px`;
        indicatorRef.current.style.left = `${itemRect.left - menuRect.left}px`;
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem]);

  return (
    <section className="py-4 bg-background">
      <nav className="container flex items-center justify-between">
        {/* Left WordMark */}
        <a href={NAV_LOGO.url} className="flex items-center gap-2">
          <img src={NAV_LOGO.src} className="max-h-8 w-8" alt={NAV_LOGO.alt} />
          <span className="text-lg font-semibold tracking-tighter">
            {NAV_LOGO.title}
          </span>
        </a>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList
            ref={menuRef}
            className="rounded-4xl flex items-center gap-6 px-8 py-3"
          >
            {NAV_ITEMS.map((item) => (
              <React.Fragment key={item.name}>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    data-nav-item={item.name}
                    href={item.link} // Changed to href for direct navigation
                    onClick={() => setActiveItem(item.name)}
                    className={`relative cursor-pointer text-sm font-medium hover:bg-transparent ${activeItem === item.name
                      ? "text-foreground"
                      : "text-muted-foreground"
                      }`}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </React.Fragment>
            ))}

            {/* FEATURES MEGA MENU */}
            <NavigationMenuItem>
              <Popover>
                <PopoverTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 group">
                  Features
                  <span className="ml-1 text-xs opacity-50 group-hover:rotate-180 transition-transform">▼</span>
                </PopoverTrigger>
                <PopoverContent className="w-[800px] p-6 bg-popover border rounded-xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-8">

                    {/* Column 1: DSA & Tools */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-4 bg-indigo-500 rounded-full"></span> DSA & Practice
                      </h4>
                      <div className="grid gap-2">
                        <FeatureLink href="/dsa-practice/adaptive" title="Adaptive Practice" desc="Personalized difficulty engine" icon={<Crosshair className="w-4 h-4 text-indigo-500" />} />
                        <FeatureLink href="/dsa-practice/contests" title="Timed Contests" desc="Compete on leaderboards" icon={<Trophy className="w-4 h-4 text-amber-500" />} />
                        <FeatureLink href="/dsa-practice/comparison" title="Algo Comparison" desc="Compare algorithms side-by-side" icon={<Scale className="w-4 h-4 text-cyan-500" />} />
                        <FeatureLink href="/dsa-practice/mistake-analyzer" title="Mistake Analyzer" desc="AI-powered error analysis" icon={<AlertTriangle className="w-4 h-4 text-red-500" />} />
                        <FeatureLink href="/tools/complexity-predictor" title="Complexity Predictor" desc="Predict Time & Space complexity" icon={<Cpu className="w-4 h-4 text-purple-500" />} />
                      </div>
                    </div>

                    {/* Column 2: Career & Growth */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-4 bg-teal-500 rounded-full"></span> Career & Growth
                      </h4>
                      <div className="grid gap-2">
                        <FeatureLink href="/ce-subjects/exam-mode" title="Exam Mode" desc="University exam focused revision" icon={<TrendingUp className="w-4 h-4 text-red-600" />} />
                        <FeatureLink href="/ce-subjects/roadmap" title="Subject Roadmap" desc="Visual dependency graph" icon={<MapIcon className="w-4 h-4 text-green-600" />} />
                        <FeatureLink href="/dashboard/stats" title="Stats & Heatmap" desc="Career readiness score" icon={<BarChart2 className="w-4 h-4 text-blue-500" />} />
                        <FeatureLink href="/profile/skill-tree" title="Skill Tree" desc="Interactive skill visualization" icon={<GitMerge className="w-4 h-4 text-green-500" />} />
                        <FeatureLink href="/community/mentors" title="Mentor Connect" desc="Book sessions with experts" icon={<Users className="w-4 h-4 text-teal-500" />} />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </NavigationMenuItem>

            {/* Active Indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-2 flex h-1 items-center justify-center px-2 transition-all duration-300"
            >
              <div className="bg-foreground h-0.5 w-full rounded-t-none transition-all duration-300" />
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Popover */}
        <MobileNav activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="outline"
            size="sm"
            className="h-10 py-2.5 text-sm font-normal"
          >
            Sign Up
          </Button>
          <Button
            size="sm"
            className="h-10 py-2.5 text-sm font-normal"
          >
            Login
          </Button>
        </div>
      </nav>
    </section>
  );
};

export { AnimatedIndicatorNavbar };

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group relative h-6 w-6">
      <div className="absolute inset-0">
        <Menu
          className={`text-muted-foreground group-hover:text-foreground absolute transition-all duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
        />
        <X
          className={`text-muted-foreground group-hover:text-foreground absolute transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
        />
      </div>
    </div>
  );
};

const MobileNav = ({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: (item: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <AnimatedHamburger isOpen={isOpen} />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative -left-4 -top-4 block w-screen max-w-md overflow-hidden rounded-xl p-0 lg:hidden"
        >
          <ul className="bg-background text-foreground w-full py-4">
            {NAV_ITEMS.map((navItem, idx) => (
              <li key={idx}>
                <a
                  href={navItem.link}
                  onClick={() => setActiveItem(navItem.name)}
                  className={`text-foreground flex items-center border-l-[3px] px-6 py-4 text-sm font-medium transition-all duration-75 ${activeItem === navItem.name
                    ? "border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground border-transparent"
                    }`}
                >
                  {navItem.name}
                </a>
              </li>
            ))}
            <li className="flex flex-col gap-2 px-7 py-2">
              <Button variant="outline">Sign Up</Button>
              <Button>Login</Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

function FeatureLink({ href, title, desc, icon }: { href: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <a href={href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/60 transition-colors group">
      <div className="mt-0.5 bg-background p-2 rounded-lg border shadow-sm group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold flex items-center gap-1 group-hover:text-primary transition-colors">
          {title}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{desc}</p>
      </div>
    </a>
  )
}