'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle,
    Mail,
    Phone,
    HelpCircle,
    Book,
    Video,
    Send,
    Search,
    ChevronDown,
    ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const faqs = [
    {
        question: 'How do I reset my password?',
        answer: 'Go to Settings > Account > Change Password. You\'ll need to enter your current password and then your new password twice.',
        category: 'Account'
    },
    {
        question: 'How are problems difficulty levels determined?',
        answer: 'Problem difficulty is based on multiple factors including solution complexity, acceptance rate, and community feedback.',
        category: 'Practice'
    },
    {
        question: 'Can I download course materials?',
        answer: 'Yes! All notes, PDFs, and code samples can be downloaded from the Resources section of each subject.',
        category: 'Learning'
    },
    {
        question: 'How do I track my progress?',
        answer: 'Visit the Progress page to see detailed analytics, including problems solved, streaks, and skill mastery levels.',
        category: 'Progress'
    },
    {
        question: 'What happens if I miss a day in my streak?',
        answer: 'Your streak will reset to 0. However, you can purchase a streak freeze from the rewards shop to protect your streak.',
        category: 'Progress'
    }
];

const contactMethods = [
    {
        icon: Mail,
        title: 'Email Support',
        description: 'Get help via email',
        contact: 'support@dsahub.com',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: MessageCircle,
        title: 'Live Chat',
        description: 'Chat with our team',
        contact: 'Available 9 AM - 6 PM',
        color: 'from-green-500 to-emerald-500'
    },
    {
        icon: Phone,
        title: 'Phone Support',
        description: 'Call us directly',
        contact: '+1 (555) 123-4567',
        color: 'from-purple-500 to-pink-500'
    }
];

const resources = [
    {
        icon: Book,
        title: 'Documentation',
        description: 'Comprehensive guides and tutorials',
        link: '#'
    },
    {
        icon: Video,
        title: 'Video Tutorials',
        description: 'Step-by-step video guides',
        link: '#'
    },
    {
        icon: HelpCircle,
        title: 'Community Forum',
        description: 'Ask questions and get answers',
        link: '#'
    }
];

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2 text-center"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    How can we help you?
                </h1>
                <p className="text-muted-foreground text-lg">
                    Get support, find answers, or reach out to our team
                </p>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-4 md:grid-cols-3"
            >
                {contactMethods.map((method, index) => (
                    <ContactCard key={index} method={method} index={index} />
                ))}
            </motion.div>

            {/* Resources */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-2xl font-bold mb-4">Helpful Resources</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {resources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} index={index} />
                    ))}
                </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* FAQs */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                            <CardDescription>Find quick answers to common questions</CardDescription>
                            <div className="relative mt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search FAQs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {filteredFaqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg overflow-hidden"
                                >
                                    <button
                                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">{faq.question}</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {faq.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform ${expandedFaq === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {expandedFaq === index && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="px-4 pb-4 text-sm text-muted-foreground"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                            <CardDescription>We'll get back to you within 24 hours</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <Input
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Subject</label>
                                    <Input
                                        placeholder="What is this about?"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Message</label>
                                    <Textarea
                                        placeholder="Describe your issue or question..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

function ContactCard({ method, index }: any) {
    const Icon = method.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            <Card className="overflow-hidden h-full">
                <div className={`h-2 bg-gradient-to-r ${method.color}`} />
                <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${method.color} mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <p className="text-sm font-medium">{method.contact}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function ResourceCard({ resource, index }: any) {
    const Icon = resource.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className="h-full cursor-pointer group">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
