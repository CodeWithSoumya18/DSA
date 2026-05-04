/**
 * Implement Quick Sort
 * Divide and conquer - O(n log n) average time
 */

// Method 1: Standard quick sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Method 2: In-place quick sort with Lomuto partition
function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pi = partitionLomuto(arr, left, right);
    quickSortInPlace(arr, left, pi - 1);
    quickSortInPlace(arr, pi + 1, right);
  }
  
  return arr;
}

function partitionLomuto(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

// Method 3: In-place quick sort with Hoare partition
function quickSortHoare(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pi = partitionHoare(arr, left, right);
    quickSortHoare(arr, left, pi);
    quickSortHoare(arr, pi + 1, right);
  }
  
  return arr;
}

function partitionHoare(arr, left, right) {
  const pivot = arr[left];
  let i = left - 1;
  let j = right + 1;
  
  while (true) {
    do {
      i++;
    } while (arr[i] < pivot);
    
    do {
      j--;
    } while (arr[j] > pivot);
    
    if (i >= j) return j;
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Method 4: With detailed steps
function quickSort_Detailed(arr, left = 0, right = arr.length - 1, depth = 0) {
  const indent = "  ".repeat(depth);
  
  if (left < right) {
    console.log(`${indent}Partitioning: [${arr.slice(left, right + 1).join(', ')}]`);
    const pi = partitionLomuto_Detailed(arr, left, right);
    console.log(`${indent}Pivot at ${pi}: ${arr.slice(left, right + 1).join(', ')}`);
    
    quickSort_Detailed(arr, left, pi - 1, depth + 1);
    quickSort_Detailed(arr, pi + 1, right, depth + 1);
  }
  
  return arr;
}

function partitionLomuto_Detailed(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

// Method 5: Random pivot selection
function quickSort_Random(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
    
    const pi = partitionLomuto(arr, left, right);
    quickSort_Random(arr, left, pi - 1);
    quickSort_Random(arr, pi + 1, right);
  }
  
  return arr;
}

// Method 6: Descending order
function quickSort_Descending(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pi = partition_Descending(arr, left, right);
    quickSort_Descending(arr, left, pi - 1);
    quickSort_Descending(arr, pi + 1, right);
  }
  
  return arr;
}

function partition_Descending(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j] > pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

// Method 7: For objects
function quickSort_Objects(arr, key, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pi = partition_Objects(arr, key, left, right);
    quickSort_Objects(arr, key, left, pi - 1);
    quickSort_Objects(arr, key, pi + 1, right);
  }
  
  return arr;
}

function partition_Objects(arr, key, left, right) {
  const pivot = arr[right][key];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j][key] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

// Test cases
console.log("=== Quick Sort ===");

const testArr1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Test 1:", quickSort([...testArr1]));

const testArr2 = [5, 2, 8, 1, 9];
console.log("Test 2:", quickSort([...testArr2]));

const testArr3 = [1, 2, 3, 4, 5]; // Already sorted
console.log("Test 3 (already sorted):", quickSort([...testArr3]));

const testArr4 = [5, 4, 3, 2, 1]; // Reverse sorted
console.log("Test 4 (reverse sorted):", quickSort([...testArr4]));

console.log("\n=== In-place Quick Sort (Lomuto) ===");
const testArr5 = [...testArr1];
quickSortInPlace(testArr5);
console.log("Result:", testArr5);

console.log("\n=== In-place Quick Sort (Hoare) ===");
const testArr6 = [...testArr1];
quickSortHoare(testArr6);
console.log("Result:", testArr6);

console.log("\n=== Descending Order ===");
const testArr7 = [...testArr1];
quickSort_Descending(testArr7);
console.log("Result:", testArr7);

console.log("\n=== Detailed Trace ===");
quickSort_Detailed([5, 2, 8, 1, 9]);

console.log("\n=== Sorting Objects ===");
const objects = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
const objectCopy = JSON.parse(JSON.stringify(objects));
quickSort_Objects(objectCopy, 'age');
console.log("By age:", objectCopy);

console.log("\nTime Complexity: O(n log n) average, O(n²) worst");
console.log("Space Complexity: O(log n)");
console.log("Stable: No (depends on implementation)");
console.log("Good for: Large datasets, in-place sorting");
