import { db } from '@/db';
import { subjects } from '@/db/schema';

async function main() {
    const now = new Date().toISOString();

    const sampleSubjects = [
        {
            name: 'Data Structures',
            description: 'This subject covers fundamental data structures such as arrays, linked lists, stacks, queues, trees, and graphs. Students will learn how to choose and implement efficient data structures for various programming problems, understanding their time and space complexities. Topics include searching, sorting, and basic algorithm design principles.',
            category: 'dsa',
            difficultyLevel: 'beginner',
            createdAt: now,
        },
        {
            name: 'Algorithms',
            description: 'Delve into advanced algorithmic techniques including dynamic programming, greedy algorithms, divide and conquer, backtracking, and graph algorithms. Students will analyze algorithm efficiency, learn proof techniques, and apply these concepts to solve complex computational problems in areas like pathfinding, network flow, and optimization.',
            category: 'dsa',
            difficultyLevel: 'intermediate',
            createdAt: now,
        },
        {
            name: 'System Design',
            description: 'Explore the principles of designing large-scale distributed systems. Topics include scalability, reliability, consistency, fault tolerance, load balancing, caching, databases (SQL/NoSQL), messaging queues, and microservices architecture. Students will learn how to make architectural trade-offs and design systems for high availability and performance through case studies.',
            category: 'theory',
            difficultyLevel: 'advanced',
            createdAt: now,
        },
        {
            name: 'Database Systems',
            description: 'Understand the core concepts of relational database management systems (RDBMS) and an introduction to NoSQL databases. This subject covers data modeling, SQL query language (DDL, DML, DCL), normalization, indexing, transactions, concurrency control, and database security. Students will gain practical experience in designing and querying databases effectively.',
            category: 'programming',
            difficultyLevel: 'intermediate',
            createdAt: now,
        },
        {
            name: 'Computer Networks',
            description: 'Learn the fundamentals of computer networking, including the layered architecture (OSI model, TCP/IP stack), network protocols (HTTP, TCP, UDP, IP), routing, addressing, and network security. Topics also include local area networks (LANs), wide area networks (WANs), wireless networks, and emerging network technologies. Students will understand how data travels across the internet.',
            category: 'theory',
            difficultyLevel: 'intermediate',
            createdAt: now,
        },
        {
            name: 'Operating Systems',
            description: 'Examine the principles and components of modern operating systems. Topics include process management, CPU scheduling, memory management, virtual memory, file systems, I/O systems, deadlock handling, and concurrency. Students will gain insight into how operating systems manage hardware resources and provide services to applications.',
            category: 'theory',
            difficultyLevel: 'intermediate',
            createdAt: now,
        },
        {
            name: 'Software Engineering',
            description: 'Introduction to the methodologies and practices for developing high-quality software. Covers the software development life cycle (SDLC), requirements gathering, design patterns, testing strategies (unit, integration, system), version control, agile methodologies, project management, and software maintenance. Emphasizes collaboration and best practices for team-based software projects.',
            category: 'programming',
            difficultyLevel: 'beginner',
            createdAt: now,
        },
        {
            name: 'Machine Learning',
            description: 'An introduction to core concepts and algorithms in machine learning. Topics include supervised learning (linear regression, logistic regression, support vector machines, decision trees), unsupervised learning (clustering, dimensionality reduction), neural networks, deep learning basics, and model evaluation metrics. Students will apply ML techniques to solve real-world problems using programming libraries.',
            category: 'programming',
            difficultyLevel: 'advanced',
            createdAt: now,
        },
    ];

    await db.insert(subjects).values(sampleSubjects);
    
    console.log('✅ Subjects seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});