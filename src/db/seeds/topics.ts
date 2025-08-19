import { db } from '@/db';
import { topics } from '@/db/schema';

async function main() {
    const sampleTopics = [
        // Subject 1: Data Structures (subjectId: 1)
        {
            subjectId: 1,
            name: 'Arrays and Lists',
            description: 'Understanding fundamental linear data structures.',
            orderIndex: 1,
            estimatedHours: 3,
        },
        {
            subjectId: 1,
            name: 'Stacks and Queues',
            description: 'LIFO and FIFO data structures and their applications.',
            orderIndex: 2,
            estimatedHours: 4,
        },
        {
            subjectId: 1,
            name: 'Trees and Binary Trees',
            description: 'Hierarchical data structures, properties, and traversals.',
            orderIndex: 3,
            estimatedHours: 6,
        },
        {
            subjectId: 1,
            name: 'Graphs and Graph Algorithms',
            description: 'Non-linear data structures and common algorithms like BFS, DFS, Dijkstra.',
            orderIndex: 4,
            estimatedHours: 8,
        },
        {
            subjectId: 1,
            name: 'Hash Tables and Maps',
            description: 'Key-value pairs, hashing functions, and collision resolution.',
            orderIndex: 5,
            estimatedHours: 5,
        },

        // Subject 2: Algorithms (subjectId: 2)
        {
            subjectId: 2,
            name: 'Sorting Algorithms',
            description: 'Comparison-based and non-comparison-based sorting techniques (e.g., Merge Sort, Quick Sort).',
            orderIndex: 1,
            estimatedHours: 5,
        },
        {
            subjectId: 2,
            name: 'Search Algorithms',
            description: 'Techniques for finding elements in data structures (e.g., Binary Search, DFS, BFS).',
            orderIndex: 2,
            estimatedHours: 4,
        },
        {
            subjectId: 2,
            name: 'Dynamic Programming',
            description: 'Solving complex problems by breaking them into simpler overlapping subproblems.',
            orderIndex: 3,
            estimatedHours: 10,
        },
        {
            subjectId: 2,
            name: 'Greedy Algorithms',
            description: 'Making locally optimal choices hoping to find a global optimum.',
            orderIndex: 4,
            estimatedHours: 6,
        },

        // Subject 3: System Design (subjectId: 3)
        {
            subjectId: 3,
            name: 'Scalability Principles',
            description: 'Designing systems to handle increasing load and data.',
            orderIndex: 1,
            estimatedHours: 8,
        },
        {
            subjectId: 3,
            name: 'Microservices Architecture',
            description: 'Breaking down applications into small, independent services.',
            orderIndex: 2,
            estimatedHours: 12,
        },
        {
            subjectId: 3,
            name: 'Load Balancing and Caching',
            description: 'Distributing traffic and optimizing data access for performance.',
            orderIndex: 3,
            estimatedHours: 10,
        },

        // Subject 4: Database Systems (subjectId: 4)
        {
            subjectId: 4,
            name: 'SQL Fundamentals',
            description: 'Mastering standard query language for relational databases.',
            orderIndex: 1,
            estimatedHours: 6,
        },
        {
            subjectId: 4,
            name: 'Database Design and Normalization',
            description: 'Principles for structuring relational databases to reduce redundancy and improve data integrity.',
            orderIndex: 2,
            estimatedHours: 8,
        },
        {
            subjectId: 4,
            name: 'Transactions and ACID Properties',
            description: 'Understanding reliable transaction processing in databases.',
            orderIndex: 3,
            estimatedHours: 6,
        },
        {
            subjectId: 4,
            name: 'NoSQL Databases',
            description: 'Introduction to non-relational databases (e.g., Document, Key-Value, Graph, Column-Family).',
            orderIndex: 4,
            estimatedHours: 7,
        },

        // Subject 5: Object-Oriented Programming (subjectId: 5)
        {
            subjectId: 5,
            name: 'OOP Principles (Encapsulation, Inheritance, Polymorphism)',
            description: 'Core concepts of object-oriented design for building modular software.',
            orderIndex: 1,
            estimatedHours: 7,
        },
        {
            subjectId: 5,
            name: 'Design Patterns',
            description: 'Common solutions to recurring problems in software design.',
            orderIndex: 2,
            estimatedHours: 9,
        },

        // Subject 6: Web Development (subjectId: 6)
        {
            subjectId: 6,
            name: 'HTML & CSS Fundamentals',
            description: 'Building the structure and styling the presentation of web pages.',
            orderIndex: 1,
            estimatedHours: 5,
        },
        {
            subjectId: 6,
            name: 'JavaScript Basics',
            description: 'Client-side scripting for interactive web experiences.',
            orderIndex: 2,
            estimatedHours: 8,
        },
        {
            subjectId: 6,
            name: 'Frontend Frameworks (React/Angular/Vue)',
            description: 'Developing single-page applications with modern frameworks.',
            orderIndex: 3,
            estimatedHours: 15,
        },
        {
            subjectId: 6,
            name: 'Backend Development (Node.js/Python/Go)',
            description: 'Building server-side logic and APIs for web applications.',
            orderIndex: 4,
            estimatedHours: 12,
        },
        {
            subjectId: 6,
            name: 'RESTful APIs',
            description: 'Designing and interacting with web services using REST principles.',
            orderIndex: 5,
            estimatedHours: 6,
        },

        // Subject 7: Cloud Computing (subjectId: 7)
        {
            subjectId: 7,
            name: 'Introduction to Cloud Concepts (IaaS, PaaS, SaaS)',
            description: 'Understanding different service models and benefits of cloud computing.',
            orderIndex: 1,
            estimatedHours: 4,
        },
        {
            subjectId: 7,
            name: 'Cloud Providers (AWS/Azure/GCP Basics)',
            description: 'Getting started with fundamental services on major cloud platforms.',
            orderIndex: 2,
            estimatedHours: 8,
        },

        // Subject 8: Version Control (subjectId: 8)
        {
            subjectId: 8,
            name: 'Git Fundamentals',
            description: 'Essential commands for tracking changes and collaborating on projects.',
            orderIndex: 1,
            estimatedHours: 4,
        },
        {
            subjectId: 8,
            name: 'Branching and Merging Strategies',
            description: 'Advanced Git workflows for team development (e.g., Gitflow, Feature Branching).',
            orderIndex: 2,
            estimatedHours: 5,
        },
    ];

    await db.insert(topics).values(sampleTopics);

    console.log('✅ Topics seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});