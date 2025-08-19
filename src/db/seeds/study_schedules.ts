import { db } from '@/db';
import { studySchedules } from '@/db/schema';

async function main() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(today.getDate() + 14);

    const sampleStudySchedules = [
        // User 3: scheduled to study 3 different topics over the next 2 weeks (60-120 minutes each)
        {
            userId: 3,
            topicId: 101, // Example topic ID
            scheduledDate: new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0], // 2 days from now
            durationMinutes: 90,
            status: 'scheduled',
        },
        {
            userId: 3,
            topicId: 102, // Example topic ID
            scheduledDate: new Date(today.setDate(today.getDate() + 5)).toISOString().split('T')[0], // 7 days from now
            durationMinutes: 120,
            status: 'scheduled',
        },
        {
            userId: 3,
            topicId: 103, // Example topic ID
            scheduledDate: twoWeeksLater.toISOString().split('T')[0], // 14 days from now
            durationMinutes: 75,
            status: 'scheduled',
        },
        // User 4: scheduled to study 2 topics this week (90-150 minutes each)
        {
            userId: 4,
            topicId: 104, // Example topic ID
            scheduledDate: new Date(nextWeek.setDate(nextWeek.getDate() + 1)).toISOString().split('T')[0], // Next week + 1 day
            durationMinutes: 100,
            status: 'scheduled',
        },
        {
            userId: 4,
            topicId: 105, // Example topic ID
            scheduledDate: new Date(nextWeek.setDate(nextWeek.getDate() + 3)).toISOString().split('T')[0], // Next week + 3 days
            durationMinutes: 130,
            status: 'scheduled',
        },
        // User 5: scheduled to study 1 topic tomorrow (120 minutes)
        {
            userId: 5,
            topicId: 106, // Example topic ID
            scheduledDate: tomorrow.toISOString().split('T')[0],
            durationMinutes: 120,
            status: 'scheduled',
        },
        // Example of a past completed session
        {
            userId: 3,
            topicId: 107,
            scheduledDate: new Date('2024-06-20').toISOString().split('T')[0],
            durationMinutes: 60,
            status: 'completed',
        },
    ];

    await db.insert(studySchedules).values(sampleStudySchedules);

    console.log('✅ Study schedules seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});