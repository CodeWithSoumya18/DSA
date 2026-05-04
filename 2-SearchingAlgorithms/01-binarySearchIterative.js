/**
 * Binary Search using Iteration
 * Finds the target in a sorted array
 */

// Method 1: Standard iterative binary search
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Not found
}

// Method 2: With more detailed output
function binarySearchDetailed(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let iterations = 0;
  
  while (left <= right) {
    iterations++;
    const mid = Math.floor((left + right) / 2);
    console.log(`Iteration ${iterations}: left=${left}, mid=${mid}, right=${right}, arr[mid]=${arr[mid]}`);
    
    if (arr[mid] === target) {
      console.log(`Found at index ${mid}`);
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  console.log("Not found");
  return -1;
}

// Method 3: Find insertion position if not found
function binarySearchInsertPosition(arr, target) {
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}

// Method 4: Range binary search
function binarySearchRange(arr, target) {
  if (arr.length === 0) return -1;
  
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      // Could continue searching for first/last occurrence
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

// Test cases
console.log("=== Binary Search (Iterative) ===");

const sortedArr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78];
console.log("Array:", sortedArr);

console.log("\nTest 1: Search for 23");
console.log("Result:", binarySearch(sortedArr, 23));

console.log("\nTest 2: Search for 2 (first element)");
console.log("Result:", binarySearch(sortedArr, 2));

console.log("\nTest 3: Search for 78 (last element)");
console.log("Result:", binarySearch(sortedArr, 78));

console.log("\nTest 4: Search for 50 (not present)");
console.log("Result:", binarySearch(sortedArr, 50));

console.log("\n=== Detailed Search for 38 ===");
binarySearchDetailed(sortedArr, 38);

console.log("\n=== Insert Position ===");
console.log("Insert 50 at position:", binarySearchInsertPosition(sortedArr, 50));
console.log("Insert 1 at position:", binarySearchInsertPosition(sortedArr, 1));
console.log("Insert 100 at position:", binarySearchInsertPosition(sortedArr, 100));

console.log("\nTime Complexity: O(log n)");
console.log("Space Complexity: O(1)");
