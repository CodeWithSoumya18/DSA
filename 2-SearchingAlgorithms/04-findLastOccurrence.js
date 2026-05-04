/**
 * Find the last occurrence of a target element in a sorted array
 * Example: [5,7,7,8,8,10] target=8 => 4
 */

// Method 1: Binary search optimized for last occurrence
function findLast(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      left = mid + 1;  // Continue searching in right half
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Method 2: Recursive approach
function findLastRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    // Check if this is the last occurrence
    if (mid === arr.length - 1 || arr[mid + 1] !== target) {
      return mid;
    }
    return findLastRecursive(arr, target, mid + 1, right);
  } else if (arr[mid] < target) {
    return findLastRecursive(arr, target, mid + 1, right);
  } else {
    return findLastRecursive(arr, target, left, mid - 1);
  }
}

// Method 3: Using lastIndexOf
function findLast_LastIndexOf(arr, target) {
  return arr.lastIndexOf(target);
}

// Method 4: Linear search from right (for comparison)
function findLast_ReverseLinear(arr, target) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// Method 5: With detailed steps
function findLastDetailed(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  let iterations = 0;
  
  while (left <= right) {
    iterations++;
    const mid = Math.floor((left + right) / 2);
    console.log(`Iteration ${iterations}: left=${left}, mid=${mid}, right=${right}, arr[mid]=${arr[mid]}`);
    
    if (arr[mid] === target) {
      console.log(`Found match at index ${mid}, searching right for later occurrence`);
      result = mid;
      left = mid + 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Method 6: Find both first and last occurrences
function findFirstAndLast(arr, target) {
  const first = findFirst(arr, target);
  if (first === -1) return [-1, -1];
  const last = findLast(arr, target);
  return [first, last];
}

function findFirst(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
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
console.log("=== Find Last Occurrence ===");

const testArr1 = [5, 7, 7, 8, 8, 10];
console.log("Array:", testArr1);

console.log("\nTest 1: Find last 8");
console.log("Result:", findLast(testArr1, 8));

console.log("\nTest 2: Find last 7");
console.log("Result:", findLast(testArr1, 7));

console.log("\nTest 3: Find last 5");
console.log("Result:", findLast(testArr1, 5));

console.log("\nTest 4: Find last 10");
console.log("Result:", findLast(testArr1, 10));

console.log("\nTest 5: Find non-existent 6");
console.log("Result:", findLast(testArr1, 6));

console.log("\n=== Test Array with Multiple Duplicates ===");
const testArr2 = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4];
console.log("Array:", testArr2);
console.log("Last 1:", findLast(testArr2, 1));
console.log("Last 2:", findLast(testArr2, 2));
console.log("Last 3:", findLast(testArr2, 3));
console.log("Last 4:", findLast(testArr2, 4));

console.log("\n=== With Recursive Approach ===");
console.log("Find last 8:", findLastRecursive(testArr1, 8));
console.log("Find last 1:", findLastRecursive(testArr2, 1));
console.log("Find last 3:", findLastRecursive(testArr2, 3));

console.log("\n=== Detailed Steps for Finding Last 8 ===");
findLastDetailed(testArr1, 8);

console.log("\n=== Detailed Steps for Finding Last 3 ===");
findLastDetailed(testArr2, 3);

console.log("\n=== Find First and Last ===");
console.log("8 appears from index", findFirstAndLast(testArr1, 8));
console.log("7 appears from index", findFirstAndLast(testArr1, 7));
console.log("3 appears from index", findFirstAndLast(testArr2, 3));
console.log("5 appears at index", findFirstAndLast(testArr1, 5));

console.log("\nTime Complexity: O(log n)");
console.log("Space Complexity: O(1)");
