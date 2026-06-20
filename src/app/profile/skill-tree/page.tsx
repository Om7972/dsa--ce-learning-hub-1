
'use client';

import { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, type Node, type Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Lock, Unlock, Network } from 'lucide-react';

const initialNodes: Node[] = [
    { id: 'root', position: { x: 250, y: 0 }, data: { label: 'Computer Science' }, style: { background: '#22c55e', color: 'white', fontWeight: 'bold' } },

    { id: 'dsa', position: { x: 100, y: 150 }, data: { label: 'Data Structures' }, style: { background: '#3b82f6', color: 'white' } },
    { id: 'web', position: { x: 400, y: 150 }, data: { label: 'Web Development' }, style: { background: '#f59e0b', color: 'white' } },

    { id: 'arrays', position: { x: 0, y: 300 }, data: { label: 'Arrays 101' }, style: { background: '#fff', border: '1px solid #ddd' } },
    { id: 'll', position: { x: 150, y: 300 }, data: { label: 'Linked Lists' }, style: { background: '#e5e7eb', border: '1px solid #777' } }, // Locked

    { id: 'react', position: { x: 350, y: 300 }, data: { label: 'React.js' }, style: { background: '#fff', border: '1px solid #ddd' } },
    { id: 'db', position: { x: 500, y: 300 }, data: { label: 'Databases' }, style: { background: '#fff', border: '1px solid #ddd' } },
];

const initialEdges: Edge[] = [
    { id: 'e1', source: 'root', target: 'dsa' },
    { id: 'e2', source: 'root', target: 'web' },
    { id: 'e3', source: 'dsa', target: 'arrays' },
    { id: 'e4', source: 'dsa', target: 'll' },
    { id: 'e5', source: 'web', target: 'react' },
    { id: 'e6', source: 'web', target: 'db' },
];

export default function SkillTreePage() {
    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-background z-10">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Network className="w-6 h-6 text-primary" />
                        Interactive Skill Tree
                    </h1>
                    <p className="text-muted-foreground text-sm">Visualize your knowledge growth and unlock new paths.</p>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div> Mastered</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div> In Progress</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200 border border-gray-400 rounded"></div> Locked</div>
                </div>
            </div>

            <div className="flex-1 bg-muted/10 relative">
                <ReactFlow
                    defaultNodes={initialNodes}
                    defaultEdges={initialEdges}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}
