"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { CreateDiscussionDialog } from "@/components/community/CreateDiscussionDialog";
import { DiscussionCard } from "@/components/community/DiscussionCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search } from "lucide-react";

export default function CommunityPage() {
    const [discussions, setDiscussions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("latest");
    const [search, setSearch] = useState("");
    const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

    const supabase = createSupabaseBrowserClient();

    useEffect(() => {
        checkUser();
        fetchDiscussions();

        // Real-time subscription
        const channel = supabase
            .channel('public:discussions')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'discussions' }, (payload) => {
                // Simple strategy: Refetch to ensure consistency, or append manually
                fetchDiscussions();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sortBy]); // Re-fetch when sort changes

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setCurrentUserId(user.id);
    }

    async function fetchDiscussions() {
        setLoading(true);
        let query = supabase
            .from("discussions")
            .select(`
        *,
        users:user_id (full_name),
        discussion_replies (count)
      `);

        if (sortBy === "latest") {
            query = query.order("created_at", { ascending: false });
        } else if (sortBy === "top") {
            query = query.order("upvotes", { ascending: false });
        }

        const { data, error } = await query;
        if (data) {
            setDiscussions(data);
        }
        setLoading(false);
    }

    // Filter client-side for search to avoid complex DB queries for now
    const filteredDiscussions = discussions.filter(d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.content.toLowerCase().includes(search.toLowerCase()) ||
        d.topic.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container max-w-5xl py-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Community Discussions</h1>
                    <p className="text-muted-foreground mt-1">
                        Ask questions, share knowledge, and grow with the community.
                    </p>
                </div>
                <CreateDiscussionDialog />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/30 p-4 rounded-lg">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search discussions..."
                        className="pl-9 bg-background"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px] bg-background">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="top">Top Voted</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : filteredDiscussions.length === 0 ? (
                <div className="text-center py-20 border rounded-xl border-dashed">
                    <h3 className="text-lg font-medium">No discussions found</h3>
                    <p className="text-muted-foreground">Be the first to start a conversation!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredDiscussions.map((discussion) => (
                        <DiscussionCard
                            key={discussion.id}
                            discussion={discussion}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
