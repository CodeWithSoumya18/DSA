/**
 * Binary Search using Recursion
 * Finds the target in a sorted array using recursive calls
 */

// Method 1: Standard recursive binary search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1; // Not found
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// Method 2: With recursion tracking
function binarySearchRecursiveDetailed(arr, target, left = 0, right = arr.length - 1, depth = 0) {
  const indent = "  ".repeat(depth);
  console.log(`${indent}Level ${depth}: left=${left}, right=${right}`);
  
  if (left > right) {
    console.log(`${indent}Not found`);
    return -1;
  }
  
  const mid = Math.floor((left + right) / 2);
  console.log(`${indent}mid=${mid}, arr[mid]=${arr[mid]}`);
  
  if (arr[mid] === target) {
    console.log(`${indent}Found at index ${mid}`);
    return mid;
  } else if (arr[mid] < target) {
    console.log(`${indent}Search right half`);
    return binarySearchRecursiveDetailed(arr, target, mid + 1, right, depth + 1);
  } else {
    console.log(`${indent}Search left half`);
    return binarySearchRecursiveDetailed(arr, target, left, mid - 1, depth + 1);
  }
}

// Method 3: Without explicit left/right parameters
function binarySearchRecursiveClean(arr, target) {
  function search(left, right) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return search(mid + 1, right);
    return search(left, mid - 1);
  }
  
  return search(0, arr.length - 1);
}

// Method 4: With call count
function binarySearchRecursiveWithStats(arr, target) {
  let callCount = 0;
  
  function search(left, right) {
    callCount++;
    
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return search(mid + 1, right);
    return search(left, mid - 1);
  }
  
  const result = search(0, arr.length - 1);
  console.log(`Recursive calls: ${callCount}`);
  return result;
}

// Test cases
console.log("=== Binary Search (Recursive) ===");

const sortedArr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78];
console.log("Array:", sortedArr);

console.log("\nTest 1: Search for 23");
console.log("Result:", binarySearchRecursive(sortedArr, 23));

console.log("\nTest 2: Search for 2 (first element)");
console.log("Result:", binarySearchRecursive(sortedArr, 2));

console.log("\nTest 3: Search for 78 (last element)");
console.log("Result:", binarySearchRecursive(sortedArr, 78));

console.log("\nTest 4: Search for 50 (not present)");
console.log("Result:", binarySearchRecursive(sortedArr, 50));

console.log("\nTest 5: Search for 5");
console.log("Result:", binarySearchRecursive(sortedArr, 5));

console.log("\n=== Detailed Recursion for 38 ===");
binarySearchRecursiveDetailed(sortedArr, 38);

console.log("\n=== Call Count Comparison ===");
console.log("Search for 23:");
binarySearchRecursiveWithStats(sortedArr, 23);

console.log("\nSearch for 1 (not found):");
binarySearchRecursiveWithStats(sortedArr, 1);

console.log("\nSearch for 100 (not found):");
binarySearchRecursiveWithStats(sortedArr, 100);

console.log("\nTime Complexity: O(log n)");
console.log("Space Complexity: O(log n) due to recursion stack");
