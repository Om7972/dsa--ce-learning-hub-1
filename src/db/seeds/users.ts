import { db } from '@/db';
import { users } from '@/db/schema';

async function main() {
    const timestamp = new Date().toISOString();

    const sampleUsers = [
        {
            email: 'admin@example.com',
            name: 'Admin User',
            passwordHash: 'hashedPasswordAdmin123',
            role: 'admin',
            createdAt: timestamp,
            updatedAt: timestamp,
        },
        {
            email: 'instructor@example.com',
            name: 'Alice Instructor',
            passwordHash: 'hashedPasswordInstructor456',
            role: 'instructor',
            createdAt: timestamp,
            updatedAt: timestamp,
        },
        {
            email: 'student1@example.com',
            name: 'Bob Student',
            passwordHash: 'hashedPasswordStudent789',
            role: 'student',
            createdAt: timestamp,
            updatedAt: timestamp,
        },
        {
            email: 'student2@example.com',
            name: 'Charlie Student',
            passwordHash: 'hashedPasswordStudent012',
            role: 'student',
            createdAt: timestamp,
            updatedAt: timestamp,
        },
        {
            email: 'student3@example.com',
            name: 'Diana Student',
            passwordHash: 'hashedPasswordStudent345',
            role: 'student',
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    ];

    await db.insert(users).values(sampleUsers);

    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});