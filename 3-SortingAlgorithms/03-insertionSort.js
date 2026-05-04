/**
 * Implement Insertion Sort
 * Build sorted array by inserting elements one at a time
 */

// Method 1: Standard insertion sort
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at correct position
    arr[j + 1] = key;
  }
  
  return arr;
}

// Method 2: With detailed steps
function insertionSort_Detailed(arr) {
  console.log("Initial array:", [...arr]);
  
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    console.log(`\nInserting ${key} (at index ${i})`);
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
    console.log(`  Array after insertion: ${arr.join(', ')}`);
  }
  
  return arr;
}

// Method 3: Binary search variant
function insertionSort_Binary(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    
    // Find position using binary search
    const pos = binarySearch_Position(arr, key, 0, i - 1);
    
    // Shift elements
    for (let j = i - 1; j >= pos; j--) {
      arr[j + 1] = arr[j];
    }
    
    arr[pos] = key;
  }
  
  return arr;
}

function binarySearch_Position(arr, target, left, right) {
  if (left > right) return left;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearch_Position(arr, target, mid + 1, right);
  } else {
    return binarySearch_Position(arr, target, left, mid - 1);
  }
}

// Method 4: Descending order
function insertionSort_Descending(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] < key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}

// Method 5: For objects
function insertionSort_Objects(arr, key, ascending = true) {
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    let j = i - 1;
    
    while (j >= 0) {
      const condition = ascending
        ? arr[j][key] > element[key]
        : arr[j][key] < element[key];
      
      if (condition) {
        arr[j + 1] = arr[j];
        j--;
      } else {
        break;
      }
    }
    
    arr[j + 1] = element;
  }
  
  return arr;
}

// Method 6: Recursive insertion sort
function insertionSort_Recursive(arr, n = arr.length) {
  if (n <= 1) return arr;
  
  // Sort first n-1 elements
  insertionSort_Recursive(arr, n - 1);
  
  // Insert last element at its correct position
  const key = arr[n - 1];
  let j = n - 2;
  
  while (j >= 0 && arr[j] > key) {
    arr[j + 1] = arr[j];
    j--;
  }
  
  arr[j + 1] = key;
  return arr;
}

// Test cases
console.log("=== Insertion Sort ===");

const testArr1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Test 1:", insertionSort([...testArr1]));

const testArr2 = [5, 2, 8, 1, 9];
console.log("Test 2:", insertionSort([...testArr2]));

const testArr3 = [1, 2, 3, 4, 5]; // Already sorted
console.log("Test 3 (already sorted):", insertionSort([...testArr3]));

const testArr4 = [5, 4, 3, 2, 1]; // Reverse sorted
console.log("Test 4 (reverse sorted):", insertionSort([...testArr4]));

console.log("\n=== Binary Search Variant ===");
console.log("Result:", insertionSort_Binary([64, 34, 25, 12, 22, 11, 90]));

console.log("\n=== Descending Order ===");
console.log("Result:", insertionSort_Descending([64, 34, 25, 12, 22, 11, 90]));

console.log("\n=== Recursive Insertion Sort ===");
console.log("Result:", insertionSort_Recursive([5, 2, 8, 1, 9]));

console.log("\n=== Detailed Trace ===");
insertionSort_Detailed([5, 2, 8, 1, 3]);

console.log("\n=== Sorting Objects ===");
const objects = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
console.log("By age:", insertionSort_Objects([...objects], 'age', true));

console.log("\nTime Complexity: O(n²) average, O(n) best case");
console.log("Space Complexity: O(1) - in-place");
console.log("Stable: Yes");
console.log("Good for: Small arrays, nearly sorted data, online sorting");
