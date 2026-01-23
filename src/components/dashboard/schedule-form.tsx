"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Subject {
    id: string;
    name: string;
    color: string;
}

export interface ScheduleFormData {
    subject_id: string;
    title: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
}

interface ScheduleFormProps {
    subjects: Subject[];
    initialData?: ScheduleFormData;
    onSubmit: (data: ScheduleFormData) => void;
    onCancel: () => void;
    submitLabel?: string;
}

export const ScheduleForm = ({
    subjects,
    initialData,
    onSubmit,
    onCancel,
    submitLabel = "Save"
}: ScheduleFormProps) => {
    const [formData, setFormData] = useState<ScheduleFormData>(
        initialData || {
            subject_id: "",
            title: "",
            description: "",
            date: new Date().toISOString().split('T')[0],
            start_time: "",
            end_time: ""
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="subject">Subject</Label>
                <Select
                    value={formData.subject_id}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, subject_id: value }))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                                {subject.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Study session title"
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Optional description"
                />
            </div>
            <div>
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="start_time">Start Time</Label>
                    <Input
                        id="start_time"
                        type="time"
                        value={formData.start_time}
                        onChange={(e) => setFormData((prev) => ({ ...prev, start_time: e.target.value }))}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="end_time">End Time</Label>
                    <Input
                        id="end_time"
                        type="time"
                        value={formData.end_time}
                        onChange={(e) => setFormData((prev) => ({ ...prev, end_time: e.target.value }))}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">{submitLabel}</Button>
            </div>
        </form>
    );
};
