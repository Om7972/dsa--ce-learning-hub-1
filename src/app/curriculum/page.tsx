import { SubjectCoverageGrid } from "@/components/subjects/subject-coverage-grid";

export default function CurriculumPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 font-display">Curriculum & Subjects</h1>
            <SubjectCoverageGrid />
        </div>
    );
}
