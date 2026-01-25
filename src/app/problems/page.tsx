"use client";

import { ProblemBank } from "@/components/problems/problem-bank";
import { MainNav } from "@/components/layout/main-nav";

export default function ProblemsPage() {
    return (
        <div className="min-h-screen bg-background">
            <MainNav />
            <div className="container mx-auto py-8">
                <ProblemBank />
            </div>
        </div>
    );
}
