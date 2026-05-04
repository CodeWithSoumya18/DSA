/**
 * Find the second largest element in an array
 */

// Method 1: Using sorting
function secondLargestBySorting(arr) {
  if (arr.length < 2) return -1;
  const sorted = [...new Set(arr)].sort((a, b) => b - a);
  return sorted.length > 1 ? sorted[1] : -1;
}

// Method 2: Two-pass approach (optimal)
function secondLargest(arr) {
  if (arr.length < 2) return -1;
  
  let largest = -Infinity;
  let secondLargest = -Infinity;
  
  for (let num of arr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num !== largest) {
      secondLargest = num;
    }
  }
  
  return secondLargest === -Infinity ? -1 : secondLargest;
}

// Method 3: Handle duplicates
function secondLargestNoDuplicates(arr) {
  if (arr.length < 2) return -1;
  
  const uniqueArr = [...new Set(arr)];
  if (uniqueArr.length < 2) return -1;
  
  let largest = -Infinity;
  let secondLargest = -Infinity;
  
  for (let num of uniqueArr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest) {
      secondLargest = num;
    }
  }
  
  return secondLargest;
}

// Test cases
console.log("=== Second Largest Element ===");
const testArr = [1, 5, 3, 9, 2, 8];
console.log("Array:", testArr);
console.log("Second Largest (Sorting):", secondLargestBySorting(testArr));
console.log("Second Largest (Optimal):", secondLargest(testArr));
console.log("Second Largest (No Duplicates):", secondLargestNoDuplicates(testArr));

console.log("\nArrayn with duplicates:", [5, 5, 5, 3, 1]);
console.log("Result:", secondLargest([5, 5, 5, 3, 1]));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1)");
