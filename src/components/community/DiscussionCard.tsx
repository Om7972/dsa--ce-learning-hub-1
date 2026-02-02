"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ThumbsUp, ChevronUp, MoreVertical, Flag } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DiscussionCardProps {
    discussion: {
        id: number;
        title: string;
        content: string;
        topic: string;
        category: string;
        upvotes: number;
        created_at: string;
        user_id: string;
        users?: {
            full_name: string | null;
        } | null;
        discussion_replies: { count: number }[]; // Aggregate count if possible, or we fetch separate
    };
    currentUserId?: string;
}

export function DiscussionCard({ discussion, currentUserId }: DiscussionCardProps) {
    const [upvotes, setUpvotes] = useState(discussion.upvotes);
    const [hasVoted, setHasVoted] = useState(false); // We need to check this status ideally
    const supabase = createSupabaseBrowserClient();

    const handleVote = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!currentUserId) {
            toast.error("Please login to vote");
            return;
        }

        // Optimistic UI
        const newUpvotes = hasVoted ? upvotes - 1 : upvotes + 1;
        setUpvotes(newUpvotes);
        setHasVoted(!hasVoted);

        try {
            // 1. Check if vote exists
            const { data: existingVote } = await supabase
                .from("discussion_votes")
                .select("*")
                .eq("user_id", currentUserId)
                .eq("item_id", discussion.id)
                .eq("item_type", "discussion")
                .single();

            if (existingVote) {
                // Remove vote
                await supabase.from("discussion_votes").delete().eq("id", existingVote.id);
                await supabase
                    .from("discussions")
                    .update({ upvotes: newUpvotes })
                    .eq("id", discussion.id);
            } else {
                // Add vote
                await supabase.from("discussion_votes").insert({
                    user_id: currentUserId,
                    item_id: discussion.id,
                    item_type: "discussion",
                    vote_type: 1,
                });
                await supabase
                    .from("discussions")
                    .update({ upvotes: newUpvotes })
                    .eq("id", discussion.id);
            }
        } catch (error) {
            // Revert on error
            setUpvotes(discussion.upvotes);
            setHasVoted(!!hasVoted); // toggle back
            toast.error("Failed to vote");
        }
    };

    const replyCount = discussion.discussion_replies?.[0]?.count || 0;

    return (
        <Link href={`/community/${discussion.id}`} className="block group">
            <div className="border rounded-xl p-4 sm:p-6 bg-card hover:bg-accent/50 transition-colors shadow-sm">
                <div className="flex gap-4">
                    {/* Vote Column */}
                    <div className="flex flex-col items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-8 w-8 hover:bg-transparent", hasVoted && "text-primary")}
                            onClick={handleVote}
                        >
                            <ChevronUp className="h-6 w-6" />
                        </Button>
                        <span className="text-sm font-medium font-mono">{upvotes}</span>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                    {discussion.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                    <span className="font-medium text-foreground">
                                        {discussion.users?.full_name || "Anonymous"}
                                    </span>
                                    <span>•</span>
                                    <span>{formatDistanceToNow(new Date(discussion.created_at))} ago</span>
                                    <span>•</span>
                                    <Badge variant="secondary" className="text-xs py-0 h-5">
                                        {discussion.topic}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {discussion.content.replace(/[*#_`]/g, '')}
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MessageSquare className="h-4 w-4" />
                                <span>{replyCount} replies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
