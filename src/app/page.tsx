"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
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
  Shield,
  Sparkles,
  Target,
  TrendingUp
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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <main className="flex-1">
        {/* 3D Animated Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-purple-500/10">
            {/* Floating Orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
            />
          </div>

          {/* 3D Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

          {/* Floating Code Blocks */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateY: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-32 right-10 md:right-32 opacity-20"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 shadow-2xl">
              <code className="text-primary text-sm">
                {`function solve() {\n  return "DSA";\n}`}
              </code>
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 20, 0],
              rotateY: [0, -10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-32 left-10 md:left-32 opacity-20"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 shadow-2xl">
              <code className="text-purple-500 text-sm">
                {`class Node {\n  data: any;\n}`}
              </code>
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            style={{ y, opacity }}
            className="container mx-auto px-6 relative z-10"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-5xl mx-auto text-center"
            >
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
                <Sparkles className="h-4 w-4" />
                <span>New: AI-Powered Learning Assistant</span>
                <Sparkles className="h-4 w-4" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold leading-tight mb-6">
                Master <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">DSA & CE</span>
                <br />
                <span className="text-5xl md:text-7xl">Like Never Before</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                The most advanced platform for Computer Engineering students.
                <span className="text-primary font-semibold"> Visualize, Practice, Excel</span> with AI-powered learning paths.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white rounded-full shadow-lg shadow-primary/50 group">
                    Start Learning Free
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2">
                    Explore Features
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <StatCard icon={Users} label="Active Students" value="10,000+" />
                <StatCard icon={Code2} label="Problems" value="500+" />
                <StatCard icon={BookOpen} label="Subjects" value="15+" />
                <StatCard icon={Trophy} label="Success Rate" value="95%" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Trusted By */}
        <section className="py-16 border-y border-border/40 bg-muted/30">
          <div className="container mx-auto px-6">
            <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">Trusted by students from</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="font-bold text-xl flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Terminal className="h-6 w-6" /> IIT Bombay
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="font-bold text-xl flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Activity className="h-6 w-6" /> BITS Pilani
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="font-bold text-xl flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Shield className="h-6 w-6" /> NIT Trichy
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="font-bold text-xl flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Zap className="h-6 w-6" /> DTU
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-background relative" id="features">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  Why choose <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">our platform</span>?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  We combine interactive learning with rigorous practice to help you truly understand the concepts.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-8 w-8 text-primary" />}
                title="AI Learning Assistant"
                description="Get personalized hints and explanations powered by advanced AI. Never get stuck again."
                delay={0}
              />
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-blue-500" />}
                title="Comprehensive Curriculum"
                description="From Arrays to Graphs, OS to DBMS, we cover every subject needed for placements and GATE."
                delay={0.1}
              />
              <FeatureCard
                icon={<Activity className="h-8 w-8 text-green-500" />}
                title="Smart Analytics"
                description="Track your consistency, solve speed, and weak areas with detailed performance dashboards."
                delay={0.2}
              />
              <FeatureCard
                icon={<Code2 className="h-8 w-8 text-purple-500" />}
                title="In-Browser IDE"
                description="Write, compile, and run code in C++, Java, Python, and JavaScript without leaving your browser."
                delay={0.3}
              />
              <FeatureCard
                icon={<Trophy className="h-8 w-8 text-amber-500" />}
                title="Gamified Learning"
                description="Earn XP, unlock badges, and climb the leaderboard as you master new concepts."
                delay={0.4}
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-pink-500" />}
                title="Peer Learning"
                description="Join a community of 10,000+ students. Discuss problems, share solutions, and grow together."
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-purple-500/10 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">level up</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of students who are already mastering DSA and acing their placements.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white rounded-full shadow-lg shadow-primary/50">
                  Start Your Journey Today
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center"
    >
      <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}