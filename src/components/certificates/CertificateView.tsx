"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Share2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CertificateViewProps {
    studentName: string;
    courseName: string;
    completionDate: string;
    certificateId: string;
    uniqueCode: string;
}

export function CertificateView({
    studentName,
    courseName,
    completionDate,
    certificateId,
    uniqueCode
}: CertificateViewProps) {
    const certificateRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        const toastId = toast.loading("Generating certificate...");

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("l", "mm", "a4"); // landscape
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`certificate-${uniqueCode}.pdf`);
            toast.dismiss(toastId);
            toast.success("Certificate downloaded!");
        } catch (error) {
            console.error(error);
            toast.dismiss(toastId);
            toast.error("Failed to generate PDF.");
        }
    };

    const handleShare = () => {
        const url = `${window.location.origin}/certificates/${uniqueCode}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 md:p-8">
            <div className="flex gap-4">
                <Button onClick={handleDownload} className="gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                </Button>
                <Button variant="outline" onClick={handleShare} className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Link
                </Button>
            </div>

            <div
                ref={certificateRef}
                className="relative w-[800px] h-[600px] bg-white text-black p-8 shadow-2xl border-8 border-double border-yellow-600 rounded-sm flex flex-col items-center justify-center text-center overflow-hidden"
                style={{ fontFamily: "'Times New Roman', serif" }}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <Award className="w-96 h-96 text-black" />
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-24 h-24 border-t-4 border-l-4 border-yellow-600" />
                <div className="absolute top-4 right-4 w-24 h-24 border-t-4 border-r-4 border-yellow-600" />
                <div className="absolute bottom-4 left-4 w-24 h-24 border-b-4 border-l-4 border-yellow-600" />
                <div className="absolute bottom-4 right-4 w-24 h-24 border-b-4 border-r-4 border-yellow-600" />

                <div className="relative z-10 space-y-6">
                    <div className="mb-4">
                        <Award className="h-16 w-16 text-yellow-600 mx-auto mb-2" />
                        <h1 className="text-5xl font-bold tracking-wider text-gray-900 uppercase mb-2">
                            Certificate
                        </h1>
                        <span className="text-xl text-yellow-600 tracking-[0.2em] font-medium uppercase">
                            Of Completion
                        </span>
                    </div>

                    <p className="text-lg italic text-gray-600 mt-4">This guarantees that</p>

                    <h2 className="text-4xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 px-12 inline-block">
                        {studentName}
                    </h2>

                    <p className="text-lg italic text-gray-600 mt-4">Has successfully completed the course</p>

                    <h3 className="text-3xl font-bold text-primary mt-2">
                        {courseName}
                    </h3>

                    <p className="text-md text-gray-600 max-w-lg mx-auto mt-4">
                        Demonstrating exceptional proficiency in Data Structures and Algorithms.
                    </p>

                    <div className="flex justify-between items-end w-full max-w-xl mt-12 px-8">
                        <div className="text-center">
                            <div className="text-lg font-bold border-t border-black px-4 pt-1">
                                {completionDate}
                            </div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Date</p>
                        </div>

                        <div className="text-center">
                            {/* Signature Mock */}
                            <div className="font-script text-2xl px-4 pt-1 border-t border-black text-indigo-800" style={{ fontFamily: "cursive" }}>
                                DSA Learning Hub
                            </div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Instructor</p>
                        </div>
                    </div>

                    <div className="absolute bottom-6 text-[10px] text-gray-400 font-mono">
                        Certificate ID: {uniqueCode} <br />
                        Verify at {typeof window !== 'undefined' ? window.location.origin : ''}/certificates/{uniqueCode}
                    </div>
                </div>
            </div>
        </div>
    );
}
