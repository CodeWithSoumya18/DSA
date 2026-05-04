/**
 * Find Maximum of all Subarrays of size k using Deque
 * Sliding Window Maximum Problem
 */

// Method 1: Brute force
function maxInSubarray_BruteForce(arr, k) {
  const result = [];
  
  for (let i = 0; i <= arr.length - k; i++) {
    let max = arr[i];
    
    for (let j = i + 1; j < i + k; j++) {
      max = Math.max(max, arr[j]);
    }
    
    result.push(max);
  }
  
  return result;
}

// Method 2: Using Deque (optimal)
function maxInSubarray_Deque(arr, k) {
  if (arr.length < k) return [];
  
  const deque = [];
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    // Remove elements outside current window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // Remove elements smaller than current element
    while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
      deque.pop();
    }
    
    // Add current element index
    deque.push(i);
    
    // Add max to result when window size reaches k
    if (i >= k - 1) {
      result.push(arr[deque[0]]);
    }
  }
  
  return result;
}

// Method 3: With detailed steps
function maxInSubarray_Deque_Detailed(arr, k) {
  if (arr.length < k) return [];
  
  const deque = [];
  const result = [];
  
  console.log(`Array: [${arr.join(', ')}], Window size: ${k}\n`);
  
  for (let i = 0; i < arr.length; i++) {
    console.log(`Step ${i + 1}: Processing index ${i} (value ${arr[i]})`);
    
    // Remove elements outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      const removed = deque.shift();
      console.log(`  Removed ${removed} (outside window)`);
    }
    
    // Remove smaller elements
    while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
      const removed = deque.pop();
      console.log(`  Removed ${removed} (value ${arr[removed]} <= ${arr[i]})`);
    }
    
    // Add current element
    deque.push(i);
    console.log(`  Added ${i}. Deque: [${deque.join(', ')}] (values: [${deque.map(idx => arr[idx]).join(', ')}])`);
    
    // Add max when window is full
    if (i >= k - 1) {
      const max = arr[deque[0]];
      result.push(max);
      console.log(`  Window [${arr.slice(i - k + 1, i + 1).join(', ')}] -> Max: ${max}`);
    }
    
    console.log();
  }
  
  return result;
}

// Method 4: Using Object for deque (alternative)
function maxInSubarray_ObjectDeque(arr, k) {
  if (arr.length < k) return [];
  
  const deque = {};
  let front = 0;
  let rear = 0;
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    // Remove outside window
    while (front < rear && Object.keys(deque)[0] < i - k + 1) {
      delete deque[front];
      front++;
    }
    
    // Remove smaller elements
    while (front < rear && arr[Object.keys(deque)[Object.keys(deque).length - 1]] <= arr[i]) {
      delete deque[rear - 1];
      rear--;
    }
    
    deque[i] = arr[i];
    rear++;
    
    if (i >= k - 1) {
      result.push(arr[Object.keys(deque)[0]]);
    }
  }
  
  return result;
}

// Method 5: For minimum in subarray
function minInSubarray_Deque(arr, k) {
  if (arr.length < k) return [];
  
  const deque = [];
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    // Remove outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // Remove elements larger than current
    while (deque.length > 0 && arr[deque[deque.length - 1]] >= arr[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    if (i >= k - 1) {
      result.push(arr[deque[0]]);
    }
  }
  
  return result;
}

// Test cases
console.log("=== Maximum in All Subarrays (Sliding Window) ===\n");

const testArr1 = [1, 3, 1, 2, 0, 5];
const k = 3;
console.log(`Array: [${testArr1.join(', ')}], k = ${k}`);
console.log("Brute Force:", maxInSubarray_BruteForce(testArr1, k));
console.log("Deque:", maxInSubarray_Deque(testArr1, k));

console.log("\n=== Test 2 ===");
const testArr2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const k2 = 3;
console.log(`Array: [${testArr2.join(', ')}], k = ${k2}`);
console.log("Result:", maxInSubarray_Deque(testArr2, k2));

console.log("\n=== Test 3 ===");
const testArr3 = [5, 4, 6, 2, 3, 5];
const k3 = 2;
console.log(`Array: [${testArr3.join(', ')}], k = ${k3}`);
console.log("Result:", maxInSubarray_Deque(testArr3, k3));

console.log("\n=== Detailed Trace ===");
maxInSubarray_Deque_Detailed([1, 3, 1, 2, 0, 5], 3);

console.log("\n=== Minimum in Subarrays ===");
console.log(`Array: [${testArr1.join(', ')}], k = ${k}`);
console.log("Min in subarrays:", minInSubarray_Deque(testArr1, k));

console.log("\n=== Larger Window ===");
const testArr4 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(`Array: [${testArr4.join(', ')}]`);
console.log("Max with k=4:", maxInSubarray_Deque(testArr4, 4));
console.log("Max with k=5:", maxInSubarray_Deque(testArr4, 5));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(k)");
console.log("Each element is added and removed at most once from deque");
