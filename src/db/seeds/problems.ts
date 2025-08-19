import { db } from '@/db';
import { problems } from '@/db/schema';

async function main() {
    const sampleProblems = [
        {
            title: 'Two Sum',
            description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Constraints:
2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9`,
            difficulty: 'easy',
            category: 'array',
            solutionCode: `
def twoSum(nums, target):
    numMap = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in numMap:
            return [numMap[complement], i]
        numMap[num] = i
`,
            testCases: JSON.stringify([
                { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
                { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] },
                { input: { nums: [3, 3], target: 6 }, output: [0, 1] }
            ]),
            createdAt: new Date('2023-11-01T10:00:00Z').toISOString(),
        },
        {
            title: 'Valid Parentheses',
            description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Constraints:
1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'.`,
            difficulty: 'easy',
            category: 'string',
            solutionCode: `
function isValid(s) {
    const stack = [];
    const map = {
        "(": ")",
        "{": "}",
        "[": "]",
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (map[char]) {
            stack.push(char);
        } else {
            if (stack.length === 0) {
                return false;
            }
            const lastOpen = stack.pop();
            if (map[lastOpen] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
}
`,
            testCases: JSON.stringify([
                { input: { s: "()" }, output: true },
                { input: { s: "()[]{}" }, output: true },
                { input: { s: "(]" }, output: false },
                { input: { s: "([{}])" }, output: true },
                { input: { s: "{[()]}" }, output: true },
                { input: { s: "][" }, output: false },
            ]),
            createdAt: new Date('2023-11-02T11:00:00Z').toISOString(),
        },
        {
            title: 'Palindrome Check',
            description: `Given a string s, return true if it is a palindrome, false otherwise.
A string is a palindrome if it reads the same forward and backward, ignoring case and considering only alphanumeric characters.

Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Constraints:
1 <= s.length <= 2 * 10^5`,
            difficulty: 'easy',
            category: 'string',
            solutionCode: `
def isPalindrome(s: str) -> bool:
    cleaned_s = "".join(filter(str.isalnum, s)).lower()
    return cleaned_s == cleaned_s[::-1]
`,
            testCases: JSON.stringify([
                { input: { s: "A man, a plan, a canal: Panama" }, output: true },
                { input: { s: "race a car" }, output: false },
                { input: { s: " " }, output: true },
                { input: { s: "madam" }, output: true },
                { input: { s: "abca" }, output: false },
            ]),
            createdAt: new Date('2023-11-03T12:00:00Z').toISOString(),
        },
        {
            title: 'Reverse String',
            description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

Constraints:
1 <= s.length <= 10^5
s[i] is a printable ascii character.`,
            difficulty: 'easy',
            category: 'string, array',
            solutionCode: `
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}
`,
            testCases: JSON.stringify([
                { input: { s: ["h", "e", "l", "l", "o"] }, output: ["o", "l", "l", "e", "h"] },
                { input: { s: ["H", "a", "n", "n", "a", "h"] }, output: ["h", "a", "n", "n", "a", "H"] },
                { input: { s: ["a"] }, output: ["a"] },
                { input: { s: [] }, output: [] },
            ]),
            createdAt: new Date('2023-11-04T13:00:00Z').toISOString(),
        },
        {
            title: 'Maximum Subarray',
            description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Example 2:
Input: nums = [1]
Output: 1

Example 3:
Input: nums = [5,4,-1,7,8]
Output: 23

Constraints:
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4`,
            difficulty: 'easy',
            category: 'array, dynamic-programming',
            solutionCode: `
function maxSubArray(nums) {
    let max_so_far = nums[0];
    let current_max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        current_max = Math.max(nums[i], current_max + nums[i]);
        max_so_far = Math.max(max_so_far, current_max);
    }
    return max_so_far;
}
`,
            testCases: JSON.stringify([
                { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, output: 6 },
                { input: { nums: [1] }, output: 1 },
                { input: { nums: [5, 4, -1, 7, 8] }, output: 23 },
                { input: { nums: [-1] }, output: -1 },
                { input: { nums: [-2, -1] }, output: -1 },
            ]),
            createdAt: new Date('2023-11-05T14:00:00Z').toISOString(),
        },
        {
            title: 'Binary Search',
            description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

Constraints:
1 <= nums.length <= 10^4
-10^4 < nums[i], target < 10^4
All the integers in nums are unique.
nums is sorted in ascending order.`,
            difficulty: 'medium',
            category: 'array, binary-search',
            solutionCode: `
def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
`,
            testCases: JSON.stringify([
                { input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 }, output: 4 },
                { input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 }, output: -1 },
                { input: { nums: [5], target: 5 }, output: 0 },
                { input: { nums: [1, 2, 3, 4, 5], target: 1 }, output: 0 },
            ]),
            createdAt: new Date('2023-11-06T15:00:00Z').toISOString(),
        },
        {
            title: 'Merge Intervals',
            description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Constraints:
1 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^4`,
            difficulty: 'medium',
            category: 'array, sorting',
            solutionCode: `
function merge(intervals) {
    if (intervals.length === 0) {
        return [];
    }
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const lastMergedInterval = merged[merged.length - 1];

        if (currentInterval[0] <= lastMergedInterval[1]) {
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            merged.push(currentInterval);
        }
    }
    return merged;
}
`,
            testCases: JSON.stringify([
                { input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }, output: [[1, 6], [8, 10], [15, 18]] },
                { input: { intervals: [[1, 4], [4, 5]] }, output: [[1, 5]] },
                { input: { intervals: [[1, 4], [0, 4]] }, output: [[0, 4]] },
                { input: { intervals: [[1, 4], [0, 0]] }, output: [[0, 0], [1, 4]] },
                { input: { intervals: [[1, 4], [0, 1]] }, output: [[0, 4]] },
            ]),
            createdAt: new Date('2023-11-07T16:00:00Z').toISOString(),
        },
        {
            title: 'Longest Substring Without Repeating Characters',
            description: `Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.`,
            difficulty: 'medium',
            category: 'string, sliding-window',
            solutionCode: `
def lengthOfLongestSubstring(s: str) -> int:
    charSet = set()
    left = 0
    maxLength = 0
    for right in range(len(s)):
        while s[right] in charSet:
            charSet.remove(s[left])
            left += 1
        charSet.add(s[right])
        maxLength = max(maxLength, right - left + 1)
    return maxLength
`,
            testCases: JSON.stringify([
                { input: { s: "abcabcbb" }, output: 3 },
                { input: { s: "bbbbb" }, output: 1 },
                { input: { s: "pwwkew" }, output: 3 },
                { input: { s: "" }, output: 0 },
                { input: { s: " " }, output: 1 },
                { input: { s: "au" }, output: 2 },
            ]),
            createdAt: new Date('2023-11-08T17:00:00Z').toISOString(),
        },
        {
            title: '3Sum',
            description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].

