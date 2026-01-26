"use client";

import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-full">
            <div className="container mx-auto px-6 py-12 flex-1 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold font-display mb-4">Get in Touch</h1>
                        <p className="text-muted-foreground">Have questions about our Enterprise plans or curriculum? We'd love to hear from you.</p>
                    </div>

                    <Card className="glass-card border-primary/20">
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                            <CardDescription>We usually respond within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First name</label>
                                    <Input placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last name</label>
                                    <Input placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input placeholder="john@example.com" type="email" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <Textarea placeholder="How can we help you?" className="min-h-[120px]" />
                            </div>
                            <Button className="w-full pink-glow font-bold">Send Message</Button>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                                <Mail className="h-5 w-5" />
                            </div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-sm text-muted-foreground">support@dsamaster.com</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <h3 className="font-medium">Live Chat</h3>
                            <p className="text-sm text-muted-foreground">Available 9am - 5pm EST</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-3">
                                <Phone className="h-5 w-5" />
                            </div>
                            <h3 className="font-medium">Phone</h3>
                            <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
