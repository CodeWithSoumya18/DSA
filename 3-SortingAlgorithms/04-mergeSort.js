/**
 * Implement Merge Sort
 * Divide and conquer approach - O(n log n) time
 */

// Method 1: Standard merge sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  // Divide
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // Conquer and merge
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  // Add remaining elements
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  
  return result;
}

// Method 2: In-place merge sort
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSortInPlace(arr, left, mid);
    mergeSortInPlace(arr, mid + 1, right);
    mergeInPlace(arr, left, mid, right);
  }
  
  return arr;
}

function mergeInPlace(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }
  
  while (i < leftArr.length) {
    arr[k++] = leftArr[i++];
  }
  
  while (j < rightArr.length) {
    arr[k++] = rightArr[j++];
  }
}

// Method 3: With detailed steps
function mergeSort_Detailed(arr, depth = 0) {
  const indent = "  ".repeat(depth);
  console.log(`${indent}Dividing: [${arr.join(', ')}]`);
  
  if (arr.length <= 1) {
    console.log(`${indent}Base case: [${arr.join(', ')}]`);
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort_Detailed(arr.slice(0, mid), depth + 1);
  const right = mergeSort_Detailed(arr.slice(mid), depth + 1);
  
  console.log(`${indent}Merging [${left.join(', ')}] and [${right.join(', ')}]`);
  return merge(left, right);
}

// Method 4: Descending order
function mergeSort_Descending(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort_Descending(arr.slice(0, mid));
  const right = mergeSort_Descending(arr.slice(mid));
  
  return merge_Descending(left, right);
}

function merge_Descending(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] >= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  
  return result;
}

// Method 5: For objects
function mergeSort_Objects(arr, key) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort_Objects(arr.slice(0, mid), key);
  const right = mergeSort_Objects(arr.slice(mid), key);
  
  return merge_Objects(left, right, key);
}

function merge_Objects(left, right, key) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i][key] <= right[j][key]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  
  return result;
}

// Test cases
console.log("=== Merge Sort ===");

const testArr1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Test 1:", mergeSort([...testArr1]));

const testArr2 = [5, 2, 8, 1, 9];
console.log("Test 2:", mergeSort([...testArr2]));

const testArr3 = [1, 2, 3, 4, 5]; // Already sorted
console.log("Test 3 (already sorted):", mergeSort([...testArr3]));

const testArr4 = [5, 4, 3, 2, 1]; // Reverse sorted
console.log("Test 4 (reverse sorted):", mergeSort([...testArr4]));

console.log("\n=== In-place Merge Sort ===");
const testArr5 = [64, 34, 25, 12, 22, 11, 90];
mergeSortInPlace(testArr5);
console.log("Result:", testArr5);

console.log("\n=== Descending Order ===");
console.log("Result:", mergeSort_Descending([64, 34, 25, 12, 22, 11, 90]));

console.log("\n=== Detailed Trace ===");
mergeSort_Detailed([5, 2, 8, 1]);

console.log("\n=== Sorting Objects ===");
const objects = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
console.log("By age:", mergeSort_Objects([...objects], 'age'));

console.log("\nTime Complexity: O(n log n)");
console.log("Space Complexity: O(n)");
console.log("Stable: Yes");
console.log("Good for: Large datasets, linked lists");
