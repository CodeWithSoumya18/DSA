/**
 * Search an element in a rotated sorted array
 * Example: [4,5,6,7,0,1,2] target=0 => 4
 */

// Method 1: Standard approach - find pivot then binary search
function searchRotatedArray(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  // Find pivot
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  const pivot = left;
  
  // Binary search on the appropriate half
  left = 0;
  right = arr.length - 1;
  
  // Determine which half to search
  if (target >= arr[pivot] && target <= arr[right]) {
    left = pivot;
  } else {
    right = pivot - 1;
  }
  
  // Standard binary search
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
  
  return -1;
}

// Method 2: Single pass approach
function searchRotatedArray_OnePass(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    // Determine which side is sorted
    if (arr[left] <= arr[mid]) {
      // Left side is sorted
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right side is sorted
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}

// Method 3: With detailed steps
function searchRotatedArray_Detailed(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let iterations = 0;
  
  while (left <= right) {
    iterations++;
    const mid = Math.floor((left + right) / 2);
    console.log(`Iteration ${iterations}: left=${left}, mid=${mid}, right=${right}`);
    console.log(`  arr[left]=${arr[left]}, arr[mid]=${arr[mid]}, arr[right]=${arr[right]}`);
    
    if (arr[mid] === target) {
      console.log(`  Found at index ${mid}`);
      return mid;
    }
    
    if (arr[left] <= arr[mid]) {
      console.log(`  Left side [${arr[left]}...${arr[mid]}] is sorted`);
      if (target >= arr[left] && target < arr[mid]) {
        console.log(`  Target in range, search left`);
        right = mid - 1;
      } else {
        console.log(`  Target not in range, search right`);
        left = mid + 1;
      }
    } else {
      console.log(`  Right side [${arr[mid]}...${arr[right]}] is sorted`);
      if (target > arr[mid] && target <= arr[right]) {
        console.log(`  Target in range, search right`);
        left = mid + 1;
      } else {
        console.log(`  Target not in range, search left`);
        right = mid - 1;
      }
    }
  }
  
  console.log(`Not found after ${iterations} iterations`);
  return -1;
}

// Method 4: Handle duplicates
function searchRotatedArrayWithDuplicates(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    // Handle duplicates
    if (arr[left] === arr[mid] && arr[mid] === arr[right]) {
      left++;
      right--;
      continue;
    }
    
    if (arr[left] <= arr[mid]) {
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}

// Test cases
console.log("=== Search in Rotated Sorted Array ===");

const testArr1 = [4, 5, 6, 7, 0, 1, 2];
console.log("Array:", testArr1);

console.log("\nTest 1: Search for 0");
console.log("Result:", searchRotatedArray(testArr1, 0));

console.log("\nTest 2: Search for 4");
console.log("Result:", searchRotatedArray(testArr1, 4));

console.log("\nTest 3: Search for 7");
console.log("Result:", searchRotatedArray(testArr1, 7));

console.log("\nTest 4: Search for 3 (not present)");
console.log("Result:", searchRotatedArray(testArr1, 3));

console.log("\n=== Test Array 2 ===");
const testArr2 = [5, 1, 3];
console.log("Array:", testArr2);
console.log("Search for 1:", searchRotatedArray(testArr2, 1));
console.log("Search for 3:", searchRotatedArray(testArr2, 3));
console.log("Search for 5:", searchRotatedArray(testArr2, 5));

console.log("\n=== One Pass Approach ===");
console.log("Search for 0:", searchRotatedArray_OnePass(testArr1, 0));
console.log("Search for 7:", searchRotatedArray_OnePass(testArr1, 7));

console.log("\n=== Detailed Steps for Searching 0 ===");
searchRotatedArray_Detailed(testArr1, 0);

console.log("\n=== Detailed Steps for Searching 1 ===");
searchRotatedArray_Detailed(testArr2, 1);

console.log("\n=== With Duplicates ===");
const testArr3 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1];
console.log("Array with duplicates:", testArr3);
console.log("Search for 2:", searchRotatedArrayWithDuplicates(testArr3, 2));

console.log("\nTime Complexity: O(log n) average, O(n) worst case with duplicates");
console.log("Space Complexity: O(1)");
