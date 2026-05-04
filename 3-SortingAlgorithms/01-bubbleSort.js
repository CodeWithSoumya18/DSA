/**
 * Implement Bubble Sort
 * Compare adjacent elements and swap if they're in wrong order
 */

// Method 1: Standard bubble sort
function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}

// Method 2: Optimized bubble sort with early termination
function bubbleSort_Optimized(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred, array is already sorted
    if (!swapped) break;
  }
  
  return arr;
}

// Method 3: With step tracking
function bubbleSort_Detailed(arr) {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  
  console.log("Initial array:", [...arr]);
  
  for (let i = 0; i < n - 1; i++) {
    console.log(`\nPass ${i + 1}:`);
    let swappedInThisPass = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swappedInThisPass = true;
        console.log(`  Swapped ${arr[j + 1]} and ${arr[j]}: ${arr.join(', ')}`);
      }
    }
    
    if (!swappedInThisPass) {
      console.log("  No swaps in this pass - array is sorted!");
      break;
    }
  }
  
  console.log(`\nTotal comparisons: ${comparisons}`);
  console.log(`Total swaps: ${swaps}`);
  return arr;
}

// Method 4: Descending order
function bubbleSort_Descending(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}

// Method 5: For objects
function bubbleSort_Objects(arr, key) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j][key] > arr[j + 1][key]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}

// Test cases
console.log("=== Bubble Sort ===");

const testArr1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Test 1:", bubbleSort([...testArr1]));

const testArr2 = [5, 2, 8, 1, 9];
console.log("Test 2:", bubbleSort([...testArr2]));

const testArr3 = [1, 2, 3, 4, 5]; // Already sorted
console.log("Test 3 (already sorted):", bubbleSort([...testArr3]));

const testArr4 = [5, 4, 3, 2, 1]; // Reverse sorted
console.log("Test 4 (reverse sorted):", bubbleSort([...testArr4]));

console.log("\n=== Optimized Bubble Sort ===");
const testArr5 = [64, 34, 25, 12, 22, 11, 90];
console.log("Result:", bubbleSort_Optimized([...testArr5]));

console.log("\n=== Descending Order ===");
console.log("Result:", bubbleSort_Descending([64, 34, 25, 12, 22, 11, 90]));

console.log("\n=== Sorting Objects ===");
const objects = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
console.log("By age:", bubbleSort_Objects([...objects], 'age'));

console.log("\n=== Detailed Trace ===");
bubbleSort_Detailed([5, 2, 8, 1, 3]);

console.log("\nTime Complexity: O(n²)");
console.log("Space Complexity: O(1) - in-place");
console.log("Stable: Yes");
console.log("Best Case: O(n) with optimization");
