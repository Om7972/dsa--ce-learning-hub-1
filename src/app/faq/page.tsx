import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function FAQPage() {
    const faqs = [
        {
            question: "Is this platform suitable for complete beginners?",
            answer: "Absolutely! We have dedicated learning paths starting from the absolute basics of programming and computer science. Our 'Beginner's Guide to C++' or 'Python for Everybody' courses are perfect starting points."
        },
        {
            question: "Are the certificates recognized by employers?",
            answer: "While our certificates are not accredited degrees, they serve as valid proof of your skills and dedication. Many of our students showcase them on LinkedIn and resumes. More importantly, the projects you build here are what employers value most."
        },
        {
            question: "Can I access the content on mobile?",
            answer: "Yes, our platform is fully responsive. You can read tutorials, watch videos, and even solve quizzes on your phone or tablet. However, for the best coding experience with our integrated IDE, we recommend a desktop or laptop."
        },
        {
            question: "How does the AI Tutor work?",
            answer: "Our AI Tutor utilizes advanced language models to provide instant help. It can explain code snippets, hint at solutions without giving them away, and help debug errors in real-time. It's available 24/7 to unblock you."
        },
        {
            question: "Is there a community I can join?",
            answer: "Yes! We have a vibrant community forum where you can ask questions, share your success stories, and find study partners. Every problem also has a discussion tab."
        },
        {
            question: "Do you offer mock interviews?",
            answer: "We offer an AI-based mock interview tool in our 'Interview Prep' section. For peer-to-peer mock interviews, check our Community section to find a partner."
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</h1>
                <p className="text-xl text-muted-foreground">
                    Got a question? We're here to answer.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 bg-card/50">
                        <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="mt-16 text-center bg-muted/30 p-8 rounded-2xl border border-dashed">
                <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
                <p className="text-muted-foreground mb-6">
                    Can't find the answer you're looking for? Please chat to our friendly team.
                </p>
                <Button size="lg" className="gap-2">
                    <Mail className="h-4 w-4" /> Contact Support
                </Button>
            </div>
        </div>
    );
}
