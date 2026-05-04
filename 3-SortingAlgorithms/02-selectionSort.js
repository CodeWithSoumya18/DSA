/**
 * Implement Selection Sort
 * Find minimum element and place it at the beginning
 */

// Method 1: Standard selection sort
function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Find minimum element in remaining array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap minimum element with current element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

// Method 2: With detailed steps
function selectionSort_Detailed(arr) {
  const n = arr.length;
  let swaps = 0;
  
  console.log("Initial array:", [...arr]);
  
  for (let i = 0; i < n - 1; i++) {
    console.log(`\nPass ${i + 1}:`);
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      console.log(`  Minimum element ${arr[minIndex]} at index ${minIndex}`);
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      swaps++;
      console.log(`  After swap: ${arr.join(', ')}`);
    }
  }
  
  console.log(`\nTotal swaps: ${swaps}`);
  return arr;
}

// Method 3: Double selection sort (select min and max simultaneously)
function doubleSelectionSort(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    let minIndex = left;
    let maxIndex = right;
    
    // Find min and max in current range
    for (let i = left + 1; i < right; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
      }
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }
    
    // Swap min to left
    [arr[left], arr[minIndex]] = [arr[minIndex], arr[left]];
    
    // If max was at left position, update maxIndex
    if (maxIndex === left) {
      maxIndex = minIndex;
    }
    
    // Swap max to right
    [arr[right], arr[maxIndex]] = [arr[maxIndex], arr[right]];
    
    left++;
    right--;
  }
  
  return arr;
}

// Method 4: Descending order
function selectionSort_Descending(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let maxIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }
    
    if (maxIndex !== i) {
      [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
    }
  }
  
  return arr;
}

// Method 5: For objects
function selectionSort_Objects(arr, key, ascending = true) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let selectIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      const condition = ascending 
        ? arr[j][key] < arr[selectIndex][key]
        : arr[j][key] > arr[selectIndex][key];
      
      if (condition) {
        selectIndex = j;
      }
    }
    
    if (selectIndex !== i) {
      [arr[i], arr[selectIndex]] = [arr[selectIndex], arr[i]];
    }
  }
  
  return arr;
}

// Test cases
console.log("=== Selection Sort ===");

const testArr1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Test 1:", selectionSort([...testArr1]));

const testArr2 = [5, 2, 8, 1, 9];
console.log("Test 2:", selectionSort([...testArr2]));

const testArr3 = [1, 2, 3, 4, 5]; // Already sorted
console.log("Test 3 (already sorted):", selectionSort([...testArr3]));

const testArr4 = [5, 4, 3, 2, 1]; // Reverse sorted
console.log("Test 4 (reverse sorted):", selectionSort([...testArr4]));

console.log("\n=== Double Selection Sort ===");
console.log("Result:", doubleSelectionSort([64, 34, 25, 12, 22, 11, 90]));

console.log("\n=== Descending Order ===");
console.log("Result:", selectionSort_Descending([64, 34, 25, 12, 22, 11, 90]));

console.log("\n=== Single Element ===");
console.log("Result:", selectionSort([42]));

console.log("\n=== Detailed Trace ===");
selectionSort_Detailed([5, 2, 8, 1, 3]);

console.log("\n=== Sorting Objects ===");
const objects = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
console.log("By age (ascending):", selectionSort_Objects([...objects], 'age', true));

console.log("\nTime Complexity: O(n²)");
console.log("Space Complexity: O(1) - in-place");
console.log("Stable: No");
