import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Code, Database, Globe, Cpu } from "lucide-react";

const cheatSheets = [
    {
        id: 1,
        title: "Big O Complexity Chart",
        description: "Time and space complexity of common algorithms and data structures.",
        category: "Algorithms",
        icon: <Cpu className="h-6 w-6 text-orange-500" />,
        color: "bg-orange-500/10 border-orange-500/20"
    },
    {
        id: 2,
        title: "Data Structures Reference",
        description: "Quick reference for Arrays, Linked Lists, Trees, Graphs, Hash Maps, and more.",
        category: "Data Structures",
        icon: <Database className="h-6 w-6 text-blue-500" />,
        color: "bg-blue-500/10 border-blue-500/20"
    },
    {
        id: 3,
        title: "SQL Commands & Syntax",
        description: "Essential SQL commands for querying, manipulating, and defining data.",
        category: "Databases",
        icon: <Database className="h-6 w-6 text-green-500" />,
        color: "bg-green-500/10 border-green-500/20"
    },
    {
        id: 4,
        title: "Common Graph Algorithms",
        description: "Visual guide to BFS, DFS, Dijkstra, Prim's, Kruskal's, and Bellman-Ford.",
        category: "Algorithms",
        icon: <Globe className="h-6 w-6 text-purple-500" />,
        color: "bg-purple-500/10 border-purple-500/20"
    },
    {
        id: 5,
        title: "React Hooks Lifecycle",
        description: "Understanding useEffect, useState, useMemo, and component lifecycle.",
        category: "Web Development",
        icon: <Code className="h-6 w-6 text-cyan-500" />,
        color: "bg-cyan-500/10 border-cyan-500/20"
    },
    {
        id: 6,
        title: "System Design Patterns",
        description: "Load Balancers, Caching, Sharding, Replication, and CAP Theorem.",
        category: "System Design",
        icon: <FileText className="h-6 w-6 text-pink-500" />,
        color: "bg-pink-500/10 border-pink-500/20"
    }
];

export default function CheatSheetsPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Cheat Sheets</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Quick references and visual guides to help you memorize key concepts and ace your exams.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cheatSheets.map((sheet) => (
                    <Card key={sheet.id} className="hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <div className={`p-3 rounded-lg ${sheet.color}`}>
                                    {sheet.icon}
                                </div>
                            </div>
                            <CardTitle className="group-hover:text-primary transition-colors">{sheet.title}</CardTitle>
                            <CardDescription>{sheet.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-6">
                                {sheet.description}
                            </p>
                            <div className="flex gap-2">
                                <Button className="w-full" variant="default">
                                    <Download className="mr-2 h-4 w-4" /> Download PDF
                                </Button>
                                <Button size="icon" variant="outline">
                                    <FileText className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
