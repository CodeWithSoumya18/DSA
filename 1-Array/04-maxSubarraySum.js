/**
 * Find the maximum subarray sum (Kadane's Algorithm)
 * Example: [-2,1,-3,4,-1,2,1,-5,4] => 6 (subarray [4,-1,2,1])
 */

// Method 1: Kadane's Algorithm (Optimal)
function maxSubarraySum(arr) {
  if (arr.length === 0) return 0;
  
  let maxCurrent = arr[0];
  let maxGlobal = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }
  
  return maxGlobal;
}

// Method 2: Kadane's with subarray tracking
function maxSubarraySumWithIndices(arr) {
  if (arr.length === 0) return { sum: 0, start: 0, end: 0 };
  
  let maxCurrent = arr[0];
  let maxGlobal = arr[0];
  let startGlobal = 0;
  let startLocal = 0;
  let endGlobal = 0;
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxCurrent + arr[i]) {
      maxCurrent = arr[i];
      startLocal = i;
    } else {
      maxCurrent = maxCurrent + arr[i];
    }
    
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
      startGlobal = startLocal;
      endGlobal = i;
    }
  }
  
  return {
    sum: maxGlobal,
    subarray: arr.slice(startGlobal, endGlobal + 1),
    start: startGlobal,
    end: endGlobal
  };
}

// Method 3: Brute force (for comparison)
function maxSubarraySum_BruteForce(arr) {
  let maxSum = arr[0];
  
  for (let i = 0; i < arr.length; i++) {
    let currentSum = 0;
    for (let j = i; j < arr.length; j++) {
      currentSum += arr[j];
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  
  return maxSum;
}

// Method 4: Divide and Conquer approach
function maxSubarraySum_DivideConquer(arr, left = 0, right = arr.length - 1) {
  if (left === right) return arr[left];
  
  const mid = Math.floor((left + right) / 2);
  const leftMax = maxSubarraySum_DivideConquer(arr, left, mid);
  const rightMax = maxSubarraySum_DivideConquer(arr, mid + 1, right);
  
  let crossSum = 0;
  let leftSum = -Infinity;
  for (let i = mid; i >= left; i--) {
    crossSum += arr[i];
    leftSum = Math.max(leftSum, crossSum);
  }
  
  crossSum = 0;
  let rightSum = -Infinity;
  for (let i = mid + 1; i <= right; i++) {
    crossSum += arr[i];
    rightSum = Math.max(rightSum, crossSum);
  }
  
  return Math.max(leftMax, rightMax, leftSum + rightSum);
}

// Test cases
console.log("=== Maximum Subarray Sum (Kadane's Algorithm) ===");

const testArr1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log("Array:", testArr1);
console.log("Max Sum (Kadane):", maxSubarraySum(testArr1));

const result1 = maxSubarraySumWithIndices(testArr1);
console.log("With Indices:", result1);

console.log("\n=== Test Case 2 ===");
const testArr2 = [5, -3, 5];
console.log("Array:", testArr2);
console.log("Max Sum:", maxSubarraySum(testArr2));
console.log("With Indices:", maxSubarraySumWithIndices(testArr2));

console.log("\n=== Test Case 3 (All negative) ===");
const testArr3 = [-2, -3, -1, -4];
console.log("Array:", testArr3);
console.log("Max Sum:", maxSubarraySum(testArr3));
console.log("With Indices:", maxSubarraySumWithIndices(testArr3));

console.log("\n=== Test Case 4 (All positive) ===");
const testArr4 = [1, 2, 3, 4, 5];
console.log("Array:", testArr4);
console.log("Max Sum:", maxSubarraySum(testArr4));
console.log("With Indices:", maxSubarraySumWithIndices(testArr4));

console.log("\n=== Performance Comparison ===");
const largeArr = Array.from({ length: 1000 }, () => Math.random() * 200 - 100);
console.log("Kadane's:", maxSubarraySum(largeArr));
console.log("Brute Force:", maxSubarraySum_BruteForce(largeArr));
console.log("Divide & Conquer:", maxSubarraySum_DivideConquer(largeArr));

console.log("\nTime Complexity: O(n) - Kadane's, O(n²) - Brute Force");
console.log("Space Complexity: O(1) - Kadane's, O(log n) - Divide & Conquer (recursion stack)");
