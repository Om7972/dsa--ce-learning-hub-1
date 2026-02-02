
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowRight, Lock, Unlock, CheckCircle } from 'lucide-react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType,
    Node,
    Edge
} from 'reactflow';
import 'reactflow/dist/style.css';

interface SubjectNode {
    id: string;
    data: { label: string; status: 'completed' | 'unlocked' | 'locked' };
    position: { x: number; y: number };
    type?: string;
}

const initialNodes: Node[] = [
    { id: 'CE301', position: { x: 250, y: 0 }, data: { label: 'COA (CE301)', status: 'completed' }, style: { background: '#dcfce7', border: '2px solid #22c55e', borderRadius: '8px', padding: '10px', width: 180 } },
    { id: 'CE306', position: { x: 50, y: 0 }, data: { label: 'TOC (CE306)', status: 'unlocked' }, style: { background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px', width: 180 } },
    { id: 'CE304', position: { x: 250, y: 150 }, data: { label: 'OS (CE304)', status: 'unlocked' }, style: { background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px', width: 180 } },
    { id: 'CE302', position: { x: 50, y: 150 }, data: { label: 'DBMS (CE302)', status: 'locked' }, style: { background: '#f3f4f6', border: '2px solid #9ca3af', borderRadius: '8px', padding: '10px', width: 180 } },
    { id: 'CE303', position: { x: 250, y: 300 }, data: { label: 'Networks (CE303)', status: 'locked' }, style: { background: '#f3f4f6', border: '2px solid #9ca3af', borderRadius: '8px', padding: '10px', width: 180 } },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: 'CE301', target: 'CE304', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-3', source: 'CE306', target: 'CE302', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3-4', source: 'CE304', target: 'CE303', markerEnd: { type: MarkerType.ArrowClosed } },
];

export default function SubjectGraphPage() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // In a real implementation, fetch edges from /api/subject-dependencies and build the graph dynamically

    return (
        <div className="h-[calc(100vh-100px)] w-full flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-background z-10">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Network className="w-6 h-6 text-primary" />
                        Subject Dependency Graph
                    </h1>
                    <p className="text-muted-foreground text-sm">Visual learning path & prerequisites unlocker</p>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-100 border border-green-500 rounded"></div> Completed</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-100 border border-blue-500 rounded"></div> Unlocked</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-100 border border-gray-400 rounded"></div> Locked</div>
                </div>
            </div>

            <div className="flex-1 bg-muted/10 relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    attributionPosition="bottom-right"
                >
                    <Background />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
        </div>
    );
}
