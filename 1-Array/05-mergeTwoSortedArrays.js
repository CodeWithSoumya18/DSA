/**
 * Merge two sorted arrays without using extra space
 * Merge arr2 into arr1 assuming arr1 has enough space
 * Example: arr1 = [1,2,3,0,0,0], arr2 = [2,5,6] => [1,2,2,3,5,6]
 */

// Method 1: Three pointer approach from the end (Optimal - O(1) space)
function merge(arr1, m, arr2, n) {
  let p1 = m - 1;        // Pointer for arr1's real element
  let p2 = n - 1;        // Pointer for arr2
  let p = m + n - 1;     // Pointer for final position in arr1
  
  while (p1 >= 0 && p2 >= 0) {
    if (arr1[p1] > arr2[p2]) {
      arr1[p] = arr1[p1];
      p1--;
    } else {
      arr1[p] = arr2[p2];
      p2--;
    }
    p--;
  }
  
  // If arr2 has remaining elements, copy them
  // (arr1 elements are already in place if arr2 is exhausted)
  while (p2 >= 0) {
    arr1[p] = arr2[p2];
    p2--;
    p--;
  }
  
  return arr1;
}

// Method 2: Two pointer approach from the start (requires extra space)
function merge_ExtraSpace(arr1, m, arr2, n) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < m && j < n) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }
  
  // Copy remaining elements
  while (i < m) result.push(arr1[i++]);
  while (j < n) result.push(arr2[j++]);
  
  // Copy result back to arr1
  for (let i = 0; i < result.length; i++) {
    arr1[i] = result[i];
  }
  
  return arr1;
}

// Method 3: Simple concatenation and sort
function merge_Simple(arr1, m, arr2, n) {
  arr1.splice(m);  // Remove extra spaces from arr1
  arr1.push(...arr2);
  arr1.sort((a, b) => a - b);
  return arr1;
}

// Method 4: Using Set to avoid duplicates then merge (if needed)
function merge_Unique(arr1, m, arr2, n) {
  const merged = new Set([...arr1.slice(0, m), ...arr2]);
  const result = Array.from(merged).sort((a, b) => a - b);
  
  for (let i = 0; i < result.length; i++) {
    arr1[i] = result[i];
  }
  
  return arr1;
}

// Helper function to display array
function displayMerge(arr1, m, arr2, n) {
  console.log(`arr1 (size ${m}):`, arr1.slice(0, m));
  console.log(`arr2 (size ${n}):`, arr2);
  return arr1.slice(0, m + n);
}

// Test cases
console.log("=== Merge Two Sorted Arrays ===");

// Test 1
let arr1_1 = [1, 2, 3, 0, 0, 0];
let arr2_1 = [2, 5, 6];
console.log("Test 1:");
displayMerge(arr1_1, 3, arr2_1, 3);
merge(arr1_1, 3, arr2_1, 3);
console.log("Result:", arr1_1);

// Test 2
console.log("\nTest 2:");
let arr1_2 = [1];
let arr2_2 = [];
console.log("Input - arr1: [1], arr2: []");
merge(arr1_2, 1, arr2_2, 0);
console.log("Result:", arr1_2);

// Test 3
console.log("\nTest 3:");
let arr1_3 = [4, 5, 6, 0, 0, 0];
let arr2_3 = [1, 2, 3];
console.log("Input - arr1: [4,5,6,...], arr2: [1,2,3]");
merge(arr1_3, 3, arr2_3, 3);
console.log("Result:", arr1_3);

// Test 4 - With duplicates
console.log("\nTest 4 (with duplicates):");
let arr1_4 = [1, 2, 2, 0, 0, 0];
let arr2_4 = [2, 5, 6];
console.log("Input - arr1: [1,2,2,...], arr2: [2,5,6]");
merge(arr1_4, 3, arr2_4, 3);
console.log("Result:", arr1_4);

// Test 5 - Empty arrays
console.log("\nTest 5 (arr2 empty):");
let arr1_5 = [1, 2, 3];
let arr2_5 = [];
merge(arr1_5, 3, arr2_5, 0);
console.log("Result:", arr1_5);

console.log("\n=== Comparison of Methods ===");
const testArr1 = [1, 3, 5, 0, 0, 0];
const testArr2 = [2, 4, 6];

const arr1Copy1 = [...testArr1];
const arr1Copy2 = [...testArr1];
const arr1Copy3 = [...testArr1];

console.log("Three-pointer (O(1) space):", merge([...testArr1], 3, testArr2, 3));
console.log("Two-pointer (O(m+n) space):", merge_ExtraSpace([...testArr1], 3, testArr2, 3));
console.log("Simple sort:", merge_Simple([...testArr1], 3, testArr2, 3));

console.log("\nTime Complexity: O(m+n)");
console.log("Space Complexity: O(1) for three-pointer, O(m+n) for others");
