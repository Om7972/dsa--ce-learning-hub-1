import { db } from '@/db';
import { userProgress } from '@/db/schema';

async function main() {
    const sampleUserProgress = [
        // User 1 (admin): completed 3 topics from Data Structures
        {
            userId: 1,
            topicId: 1, // Example: Data Structures topic 1
            status: 'completed',
            completionDate: new Date('2024-03-01T10:00:00Z').toISOString(),
        },
        {
            userId: 1,
            topicId: 2, // Example: Data Structures topic 2
            status: 'completed',
            completionDate: new Date('2024-03-05T14:30:00Z').toISOString(),
        },
        {
            userId: 1,
            topicId: 3, // Example: Data Structures topic 3
            status: 'completed',
            completionDate: new Date('2024-03-10T09:15:00Z').toISOString(),
        },

        // User 3 (student): in_progress on 2 topics from Algorithms, completed 1 from Data Structures
        {
            userId: 3,
            topicId: 10, // Example: Algorithms topic 1 (in_progress)
            status: 'in_progress',
            completionDate: null,
        },
        {
            userId: 3,
            topicId: 11, // Example: Algorithms topic 2 (in_progress)
            status: 'in_progress',
            completionDate: null,
        },
        {
            userId: 3,
            topicId: 4, // Example: Data Structures topic 4 (completed)
            status: 'completed',
            completionDate: new Date('2024-02-28T11:00:00Z').toISOString(),
        },

        // User 4 (student): not_started on 1 topic from System Design, completed 2 from Database Systems
        {
            userId: 4,
            topicId: 19, // Example: System Design topic 1 (not_started)
            status: 'not_started',
            completionDate: null,
        },
        {
            userId: 4,
            topicId: 15, // Example: Database Systems topic 1 (completed)
            status: 'completed',
            completionDate: new Date('2024-03-03T16:00:00Z').toISOString(),
        },
        {
            userId: 4,
            topicId: 16, // Example: Database Systems topic 2 (completed)
            status: 'completed',
            completionDate: new Date('2024-03-07T12:45:00Z').toISOString(),
        },

        // User 5 (student): in_progress on 1 topic from Machine Learning
        {
            userId: 5,
            topicId: 23, // Example: Machine Learning topic 1 (in_progress)
            status: 'in_progress',
            completionDate: null,
        },
    ];

    await db.insert(userProgress).values(sampleUserProgress);

    console.log('✅ User progress seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});