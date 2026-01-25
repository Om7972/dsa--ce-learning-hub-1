import { SubjectCoverageGrid } from "@/components/subjects/subject-coverage-grid";
import { MainNav } from "@/components/layout/main-nav";

export default function CurriculumPage() {
    return (
        <div className="min-h-screen bg-background">
            <MainNav />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-8 font-display">Curriculum & Subjects</h1>
                <SubjectCoverageGrid />
            </div>
        </div>
    );
}