Example 2:
Input: nums = [0,1,1]
Output: []

Example 3:
Input: nums = [0,0,0]
Output: [[0,0,0]]

Constraints:
3 <= nums.length <= 3000
-10^5 <= nums[i] <= 10^5`,
            difficulty: 'medium',
            category: 'array, two-pointers, sorting',
            solutionCode: `
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}
`,
            testCases: JSON.stringify([
                { input: { nums: [-1, 0, 1, 2, -1, -4] }, output: [[-1, -1, 2], [-1, 0, 1]] },
                { input: { nums: [0, 1, 1] }, output: [] },
                { input: { nums: [0, 0, 0] }, output: [[0, 0, 0]] },
                { input: { nums: [-2, 0, 1, 1, 2] }, output: [[-2, 0, 2], [-2, 1, 1]] },
            ]),
            createdAt: new Date('2023-11-09T18:00:00Z').toISOString(),
        },
        {
            title: 'Coin Change',
            description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0

Constraints:
1 <= coins.length <= 12
1 <= coins[i] <= 2^31 - 1
0 <= amount <= 10^4`,
            difficulty: 'medium',
            category: 'dynamic-programming',
            solutionCode: `
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}
`,
            testCases: JSON.stringify([
                { input: { coins: [1, 2, 5], amount: 11 }, output: 3 },
                { input: { coins: [2], amount: 3 }, output: -1 },
                { input: { coins: [1], amount: 0 }, output: 0 },
                { input: { coins: [1], amount: 1 }, output: 1 },
                { input: { coins: [1], amount: 2 }, output: 2 },
            ]),
            createdAt: new Date('2023-11-10T09:00:00Z').toISOString(),
        },
        {
            title: 'Validate Binary Search Tree',
            description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

Example 1:
Input: root = [2,1,3]
Output: true

Example 2:
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

Constraints:
The number of nodes in the tree is in the range [1, 10^4].
-2^31 <= Node.val <= 2^31 - 1`,
            difficulty: 'medium',
            category: 'tree, recursion',
            solutionCode: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isValidBST(root):
    def validate(node, low=-float('inf'), high=float('inf')):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return (validate(node.left, low, node.val) and
                validate(node.right, node.val, high))
    return validate(root)

# This solution assumes TreeNode class and
# a way to build a tree from input (e.g., list representation)
`,
            testCases: JSON.stringify([
                // Note: Representing trees in JSON is complex. This is a simplified view
                // For actual testing, you'd need a tree builder function.
                // Assuming [val, left_subtree, right_subtree]
                { input: { root: [2, [1, null, null], [3, null, null]] }, output: true },
                { input: { root: [5, [1, null, null], [4, [3, null, null], [6, null, null]]] }, output: false },
                { input: { root: [0, null, null] }, output: true },
                { input: { root: [1, [1, null, null], null] }, output: false },
            ]),
            createdAt: new Date('2023-11-11T10:00:00Z').toISOString(),
        },
        {
            title: 'Median of Two Sorted Arrays',
            description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Constraints:
nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6`,
            difficulty: 'hard',
            category: 'array, binary-search',
            solutionCode: `
function findMedianSortedArrays(nums1, nums2) {
    const merged = [];
    let i = 0, j = 0;
    while (i < nums1.length || j < nums2.length) {
        if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
            merged.push(nums1[i]);
            i++;
        } else if (j < nums2.length && (i >= nums1.length || nums2[j] < nums1[i])) {
            merged.push(nums2[j]);
            j++;
        }
    }
    const mid = Math.floor(merged.length / 2);
    if (merged.length % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    } else {
        return merged[mid];
    }
}
`,
            testCases: JSON.stringify([
                { input: { nums1: [1, 3], nums2: [2] }, output: 2.0 },
                { input: { nums1: [1, 2], nums2: [3, 4] }, output: 2.5 },
                { input: { nums1: [0, 0], nums2: [0, 0] }, output: 0.0 },
                { input: { nums1: [], nums2: [1] }, output: 1.0 },
                { input: { nums1: [2], nums2: [] }, output: 2.0 },
            ]),
            createdAt: new Date('2023-11-12T11:00:00Z').toISOString(),
        },
        {
            title: 'Trapping Rain Water',
            description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

Constraints:
n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5`,
            difficulty: 'hard',
            category: 'array, two-pointers, dynamic-programming, stack',
            solutionCode: `
function trap(height) {
    if (height.length === 0) return 0;

    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let trappedWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                trappedWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                trappedWater += rightMax - height[right];
            }
            right--;
        }
    }
    return trappedWater;
}
`,
            testCases: JSON.stringify([
                { input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, output: 6 },
                { input: { height: [4, 2, 0, 3, 2, 5] }, output: 9 },
                { input: { height: [1] }, output: 0 },
                { input: { height: [4, 2, 3] }, output: 1 },
                { input: { height: [0, 0, 0] }, output: 0 },
            ]),
            createdAt: new Date('2023-11-13T12:00:00Z').toISOString(),
        },
        {
            title: 'N-Queens',
            description: `The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

Example 1:
Input: n = 4
Output: [
 [".Q..",  // Solution 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.", // Solution 2
  "Q...",
  "...Q",
  ".Q.."]
]
Explanation: There exist two distinct solutions to the 4-queens puzzle.

Constraints:
1 <= n <= 9`,
            difficulty: 'hard',
            category: 'backtracking',
            solutionCode: `
def solveNQueens(n):
    col = set()
    posDiag = set()  # (r + c)
    negDiag = set()  # (r - c)

    board = [["."] * n for i in range(n)]
    res = []

    def backtrack(r):
        if r == n:
            copy = ["".join(row) for row in board]
            res.append(copy)
            return

        for c in range(n):
            if c in col or (r + c) in posDiag or (r - c) in negDiag:
                continue

            col.add(c)
            posDiag.add(r + c)
            negDiag.add(r - c)
            board[r][c] = "Q"

            backtrack(r + 1)

            col.remove(c)
            posDiag.remove(r + c)
            negDiag.remove(r - c)
            board[r][c] = "."
    
    backtrack(0)
    return res
`,
            testCases: JSON.stringify([
                { input: { n: 4 }, output: [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]] },
                { input: { n: 1 }, output: [["Q"]] },
                { input: { n: 2 }, output: [] },
                { input: { n: 3 }, output: [] },
            ]),
            createdAt: new Date('2023-11-14T13:00:00Z').toISOString(),
        },
        {
            title: 'Word Ladder',
            description: `A transformation sequence from word to wordLadder using a dictionary wordList is a shortest sequence of words startWord -> w1 -> w2 -> ... -> wn -> endWord such that:
- Every adjacent pair of words differs by a single letter.
- Every w_i in the sequence is in wordList. Note that startWord does not need to be in wordList.
- endWord is in wordList.

Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.

Example 2:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList.

Constraints:
1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.`,
            difficulty: 'hard',
            category: 'graph, breadth-first-search',
            solutionCode: `
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) {
        return 0;
    }

    let queue = [[beginWord, 1]];
    let visited = new Set([beginWord]);

    while (queue.length > 0) {
        let [currentWord, level] = queue.shift();

        if (currentWord === endWord) {
            return level;
        }

        for (let i = 0; i < currentWord.length; i++) {
            for (let charCode = 97; charCode <= 122; charCode++) { // 'a' to 'z'
                const char = String.fromCharCode(charCode);
                const nextWord = currentWord.substring(0, i) + char + currentWord.substring(i + 1);

                if (wordSet.has(nextWord) && !visited.has(nextWord)) {
                    visited.add(nextWord);
                    queue.push([nextWord, level + 1]);
                }
            }
        }
    }
    return 0;
}
`,
            testCases: JSON.stringify([
                { input: { beginWord: "hit", endWord: "cog", wordList: ["hot", "dot", "dog", "lot", "log", "cog"] }, output: 5 },
                { input: { beginWord: "hit", endWord: "cog", wordList: ["hot", "dot", "dog", "lot", "log"] }, output: 0 },
                { input: { beginWord: "a", endWord: "c", wordList: ["a", "b", "c"] }, output: 2 },
                { input: { beginWord: "hot", endWord: "dog", wordList: ["hot", "dog"] }, output: 0 },
            ]),
            createdAt: new Date('2023-11-15T14:00:00Z').toISOString(),
        },
    ];

    await db.insert(problems).values(sampleProblems);

    console.log('✅ Problems seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});