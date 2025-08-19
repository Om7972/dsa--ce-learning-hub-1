import { db } from '@/db';
import { assignments } from '@/db/schema';

async function main() {
    const today = new Date();

    const addDays = (date: Date, days: number) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate.toISOString();
    };

    const sampleAssignments = [
        // Data Structures (subjectId: 1)
        {
            subjectId: 1,
            title: 'Array Manipulation Project',
            description: 'Implement a series of functions to manipulate arrays, including sorting, searching, and filtering.',
            difficulty: 'easy',
            dueDate: addDays(today, 7), // 1 week from now
            points: 100,
            createdAt: new Date().toISOString(),
        },
        {
            subjectId: 1,
            title: 'Binary Tree Implementation',
            description: 'Develop a binary tree data structure with insertion, deletion, and traversal methods.',
            difficulty: 'medium',
            dueDate: addDays(today, 14), // 2 weeks from now
            points: 150,
            createdAt: new Date().toISOString(),
        },
        {
            subjectId: 1,
            title: 'Graph Traversal Assignment',
            description: 'Implement Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms for a given graph.',
            difficulty: 'hard',
            dueDate: addDays(today, 21), // 3 weeks from now
            points: 200,
            createdAt: new Date().toISOString(),
        },

        // Algorithms (subjectId: 2)
        {
            subjectId: 2,
            title: 'Sorting Algorithm Comparison',
            description: 'Compare the performance of different sorting algorithms (e.g., Merge Sort, Quick Sort, Bubble Sort).',
            difficulty: 'medium',
            dueDate: addDays(today, 10), // 10 days from now
            points: 120,
            createdAt: new Date().toISOString(),
        },
        {
            subjectId: 2,
            title: 'Dynamic Programming Challenges',
            description: 'Solve a set of problems using dynamic programming techniques, such as the knapsack problem or longest common subsequence.',
            difficulty: 'hard',
            dueDate: addDays(today, 18), // 2.5 weeks from now (approx 18 days)
            points: 180,
            createdAt: new Date().toISOString(),
        },
        {
            subjectId: 2,
            title: 'Search Algorithm Optimization',
            description: 'Optimize existing search algorithms for better performance on large datasets.',
            difficulty: 'medium',
            dueDate: addDays(today, 12), // 12 days from now
            points: 130,
            createdAt: new Date().toISOString(),
        },

        // Database (subjectId: 3)
        {
            subjectId: 3,
            title: 'SQL Query Design',
            description: 'Write complex SQL queries involving joins, subqueries, and aggregation functions.',
            difficulty: 'easy',
            dueDate: addDays(today, 7), // 1 week from now
            points: 80,
            createdAt: new Date().toISOString(),
        },
        {
            subjectId: 3,
            title: 'Database Schema Design Project',
            description: 'Design a normalized database schema for a given business requirement, including ER diagrams.',
            difficulty: 'medium',
            dueDate: addDays(today, 14), // 2 weeks from now
            points: 140,
            createdAt: new Date().toISOString(),
        },

        // Web Development (subjectId: 4)
        {
            subjectId: 4,
            title: 'Frontend Framework Introduction',
            description: 'Build a simple interactive web application using a modern frontend framework like React or Vue.',
            difficulty: 'easy',
            dueDate: addDays(today, 14), // 2 weeks from now
            points: 110,
            createdAt: new Date().toISOString(),
        },
        {
            subjectId: 4,
            title: 'Backend API Development',
            description: 'Create a RESTful API using Node.js and Express to manage resources.',
            difficulty: 'medium',
            dueDate: addDays(today, 28), // 4 weeks from now
            points: 160,
            createdAt: new Date().toISOString(),
        },

        // Operating Systems (subjectId: 5)
        {
            subjectId: 5,
            title: 'Process Management Simulation',
            description: 'Simulate process scheduling algorithms (e.g., FCFS, SJF, Round Robin).',
            difficulty: 'hard',
            dueDate: addDays(today, 21), // 3 weeks from now
            points: 170,
            createdAt: new Date().toISOString(),
        },

        // Networking (subjectId: 6)
        {
            subjectId: 6,
            title: 'Basic Network Configuration',
            description: 'Set up a basic local area network (LAN) and explain its components.',
            difficulty: 'easy',
            dueDate: addDays(today, 7), // 1 week from now
            points: 90,
            createdAt: new Date().toISOString(),
        },

        // Software Engineering (subjectId: 7)
        {
            subjectId: 7,
            title: 'Software Requirements Specification',
            description: 'Document functional and non-functional requirements for a hypothetical software system.',
            difficulty: 'medium',
            dueDate: addDays(today, 14), // 2 weeks from now
            points: 135,
            createdAt: new Date().toISOString(),
        },

        // Machine Learning (subjectId: 8)
        {
            subjectId: 8,
            title: 'Introduction to Supervised Learning',
            description: 'Implement a simple linear regression model and analyze its performance.',
            difficulty: 'medium',
            dueDate: addDays(today, 28), // 4 weeks from now
            points: 190,
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(assignments).values(sampleAssignments);
    
    console.log('✅ Assignments seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});