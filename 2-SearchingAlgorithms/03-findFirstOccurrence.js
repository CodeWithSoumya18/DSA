/**
 * Find the first occurrence of a target element in a sorted array
 * Example: [5,7,7,8,8,10] target=8 => 3
 */

// Method 1: Binary search optimized for first occurrence
function findFirst(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1;  // Continue searching in left half
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Method 2: Recursive approach
function findFirstRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    // Check if this is the first occurrence
    if (mid === 0 || arr[mid - 1] !== target) {
      return mid;
    }
    return findFirstRecursive(arr, target, left, mid - 1);
  } else if (arr[mid] < target) {
    return findFirstRecursive(arr, target, mid + 1, right);
  } else {
    return findFirstRecursive(arr, target, left, mid - 1);
  }
}

// Method 3: Using indexOf
function findFirst_IndexOf(arr, target) {
  return arr.indexOf(target);
}

// Method 4: Linear search (for comparison)
function findFirst_Linear(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// Method 5: With detailed steps
function findFirstDetailed(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  let iterations = 0;
  
  while (left <= right) {
    iterations++;
    const mid = Math.floor((left + right) / 2);
    console.log(`Iteration ${iterations}: left=${left}, mid=${mid}, right=${right}, arr[mid]=${arr[mid]}`);
    
    if (arr[mid] === target) {
      console.log(`Found match at index ${mid}, searching left for earlier occurrence`);
      result = mid;
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Test cases
console.log("=== Find First Occurrence ===");

const testArr1 = [5, 7, 7, 8, 8, 10];
console.log("Array:", testArr1);

console.log("\nTest 1: Find first 8");
console.log("Result:", findFirst(testArr1, 8));

console.log("\nTest 2: Find first 7");
console.log("Result:", findFirst(testArr1, 7));

console.log("\nTest 3: Find first 5");
console.log("Result:", findFirst(testArr1, 5));

console.log("\nTest 4: Find first 10");
console.log("Result:", findFirst(testArr1, 10));

console.log("\nTest 5: Find non-existent 6");
console.log("Result:", findFirst(testArr1, 6));

console.log("\n=== Test Array with Multiple Duplicates ===");
const testArr2 = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4];
console.log("Array:", testArr2);
console.log("First 1:", findFirst(testArr2, 1));
console.log("First 2:", findFirst(testArr2, 2));
console.log("First 3:", findFirst(testArr2, 3));
console.log("First 4:", findFirst(testArr2, 4));

console.log("\n=== With Recursive Approach ===");
console.log("Find first 8:", findFirstRecursive(testArr1, 8));
console.log("Find first 1:", findFirstRecursive(testArr2, 1));
console.log("Find first 3:", findFirstRecursive(testArr2, 3));

console.log("\n=== Detailed Steps for Finding First 8 ===");
findFirstDetailed(testArr1, 8);

console.log("\n=== Detailed Steps for Finding First 3 ===");
findFirstDetailed(testArr2, 3);

console.log("\nTime Complexity: O(log n)");
console.log("Space Complexity: O(1)");
