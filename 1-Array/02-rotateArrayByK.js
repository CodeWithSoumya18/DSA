/**
 * Rotate an array to the right by k steps
 * Example: [1,2,3,4,5] rotated by 2 => [4,5,1,2,3]
 */

// Method 1: Using extra space
function rotateByK_ExtraSpace(arr, k) {
  const n = arr.length;
  k = k % n; // Handle k > n
  
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = arr[i];
  }
  return result;
}

// Method 2: In-place rotation using reversal (Optimal)
function rotateByK(arr, k) {
  const n = arr.length;
  k = k % n;
  
  if (k === 0) return arr;
  
  // Helper function to reverse
  function reverse(start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  
  reverse(0, n - 1);        // Reverse entire array
  reverse(0, k - 1);        // Reverse first k elements
  reverse(k, n - 1);        // Reverse remaining elements
  
  return arr;
}

// Method 3: Using pop and unshift
function rotateByK_Simple(arr, k) {
  const n = arr.length;
  k = k % n;
  
  for (let i = 0; i < k; i++) {
    arr.unshift(arr.pop());
  }
  return arr;
}

// Method 4: Using splice
function rotateByK_Splice(arr, k) {
  const n = arr.length;
  k = k % n;
  
  const rotated = arr.splice(n - k);
  return [...rotated, ...arr];
}

// Test cases
console.log("=== Rotate Array by K ===");
let testArr1 = [1, 2, 3, 4, 5];
console.log("Original:", testArr1);
console.log("Rotated by 2 (Extra Space):", rotateByK_ExtraSpace([...testArr1], 2));
console.log("Rotated by 2 (In-place):", rotateByK([...testArr1], 2));
console.log("Rotated by 2 (Simple):", rotateByK_Simple([...testArr1], 2));
console.log("Rotated by 2 (Splice):", rotateByK_Splice([...testArr1], 2));

console.log("\nWith k > n:");
console.log("Array: [1,2,3], k=5:", rotateByK([1, 2, 3], 5));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1) for in-place, O(n) for extra space");
