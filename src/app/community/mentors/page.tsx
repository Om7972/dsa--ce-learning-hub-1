
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, MessageSquare, Video, Star, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const MOCK_MENTORS = [
    {
        id: '1',
        name: 'Sarah Chen',
        headline: 'Senior SDE @ Google',
        company: 'Google',
        skills: ['Systems Design', 'Java', 'Distributed Systems'],
        rate: 50,
        image: 'https://i.pravatar.cc/150?u=sarah',
        verified: true
    },
    {
        id: '2',
        name: 'Alex Johnson',
        headline: 'Frontend Architect @ Vercel',
        company: 'Vercel',
        skills: ['React', 'Next.js', 'Typescript'],
        rate: 40,
        image: 'https://i.pravatar.cc/150?u=alex',
        verified: true
    },
    {
        id: '3',
        name: 'Priya Sharma',
        headline: 'Backend Lead @ Uber',
        company: 'Uber',
        skills: ['Go', 'Microservices', 'Kafka'],
        rate: 60,
        image: 'https://i.pravatar.cc/150?u=priya',
        verified: true
    },
    {
        id: '4',
        name: 'David Kim',
        headline: 'AI Researcher @ OpenAI',
        company: 'OpenAI',
        skills: ['Python', 'PyTorch', 'LLMs'],
        rate: 80,
        image: 'https://i.pravatar.cc/150?u=david',
        verified: false
    }
];

export default function MentorConnectPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMentors = MOCK_MENTORS.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto p-6 max-w-6xl space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
                    Find Your Mentor
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Connect with industry experts, book 1:1 sessions, and fast-track your career.
                </p>

                <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, company, or skill..."
                        className="pl-10 h-12 text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
        </div>
    );
}

function MentorCard({ mentor }: any) {
    return (
        <motion.div whileHover={{ y: -5 }} className="h-full">
            <Card className="h-full flex flex-col overflow-hidden border-t-4 border-t-teal-500">
                <CardHeader className="text-center pb-2">
                    <div className="w-24 h-24 mx-auto mb-4 relative">
                        <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                            <AvatarImage src={mentor.image} />
                            <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                        </Avatar>
                        {mentor.verified && (
                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full check-badge" title="Verified Mentor">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                    <CardTitle className="text-xl">{mentor.name}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">{mentor.headline}</p>
                </CardHeader>
                <CardContent className="text-center space-y-4 flex-1">
                    <div className="flex flex-wrap justify-center gap-2">
                        {mentor.skills.map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="font-normal">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-1 text-sm font-semibold text-yellow-500">
                        <Star className="w-4 h-4 fill-current" /> 5.0 (24 reviews)
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2 bg-muted/20 p-4">
                    <Button variant="outline" className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" /> Chat
                    </Button>
                    <BookSessionModal mentor={mentor} />
                </CardFooter>
            </Card>
        </motion.div>
    );
}

function BookSessionModal({ mentor }: any) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                    <Video className="w-4 h-4 mr-2" /> Book (${mentor.rate}/hr)
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book a Session with {mentor.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-2">
                        {['Mon, 10:00 AM', 'Tue, 2:00 PM', 'Thu, 6:00 PM', 'Fri, 11:00 AM'].map(slot => (
                            <Button key={slot} variant="outline" className="justify-start">
                                {slot}
                            </Button>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        * All times are in your local timezone.
                    </p>
                    <Button className="w-full h-12 text-lg">Confirm Booking</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
