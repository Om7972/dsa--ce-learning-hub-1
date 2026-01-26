'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Send,
    Bot,
    User,
    Lightbulb,
    Code,
    BookOpen,
    Zap,
    MessageCircle,
    TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const suggestedQuestions = [
    "Explain binary search algorithm",
    "What is time complexity?",
    "How does a hash table work?",
    "Difference between stack and queue",
    "Explain dynamic programming"
];

const features = [
    {
        icon: Lightbulb,
        title: "Smart Hints",
        description: "Get contextual hints without spoiling the solution",
        color: "text-yellow-500"
    },
    {
        icon: Code,
        title: "Code Review",
        description: "AI analyzes your code and suggests improvements",
        color: "text-blue-500"
    },
    {
        icon: BookOpen,
        title: "Concept Explanation",
        description: "Deep dive into any DSA concept with examples",
        color: "text-green-500"
    },
    {
        icon: Zap,
        title: "Quick Answers",
        description: "Get instant answers to your questions",
        color: "text-purple-500"
    }
];

export default function AITutorPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: 'assistant',
            content: "Hi! I'm your AI Learning Assistant. I can help you understand DSA concepts, debug code, and provide hints for problems. What would you like to learn today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages([...messages, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: messages.length + 2,
                role: 'assistant',
                content: `I understand you're asking about "${input}". This is a great question! Let me break it down for you...\n\nThis feature will be powered by advanced AI to provide personalized explanations, code reviews, and learning guidance.`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSuggestedQuestion = (question: string) => {
        setInput(question);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-purple-600">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            AI Learning Assistant
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Your personal AI tutor for DSA and Computer Engineering
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-4 md:grid-cols-4"
            >
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                ))}
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Chat Interface */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card className="h-[600px] flex flex-col">
                        <CardHeader className="border-b">
                            <CardTitle className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                Chat with AI Tutor
                            </CardTitle>
                            <CardDescription>Ask anything about DSA, algorithms, or coding concepts</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col p-0">
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((message) => (
                                    <MessageBubble key={message.id} message={message} />
                                ))}
                                {isTyping && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <Bot className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex gap-1 p-4 rounded-lg bg-muted">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                className="w-2 h-2 bg-primary rounded-full"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                className="w-2 h-2 bg-primary rounded-full"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                className="w-2 h-2 bg-primary rounded-full"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Ask me anything..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSend} disabled={!input.trim()}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Suggested Questions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Suggested Questions</CardTitle>
                            <CardDescription>Click to ask</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {suggestedQuestions.map((question, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="w-full justify-start text-left h-auto py-3"
                                    onClick={() => handleSuggestedQuestion(question)}
                                >
                                    <Lightbulb className="h-4 w-4 mr-2 shrink-0" />
                                    <span className="text-sm">{question}</span>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Pro Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                                <p className="text-muted-foreground">Be specific with your questions for better answers</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Code className="h-4 w-4 text-blue-500 mt-0.5" />
                                <p className="text-muted-foreground">Share code snippets for detailed reviews</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-purple-500 mt-0.5" />
                                <p className="text-muted-foreground">Ask for hints instead of direct solutions</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

function FeatureCard({ feature, index }: any) {
    const Icon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card>
                <CardContent className="p-6">
                    <Icon className={`h-8 w-8 ${feature.color} mb-3`} />
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
        >
            <div className={`p-2 rounded-full ${isUser ? 'bg-primary' : 'bg-primary/10'}`}>
                {isUser ? (
                    <User className={`h-5 w-5 ${isUser ? 'text-white' : 'text-primary'}`} />
                ) : (
                    <Bot className="h-5 w-5 text-primary" />
                )}
            </div>
            <div className={`flex-1 max-w-[80%] ${isUser ? 'flex justify-end' : ''}`}>
                <div className={`p-4 rounded-lg ${isUser ? 'bg-primary text-white' : 'bg-muted'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </motion.div>
    );
}
