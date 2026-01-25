"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";
import {
  Code2,
  BookOpen,
  Trophy,
  Users,
  Brain,
  Rocket,
  ChevronRight,
  Terminal,
  Activity,
  CheckCircle2,
  Zap,
  Shield
} from "lucide-react";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#333333]">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-4xl"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#474747] text-xs font-medium text-primary mb-8 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                New: Computer Engineering Subjects Added
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-bold font-display leading-tight mb-6 text-white text-left">
                Master <span className="text-primary">Algorithms</span> <br />
                Like a Pro
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-[#a1a1aa] mb-10 max-w-2xl leading-relaxed text-left">
                The most advanced platform for CS students. Visualize complex data structures, practice coding, and ace your exams with AI-powered learning paths.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-md">
                    Get Started Free <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-[#474747] border-transparent text-white hover:bg-[#525252] rounded-md">
                    Explore Features
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-10 border-y border-border/40 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <p className="text-center text-sm text-muted-foreground mb-6">TRUSTED BY TOP ENGINEERING STUDENTS FROM</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="font-bold text-xl flex items-center gap-2"><Terminal className="h-6 w-6" /> IIT Bombay</div>
              <div className="font-bold text-xl flex items-center gap-2"><Activity className="h-6 w-6" /> BITS Pilani</div>
              <div className="font-bold text-xl flex items-center gap-2"><Shield className="h-6 w-6" /> NIT Trichy</div>
              <div className="font-bold text-xl flex items-center gap-2"><Zap className="h-6 w-6" /> DTU</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-background relative" id="features">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Why choose <span className="text-primary">DSA Master</span>?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We combine interactive learning with rigorous practice to help you truly understand the concepts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-8 w-8 text-primary" />}
                title="3D Algo Visualizer"
                description="Don't just read code. Watch algorithms run in real-time with our advanced 3D visualization engine."
              />
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-blue-500" />}
                title="Comprehensive Curriculum"
                description="From Arrays to Graphs, OS to DBMS, we cover every subject needed for your placement and GATE."
              />
              <FeatureCard
                icon={<Activity className="h-8 w-8 text-green-500" />}
                title="Smart Analytics"
                description="Track your consistency, solve speed, and weak areas with our detailed performance dashboard."
              />
              <FeatureCard
                icon={<Code2 className="h-8 w-8 text-purple-500" />}
                title="In-Browser IDE"
                description="Write, compile, and run code in C++, Java, Python, and JavaScript without leaving your browser."
              />
              <FeatureCard
                icon={<Trophy className="h-8 w-8 text-amber-500" />}
                title="Gamified Learning"
                description="Earn XP, unlock badges, and climb the leaderboard as you master new concepts."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-pink-500" />}
                title="Peer Learning"
                description="Join a community of 10,000+ students. Discuss problems, share solutions, and grow together."
              />
            </div>
          </div>
        </section>

        {/* Curriculum Preview */}
        <section className="py-24 bg-secondary/20 relative" id="curriculum">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold font-display">Structured <span className="text-gradient">Learning Paths</span></h2>
                <p className="text-lg text-muted-foreground">
                  Stop getting lost in random tutorials. Follow our expert-curated paths designed to take you from beginner to expert.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-lg">Foundation Phase</h4>
                      <p className="text-muted-foreground">Master programming basics (C++/Java) and basic Data Structures.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-lg">Advanced DSA</h4>
                      <p className="text-muted-foreground">Deep dive into Trees, Graphs, DP, and Greedy Algorithms.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-lg">CS Core Subjects</h4>
                      <p className="text-muted-foreground">Operating Systems, DBMS, Computer Networks for interviews.</p>
                    </div>
                  </div>
                </div>
                <Link href="/curriculum">
                  <Button className="pink-glow px-8">View Full Curriculum</Button>
                </Link>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative glass-card p-6 rounded-2xl border border-primary/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-4 border-b border-border pb-4">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-secondary rounded-full w-full mb-2">
                        <div className="h-full bg-green-500 rounded-full w-[75%]" />
                      </div>
                      <p className="text-xs text-muted-foreground">Overall Progress</p>
                    </div>
                    <span className="font-bold">75%</span>
                  </div>
                  <div className="space-y-3">
                    {['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & BST'].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                        <span className="font-medium">{item}</span>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 relative" id="pricing">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Simple, transparent <span className="text-primary">pricing</span></h2>
              <p className="text-muted-foreground text-lg">Start for free, upgrade when you're ready to commit.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="glass-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-colors relative">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="text-muted-foreground mb-6">For beginners just starting out</p>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Access to Basic DSA</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> 50 Practice Problems</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Community Support</li>
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="glass-card p-8 rounded-2xl border border-primary relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-muted-foreground mb-6">For serious students needing results</p>
                <div className="text-4xl font-bold mb-6">$19<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> All DSA & CS Subjects</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Unlimited Practice</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Priority Support</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Certificate of Completion</li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full pink-glow">Join Pro</Button>
                </Link>
              </div>

              {/* Team Plan */}
              <div className="glass-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold mb-2">Institution</h3>
                <p className="text-muted-foreground mb-6">For colleges and bootcamps</p>
                <div className="text-4xl font-bold mb-6">Custom</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Admin Dashboard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Bulk Student Management</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Custom Curriculum</li>
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto glass-card p-12 rounded-3xl border border-primary/20 bg-background/50 backdrop-blur-xl">
              <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to launch your career?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of students mastering Computer Science today.
              </p>
              <Link href="/signup">
                <Button size="lg" className="h-14 px-10 text-lg font-bold pink-glow">
                  Start Learning for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-2xl glass-card hover:bg-secondary/50 transition-colors border border-border/50"
    >
      <div className="mb-6 p-4 rounded-xl bg-background border border-border w-fit shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}