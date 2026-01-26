"use client";

import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Map } from "lucide-react";

export default function RoadmapsPage() {
    const roadmaps = [
        {
            title: "Frontend Developer",
            description: "Master React, Next.js, and modern CSS.",
            steps: ["HTML & CSS", "JavaScript Deep Dive", "React Framework", "State Management", "Performance"],
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Backend Engineer",
            description: "Build scalable APIs with Node.js and Go.",
            steps: ["Algorithms", "Databases (SQL/NoSQL)", "API Design", "System Design", "Cloud Deployment"],
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            title: "Full Stack Master",
            description: "The complete package from database to UI.",
            steps: ["Frontend Basics", "Backend Logic", "Database Integration", "DevOps & CI/CD", "Testing"],
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "DSA & Competitive Coding",
            description: "Ace your coding interviews at FAANG.",
            steps: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Greedy Algorithms", "Advanced Structures"],
            color: "text-primary",
            bg: "bg-primary/10"
        }
    ];

    return (
        <div className="flex flex-col min-h-full">
            <div className="container mx-auto px-6 py-12 flex-1">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold font-display mb-4">Career Locations & <span className="text-gradient">Roadmaps</span></h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Step-by-step guides to help you master your chosen career path in tech.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {roadmaps.map((roadmap) => (
                        <Card key={roadmap.title} className="hover:border-primary/50 transition-colors cursor-pointer group">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className={`h-12 w-12 rounded-xl ${roadmap.bg} flex items-center justify-center ${roadmap.color} mb-4`}>
                                        <Map className="h-6 w-6" />
                                    </div>
                                    <Badge variant="outline">Updated 2026</Badge>
                                </div>
                                <CardTitle className="text-2xl">{roadmap.title}</CardTitle>
                                <CardDescription className="text-base">{roadmap.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 relative">
                                    <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-border" />
                                    {roadmap.steps.map((step, i) => (
                                        <div key={step} className="flex items-center gap-4 relative z-10">
                                            <div className={`h-4 w-4 rounded-full border-2 border-background ${i === 0 ? 'bg-primary' : 'bg-muted-foreground/30'} shrink-0`} />
                                            <div className="text-sm font-medium">{step}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex items-center text-primary font-bold text-sm group-hover:underline">
                                    Start Journey <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
