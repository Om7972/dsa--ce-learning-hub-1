import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight, Briefcase, Clock, FileText } from "lucide-react";

export default function InterviewPrepPage() {
    const tracks = [
        {
            id: 1,
            title: "Google Interview Prep",
            company: "Google",
            questions: 45,
            hours: 12,
            difficulty: "Hard",
            icon: "Top Tech"
        },
        {
            id: 2,
            title: "Amazon Leadership Principles",
            company: "Amazon",
            questions: 30,
            hours: 8,
            difficulty: "Medium",
            icon: "FAANG"
        },
        {
            id: 3,
            title: "Microsoft System Design",
            company: "Microsoft",
            questions: 25,
            hours: 10,
            difficulty: "Medium",
            icon: "Top Tech"
        },
        {
            id: 4,
            title: "Startup Hustle",
            company: "General",
            questions: 60,
            hours: 15,
            difficulty: "Hard",
            icon: "Startups"
        },
        {
            id: 5,
            title: "Behavioral Questions Guide",
            company: "General",
            questions: 50,
            hours: 5,
            difficulty: "Easy",
            icon: "Soft Skills"
        },
        {
            id: 6,
            title: "Frontend Machine Coding",
            company: "Atlassian",
            questions: 20,
            hours: 10,
            difficulty: "Medium",
            icon: "Frontend"
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Interview Preparation</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Curated question sets and guides targeting specific companies and roles.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {tracks.map((track) => (
                    <Card key={track.id} className="group hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="secondary" className="mb-2">{track.company}</Badge>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{track.title}</CardTitle>
                                </div>
                                <Badge variant={track.difficulty === 'Hard' ? 'destructive' : 'outline'} className={track.difficulty === 'Hard' ? '' : 'bg-primary/5 text-primary'}>{track.difficulty}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                                    <FileText className="h-5 w-5 mb-1 text-muted-foreground" />
                                    <span className="font-bold text-lg">{track.questions}</span>
                                    <span className="text-xs text-muted-foreground">Questions</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                                    <Clock className="h-5 w-5 mb-1 text-muted-foreground" />
                                    <span className="font-bold text-lg">{track.hours}h</span>
                                    <span className="text-xs text-muted-foreground">Est. Time</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                                    <CheckCircle2 className="h-5 w-5 mb-1 text-muted-foreground" />
                                    <span className="font-bold text-lg">0%</span>
                                    <span className="text-xs text-muted-foreground">Progress</span>
                                </div>
                            </div>

                            <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                Start Track <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
