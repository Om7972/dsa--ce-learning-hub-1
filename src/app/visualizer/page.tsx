import { AlgorithmVisualizer } from "@/components/dsa/algorithm-visualizer";
import { MainNav } from "@/components/layout/main-nav";

export default function VisualizerPage() {
    return (
        <div className="min-h-screen bg-background">
            <MainNav />
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-display mb-2 text-gradient inline-block">Algorithm Visualizer</h1>
                    <p className="text-muted-foreground">Visualize and understand sorting algorithms in real-time.</p>
                </div>
                <AlgorithmVisualizer />
            </div>
        </div>
    );
}
