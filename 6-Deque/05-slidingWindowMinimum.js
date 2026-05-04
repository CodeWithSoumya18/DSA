/**
 * Sliding Window Minimum Problem using Deque
 */

// Method 1: Brute force
function slidingWindowMinimum_BruteForce(arr, k) {
  const result = [];
  
  for (let i = 0; i <= arr.length - k; i++) {
    let min = arr[i];
    
    for (let j = i + 1; j < i + k; j++) {
      min = Math.min(min, arr[j]);
    }
    
    result.push(min);
  }
  
  return result;
}

// Method 2: Using Deque (optimal)
function slidingWindowMinimum(arr, k) {
  if (arr.length < k) return [];
  
  const deque = [];
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    // Remove elements outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // Remove elements larger than current (maintain increasing order)
    while (deque.length > 0 && arr[deque[deque.length - 1]] >= arr[i]) {
      deque.pop();
    }
    
    // Add current element index
    deque.push(i);
    
    // Add min to result when window size reaches k
    if (i >= k - 1) {
      result.push(arr[deque[0]]);
    }
  }
  
  return result;
}

// Method 2: With detailed steps
function slidingWindowMinimum_Detailed(arr, k) {
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
    
    // Remove larger elements
    while (deque.length > 0 && arr[deque[deque.length - 1]] >= arr[i]) {
      const removed = deque.pop();
      console.log(`  Removed ${removed} (value ${arr[removed]} >= ${arr[i]})`);
    }
    
    // Add current element
    deque.push(i);
    console.log(`  Added ${i}. Deque: [${deque.join(', ')}] (values: [${deque.map(idx => arr[idx]).join(', ')}])`);
    
    // Add min when window is full
    if (i >= k - 1) {
      const min = arr[deque[0]];
      result.push(min);
      const windowStart = i - k + 1;
      console.log(`  Window [${arr.slice(windowStart, i + 1).join(', ')}] -> Min: ${min}`);
    }
    
    console.log();
  }
  
  return result;
}

// Method 3: For maximum window (reverse logic)
function slidingWindowMaximum(arr, k) {
  if (arr.length < k) return [];
  
  const deque = [];
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    // Remove elements outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // Remove smaller elements than current
    while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    if (i >= k - 1) {
      result.push(arr[deque[0]]);
    }
  }
  
  return result;
}

// Method 4: Return min and max
function slidingWindowMinMax(arr, k) {
  if (arr.length < k) return [];
  
  const minDeque = [];
  const maxDeque = [];
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    // Min deque
    while (minDeque.length > 0 && minDeque[0] < i - k + 1) {
      minDeque.shift();
    }
    while (minDeque.length > 0 && arr[minDeque[minDeque.length - 1]] >= arr[i]) {
      minDeque.pop();
    }
    minDeque.push(i);
    
    // Max deque
    while (maxDeque.length > 0 && maxDeque[0] < i - k + 1) {
      maxDeque.shift();
    }
    while (maxDeque.length > 0 && arr[maxDeque[maxDeque.length - 1]] <= arr[i]) {
      maxDeque.pop();
    }
    maxDeque.push(i);
    
    if (i >= k - 1) {
      result.push({
        min: arr[minDeque[0]],
        max: arr[maxDeque[0]]
      });
    }
  }
  
  return result;
}

// Method 5: Get median of window
function slidingWindowMedian(arr, k) {
  if (arr.length < k) return [];
  
  const result = [];
  
  for (let i = 0; i <= arr.length - k; i++) {
    const window = arr.slice(i, i + k);
    window.sort((a, b) => a - b);
    
    if (k % 2 === 1) {
      result.push(window[Math.floor(k / 2)]);
    } else {
      result.push((window[k / 2 - 1] + window[k / 2]) / 2);
    }
  }
  
  return result;
}

// Test cases
console.log("=== Sliding Window Minimum ===\n");

const testArr1 = [1, 3, 1, 2, 0, 5];
const k = 3;
console.log(`Array: [${testArr1.join(', ')}], k = ${k}`);
console.log("Brute Force:", slidingWindowMinimum_BruteForce(testArr1, k));
console.log("Deque (Optimal):", slidingWindowMinimum(testArr1, k));

console.log("\n=== Test 2 ===");
const testArr2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log(`Array: [${testArr2.join(', ')}], k = ${k}`);
console.log("Result:", slidingWindowMinimum(testArr2, k));

console.log("\n=== Test 3 ===");
const testArr3 = [5, 4, 6, 2, 3, 5];
const k3 = 2;
console.log(`Array: [${testArr3.join(', ')}], k = ${k3}`);
console.log("Result:", slidingWindowMinimum(testArr3, k3));

console.log("\n=== Detailed Trace ===");
slidingWindowMinimum_Detailed([1, 3, 1, 2, 0, 5], 3);

console.log("\n=== Comparison: Min vs Max ===");
console.log(`Array: [${testArr1.join(', ')}], k = ${k}`);
console.log("Minimum:", slidingWindowMinimum(testArr1, k));
console.log("Maximum:", slidingWindowMaximum(testArr1, k));

console.log("\n=== Min and Max Together ===");
const minMax = slidingWindowMinMax(testArr1, k);
console.log("Min and Max:");
minMax.forEach((item, idx) => {
  console.log(`  Window ${idx}: min=${item.min}, max=${item.max}`);
});

console.log("\n=== Median of Windows ===");
console.log(`Array: [${testArr1.join(', ')}], k = ${k}`);
console.log("Medians:", slidingWindowMedian(testArr1, k));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(k)");
console.log("Each element is added and removed at most once from deque");
