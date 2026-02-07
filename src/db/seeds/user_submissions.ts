import { db } from '@/db';
import { userSubmissions } from '@/db/schema';

async function main() {
    const sampleUserSubmissions = [
        // User 3: submitted solutions to 3 easy problems (accepted status)
        {
            userId: 3,
            problemId: 1, // Easy problem
            code: `def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []`,
            status: 'accepted',
            submittedAt: new Date('2024-06-15T10:00:00Z').toISOString(),
        },
        {
            userId: 3,
            problemId: 2, // Easy problem
            code: `function reverseString(s) {\n    return s.split('').reverse().join('');\n}`,
            status: 'accepted',
            submittedAt: new Date('2024-06-16T11:30:00Z').toISOString(),
        },
        {
            userId: 3,
            problemId: 3, // Easy problem
            code: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        if x < 0:\n            return False\n        return str(x) == str(x)[::-1]`,
            status: 'accepted',
            submittedAt: new Date('2024-06-17T14:00:00Z').toISOString(),
        },
        // User 4: submitted solutions to 2 medium problems (1 accepted, 1 rejected)
        {
            userId: 4,
            problemId: 6, // Medium problem
            code: `def longest_palindromic_substring(s):\n    n = len(s)\n    if n < 2:\n        return s\n    \n    start = 0\n    max_len = 1\n    \n    for i in range(n):\n        # odd length palindrome\n        l, r = i - 1, i + 1\n        while l >= 0 and r < n and s[l] == s[r]:\n            if r - l + 1 > max_len:\n                max_len = r - l + 1\n                start = l\n            l -= 1\n            r += 1\n        \n        # even length palindrome\n        l, r = i, i + 1\n        while l >= 0 and r < n and s[l] == s[r]:\n            if r - l + 1 > max_len:\n                max_len = r - l + 1\n                start = l\n            l -= 1\n            r += 1\n            \n    return s[start:start + max_len]`,
            status: 'accepted',
            submittedAt: new Date('2024-06-18T09:15:00Z').toISOString(),
        },
        {
            userId: 4,
            problemId: 7, // Medium problem
            code: `function findDuplicates(nums) {\n    let duplicates = [];\n    for (let i = 0; i < nums.length; i++) {\n        let index = Math.abs(nums[i]) - 1;\n        if (nums[index] < 0) {\n            duplicates.push(Math.abs(nums[i]));\n        } else {\n            nums[index] = -nums[index];\n        }\n    }\n    return duplicates;\n}`,
            status: 'rejected',
            submittedAt: new Date('2024-06-19T16:45:00Z').toISOString(),
        },
        // User 5: submitted solution to 1 hard problem (pending status)
        {
            userId: 5,
            problemId: 11, // Hard problem
            code: `const findMedianSortedArrays = (nums1, nums2) => {\n    const merged = [...nums1, ...nums2].sort((a, b) => a - b);\n    const mid = Math.floor(merged.length / 2);\n    if (merged.length % 2 === 0) {\n        return (merged[mid - 1] + merged[mid]) / 2;\n    } else {\n        return merged[mid];\n    }\n};`,
            status: 'pending',
            submittedAt: new Date('2024-06-20T20:00:00Z').toISOString(),
        },
    ];

    await db.insert(userSubmissions).values(sampleUserSubmissions as any);

    console.log('✅ User Submissions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});