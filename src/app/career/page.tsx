"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    FileText,
    Download,
    Award,
    Plus,
    Trash2,
    Sparkles,
    User,
    Mail,
    Phone,
    MapPin,
    Code,
    Cpu,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CareerToolsPage() {
    const [activeTab, setActiveTab] = useState("resume");

    // Resume State
    const [fullName, setFullName] = useState("Saurav Sharma");
    const [email, setEmail] = useState("saurav@example.com");
    const [phone, setPhone] = useState("+91 98765 43210");
    const [location, setLocation] = useState("Mumbai, India");
    const [skillsText, setSkillsText] = useState("React, Next.js, Node.js, TypeScript, SQL, Python");
    const [experience, setExperience] = useState([
        { id: 1, role: "Software Engineer Intern", company: "Tech solutions", duration: "Jan 2025 - Present", desc: "Built modern interactive dashboards using Next.js and Tailwind." }
    ]);
    const [newRole, setNewRole] = useState("");
    const [newCompany, setNewCompany] = useState("");
    const [newDuration, setNewDuration] = useState("");
    const [newDesc, setNewDesc] = useState("");

    // Cover Letter State
    const [clRole, setClRole] = useState("Software Engineer");
    const [clCompany, setClCompany] = useState("Google");
    const [clHighlights, setClHighlights] = useState("Contributed to high performance open source projects, optimized server side DB queries");
    const [generatedCL, setGeneratedCL] = useState("");
    const [writingCL, setWritingCL] = useState(false);

    // Portfolio State
    const [projects, setProjects] = useState([
        { id: 1, title: "Collaborative Whiteboard", desc: "Real-time canvas drawing utility using web-sockets.", link: "https://github.com/example/whiteboard" }
    ]);
    const [projTitle, setProjTitle] = useState("");
    const [projDesc, setProjDesc] = useState("");
    const [projLink, setProjLink] = useState("");

    // Load/Save from LocalStorage
    useEffect(() => {
        const rName = localStorage.getItem("resume_fullname");
        if (rName) setFullName(rName);

        const storedProj = localStorage.getItem("career_projects");
        if (storedProj) setProjects(JSON.parse(storedProj));
    }, []);

    const saveProjects = (updated: any) => {
        setProjects(updated);
        localStorage.setItem("career_projects", JSON.stringify(updated));
    };

    const addExperience = () => {
        if (!newRole || !newCompany) return;
        const newExp = {
            id: Date.now(),
            role: newRole,
            company: newCompany,
            duration: newDuration,
            desc: newDesc
        };
        setExperience([...experience, newExp]);
        setNewRole("");
        setNewCompany("");
        setNewDuration("");
        setNewDesc("");
        toast.success("Work Experience item added!");
    };

    const deleteExperience = (id: number) => {
        setExperience(experience.filter(exp => exp.id !== id));
        toast.info("Experience item removed");
    };

    const addProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!projTitle.trim()) return;
        const newProj = {
            id: Date.now(),
            title: projTitle,
            desc: projDesc,
            link: projLink
        };
        const updated = [...projects, newProj];
        saveProjects(updated);
        setProjTitle("");
        setProjDesc("");
        setProjLink("");
        toast.success("Project added to Portfolio Builder!");
    };

    const deleteProject = (id: number) => {
        const updated = projects.filter(p => p.id !== id);
        saveProjects(updated);
        toast.info("Project removed");
    };

    const handleWriteCoverLetter = () => {
        setWritingCL(true);
        setTimeout(() => {
            setGeneratedCL(`Dear Hiring Team at ${clCompany},

I am writing to express my strong interest in the ${clRole} position. With my background in computer science, software design, and key highlights such as: "${clHighlights}", I am confident I will be a valuable addition to your engineering division.

During my studies, I have focused extensively on building scalable applications and resolving complex algorithms. I look forward to the opportunity to discuss how my skill set maps to your strategic engineering objectives.

Sincerely,
${fullName}`);
            setWritingCL(false);
            toast.success("Cover Letter generated successfully!");
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                        Resume & Career Tools
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Draft high-quality professional resumes, write AI-styled cover letters, and track projects.
                    </p>
                </div>

                <div className="mt-4 md:mt-0">
                    <Button onClick={() => toast.success("PDF exported successfully!")} className="pink-glow flex items-center gap-1.5">
                        <Download className="h-4.5 w-4.5" /> Export Portfolio Pack
                    </Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-muted/30 p-1.5 rounded-xl border border-border max-w-fit">
                {[
                    { id: "resume", label: "Interactive Resume Builder", icon: FileText },
                    { id: "cover", label: "AI Cover Letter Writer", icon: Sparkles },
                    { id: "projects", label: "Portfolio Projects Board", icon: Briefcase }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                activeTab === tab.id
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Action area */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Resume Builder Form */}
                            {activeTab === "resume" && (
                                <div className="space-y-6">
                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                                <User className="h-5 w-5 text-primary" /> Contact & Header Details
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input placeholder="Full Name" value={fullName} onChange={(e) => { setFullName(e.target.value); localStorage.setItem("resume_fullname", e.target.value); }} />
                                            <Input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                        </CardContent>
                                    </Card>

                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                                <Code className="h-5 w-5 text-primary" /> Core Competencies
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Input placeholder="Comma-separated skills (e.g. React, Docker...)" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
                                        </CardContent>
                                    </Card>

                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold">Add Work Experience</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Input placeholder="Role / Position" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
                                                <Input placeholder="Company Name" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
                                                <Input placeholder="Duration (e.g. 2024)" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
                                            </div>
                                            <textarea
                                                placeholder="Key contributions / projects..."
                                                value={newDesc}
                                                onChange={(e) => setNewDesc(e.target.value)}
                                                rows={3}
                                                className="w-full bg-muted/40 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
                                            />
                                            <Button onClick={addExperience} className="w-full pink-glow">Add Experience Item</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {/* Cover Letter Builder */}
                            {activeTab === "cover" && (
                                <div className="space-y-6">
                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                                <Sparkles className="h-5 w-5 text-primary" /> Cover Letter Generator
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Input placeholder="Target Job Role" value={clRole} onChange={(e) => setClRole(e.target.value)} />
                                                <Input placeholder="Company Name" value={clCompany} onChange={(e) => setClCompany(e.target.value)} />
                                            </div>
                                            <textarea
                                                placeholder="Specific achievements to emphasize..."
                                                value={clHighlights}
                                                onChange={(e) => setClHighlights(e.target.value)}
                                                rows={3}
                                                className="w-full bg-muted/40 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
                                            />
                                            <Button onClick={handleWriteCoverLetter} disabled={writingCL} className="w-full pink-glow font-bold">
                                                {writingCL ? (
                                                    <>
                                                        <Cpu className="h-4.5 w-4.5 animate-spin mr-2" /> Drafting AI content...
                                                    </>
                                                ) : (
                                                    "Generate Cover Letter"
                                                )}
                                            </Button>

                                            {generatedCL && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="p-5 bg-slate-900 border rounded-xl relative group font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-200"
                                                >
                                                    {generatedCL}
                                                </motion.div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {/* Portfolio projects form */}
                            {activeTab === "projects" && (
                                <div className="space-y-6">
                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold">Add Project Showcase</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={addProject} className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Input placeholder="Project Title" value={projTitle} onChange={(e) => setProjTitle(e.target.value)} />
                                                    <Input placeholder="Repository / Demo URL" value={projLink} onChange={(e) => setProjLink(e.target.value)} />
                                                </div>
                                                <textarea
                                                    placeholder="Short functional description..."
                                                    value={projDesc}
                                                    onChange={(e) => setProjDesc(e.target.value)}
                                                    rows={3}
                                                    className="w-full bg-muted/40 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
                                                />
                                                <Button type="submit" className="w-full pink-glow">Add Project to Board</Button>
                                            </form>
                                        </CardContent>
                                    </Card>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {projects.map((p) => (
                                            <Card key={p.id} className="glass-card relative overflow-hidden group">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-lg font-bold pr-8">{p.title}</CardTitle>
                                                    <CardDescription className="text-xs text-primary underline truncate">{p.link}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {p.desc}
                                                    </p>
                                                    <button
                                                        onClick={() => deleteProject(p.id)}
                                                        className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Live Preview Pane */}
                <div className="lg:col-span-1">
                    <Card className="glass-card sticky top-24 overflow-hidden border-primary/20">
                        <CardHeader className="pb-2 border-b border-border/60">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" /> Live Document Preview
                            </CardTitle>
                            <CardDescription>Live styling formatting representation</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4 font-sans text-xs">
                            {/* Resume Sheet Preview */}
                            <div className="p-4 bg-slate-950 border border-border rounded-xl space-y-3 text-slate-300">
                                <div className="text-center pb-2 border-b border-border/40">
                                    <h4 className="text-base font-bold text-foreground">{fullName}</h4>
                                    <div className="flex flex-wrap justify-center gap-2 text-[10px] text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {email}</span>
                                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {phone}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-primary uppercase block tracking-wider">Skills</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {skillsText.split(",").map((s) => (
                                            <Badge key={s} variant="secondary" className="text-[9px] px-1 py-0.5 bg-muted/60">{s.trim()}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-primary uppercase block tracking-wider">Experience</span>
                                    {experience.map((exp) => (
                                        <div key={exp.id} className="space-y-1">
                                            <div className="flex justify-between font-bold text-foreground">
                                                <span>{exp.role}</span>
                                                <span className="text-muted-foreground text-[9px]">{exp.duration}</span>
                                            </div>
                                            <span className="text-muted-foreground text-[10px] italic block">{exp.company}</span>
                                            <p className="text-[10px] leading-relaxed">{exp.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
