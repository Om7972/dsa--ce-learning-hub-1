"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { CertificateView } from "@/components/certificates/CertificateView";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function CertificatePage() {
    const params = useParams();
    const id = params.id as string; // user provided unique_code
    const supabase = createSupabaseBrowserClient();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCertificate() {
            // Try to find by unique_code, if valid UUID
            const { data: cert, error } = await supabase
                .from("certificates")
                .select(`
            *,
            learning_paths (title)
        `)
                .eq("unique_code", id)
                .single();

            if (error || !cert) {
                setError(true);
            } else {
                setData(cert);
            }
            setLoading(false);
        }
        fetchCertificate();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Certificate not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
            <CertificateView
                studentName={data.user_name || "Student"}
                courseName={data.learning_paths?.title || "Course"}
                completionDate={format(new Date(data.issued_at), "MMMM do, yyyy")}
                certificateId={data.id.toString()}
                uniqueCode={data.unique_code}
            />
        </div>
    );
}
