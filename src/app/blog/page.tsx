import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: "Mastering Dynamic Programming: A Beginner's Guide",
            excerpt: "Dynamic programming can be intimidating. In this guide, we break down the core concepts and provide a step-by-step approach to solving DP problems.",
            author: "Alex Chen",
            date: "Oct 15, 2025",
            category: "Algorithms",
            readTime: "8 min read"
        },
        {
            id: 2,
            title: "System Design Interview Cheat Sheet",
            excerpt: "Preparing for system design interviews? Here's a comprehensive cheat sheet covering scalability, database sharding, caching strategies, and more.",
            author: "Sarah Jones",
            date: "Nov 02, 2025",
            category: "System Design",
            readTime: "12 min read"
        },
        {
            id: 3,
            title: "Understanding Big O Notation",
            excerpt: "Big O notation is fundamental to computer science. Learn how to analyze the time and space complexity of your algorithms with practical examples.",
            author: "David Lee",
            date: "Sep 28, 2025",
            category: "Theory",
            readTime: "6 min read"
        },
        {
            id: 4,
            title: "The Future of AI in Software Engineering",
            excerpt: "How will AI tools like GitHub Copilot and ChatGPT change the way we write code? We explore the potential impact and how to stay ahead.",
            author: "Emily Wang",
            date: "Dec 10, 2025",
            category: "Tech Trends",
            readTime: "10 min read"
        },
        {
            id: 5,
            title: "Graph Algorithms You Must Know",
            excerpt: "From BFS and DFS to Dijkstra's and A*, these are the essential graph algorithms every software engineer should have in their toolkit.",
            author: "Michael Brown",
            date: "Jan 05, 2026",
            category: "Algorithms",
            readTime: "15 min read"
        },
        {
            id: 6,
            title: "React Server Components Explained",
            excerpt: "Deep dive into React Server Components, how they differ from Client Components, and when to use each for optimal performance.",
            author: "Jessica Garcia",
            date: "Jan 20, 2026",
            category: "Web Dev",
            readTime: "9 min read"
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Engineering Blog</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Insights, tutorials, and deep dives into the world of software engineering, algorithms, and system design.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <div className="h-48 bg-muted/50 rounded-t-lg relative overflow-hidden group">
                            {/* Placeholder for blog image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 left-4">
                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">{post.category}</Badge>
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle className="line-clamp-2 hover:text-primary transition-colors cursor-pointer">{post.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {post.author}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {post.date}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="line-clamp-3">
                                {post.excerpt}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="mt-auto">
                            <Button variant="ghost" className="w-full justify-between hover:text-primary group">
                                Read Article
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
