"use client";

import { useState } from "react";
import { MinimalCenteredHero } from "@/components/heros/minimal-centered-hero";
import StudyTimetableDashboard from "@/components/dashboard/study-timetable-dashboard";
import SubjectCoverageGrid from "@/components/subjects/subject-coverage-grid";
import AssignmentTracker from "@/components/assignments/assignment-tracker";
import ProblemBank from "@/components/problems/problem-bank";
import { TabControlledGallery } from "@/components/gallery/tab-controlled-gallery";
import { GridOverlayGallery } from "@/components/gallery/grid-overlay-gallery";
import { SimpleGridStats } from "@/components/stats/simple-grid-stats";
import { CompanyLogoTestimonials } from "@/components/testimonials/company-logo-testimonials";
import { AnimatedIndicatorNavbar } from "@/components/navbars/animated-indicator-navbar";
import { NewsletterFooter } from "@/components/footers/newsletter-footer";

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "dashboard", label: "Dashboard" },
  { id: "subjects", label: "Subjects" },
  { id: "assignments", label: "Assignments" },
  { id: "problems", label: "Problems" },
  { id: "career-paths", label: "Career Paths" },
  { id: "projects", label: "Projects" },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div>
            <MinimalCenteredHero />
            <SimpleGridStats />
            <CompanyLogoTestimonials />
          </div>
        );
      case "dashboard":
        return <StudyTimetableDashboard />;
      case "subjects":
        return <SubjectCoverageGrid />;
      case "assignments":
        return <AssignmentTracker />;
      case "problems":
        return <ProblemBank />;
      case "career-paths":
        return <TabControlledGallery />;
      case "projects":
        return <GridOverlayGallery />;
      default:
        return (
          <div>
            <MinimalCenteredHero />
            <SimpleGridStats />
            <CompanyLogoTestimonials />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img 
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=700" 
                className="h-8 w-auto" 
                alt="DSA Learning Platform"
              />
              <span className="text-xl font-semibold font-display">DSA Master</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                Sign Up
              </button>
              <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {renderActiveSection()}
      </main>

      {activeSection === "home" && <NewsletterFooter />}
    </div>
  );
}