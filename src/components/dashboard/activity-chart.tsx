'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', activity: 4 },
    { name: 'Tue', activity: 3 },
    { name: 'Wed', activity: 5 },
    { name: 'Thu', activity: 2 },
    { name: 'Fri', activity: 6 },
    { name: 'Sat', activity: 8 },
    { name: 'Sun', activity: 7 },
];

export function ActivityChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="activity" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
