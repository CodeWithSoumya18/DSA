/**
 * Remove duplicates from a sorted array in-place
 * Modify the array so duplicates are removed and return new length
 * Example: [1,1,2] => modify to [1,2,_] return 2
 */

// Method 1: Two-pointer approach (Optimal)
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  
  let left = 0;
  
  for (let right = 1; right < arr.length; right++) {
    if (arr[right] !== arr[left]) {
      left++;
      arr[left] = arr[right];
    }
  }
  
  return left + 1; // Return the new length
}

// Method 2: Using Set (not in-place, but clean)
function removeDuplicates_Set(arr) {
  const uniqueArr = [...new Set(arr)];
  arr.length = 0;
  arr.push(...uniqueArr);
  return arr.length;
}

// Method 3: Using filter (creates new array)
function removeDuplicates_Filter(arr) {
  const result = arr.filter((value, index) => arr.indexOf(value) === index);
  return result;
}

// Method 4: Two-pointer with element tracking
function removeDuplicates_Tracking(arr) {
  if (arr.length <= 1) return arr.length;
  
  let j = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[j]) {
      j++;
      arr[j] = arr[i];
    }
  }
  
  return j + 1;
}

// Helper function to display result
function displayResult(arr, newLength) {
  return arr.slice(0, newLength);
}

// Test cases
console.log("=== Remove Duplicates from Sorted Array ===");

let testArr1 = [1, 1, 2];
let len1 = removeDuplicates([...testArr1]);
console.log("Input: [1,1,2]");
console.log("New Length:", len1);
console.log("Array after removal:", testArr1.slice(0, len1));

let testArr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
let len2 = removeDuplicates([...testArr2]);
console.log("\nInput: [0,0,1,1,1,2,2,3,3,4]");
console.log("New Length:", len2);
console.log("Array after removal:", testArr2.slice(0, len2));

let testArr3 = [1, 2, 3];
let len3 = removeDuplicates([...testArr3]);
console.log("\nInput (no duplicates): [1,2,3]");
console.log("New Length:", len3);
console.log("Array after removal:", testArr3.slice(0, len3));

console.log("\n=== Multiple Occurrences ===");
let testArr4 = [1, 1, 1, 2, 2, 3];
let len4 = removeDuplicates([...testArr4]);
console.log("Input: [1,1,1,2,2,3]");
console.log("New Length:", len4);
console.log("Array after removal:", testArr4.slice(0, len4));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1) - in-place modification");
