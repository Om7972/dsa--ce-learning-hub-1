import { StudyTimetableDashboard } from "@/components/dashboard/study-timetable-dashboard";
import { MainNav } from "@/components/layout/main-nav";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <MainNav />
            <div className="container mx-auto py-8">
                <StudyTimetableDashboard />
            </div>
        </div>
    );
}
