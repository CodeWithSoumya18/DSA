/**
 * Find the Next Greater Element for each element in an array
 * Using Stack
 */

// Method 1: Brute force approach
function nextGreaterElement_BruteForce(arr) {
  const result = new Array(arr.length).fill(-1);
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        result[i] = arr[j];
        break;
      }
    }
  }
  
  return result;
}

// Method 2: Using Stack (Optimal - Left to Right)
function nextGreaterElement(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
      const index = stack.pop();
      result[index] = arr[i];
    }
    stack.push(i);
  }
  
  return result;
}

// Method 3: Using Stack (Right to Left)
function nextGreaterElement_RightToLeft(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }
    
    if (stack.length > 0) {
      result[i] = stack[stack.length - 1];
    }
    
    stack.push(arr[i]);
  }
  
  return result;
}

// Method 4: With detailed steps
function nextGreaterElement_Detailed(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  
  console.log(`Array: [${arr.join(', ')}]\n`);
  
  for (let i = 0; i < arr.length; i++) {
    console.log(`Processing index ${i}, value ${arr[i]}`);
    
    while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
      const index = stack.pop();
      result[index] = arr[i];
      console.log(`  ${arr[index]} -> ${arr[i]} (at index ${index})`);
    }
    
    stack.push(i);
    console.log(`  Stack: [${stack.map(idx => arr[idx]).join(', ')}]\n`);
  }
  
  console.log(`Next Greater Elements: [${result.join(', ')}]\n`);
  return result;
}

// Method 5: For circular array
function nextGreaterElement_Circular(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  const n = arr.length;
  
  // Traverse array twice for circular effect
  for (let i = 0; i < 2 * n; i++) {
    const idx = i % n;
    
    while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[idx]) {
      const index = stack.pop();
      if (result[index] === -1) {
        result[index] = arr[idx];
      }
    }
    
    if (i < n) {
      stack.push(idx);
    }
  }
  
  return result;
}

// Method 6: With detailed info object
function nextGreaterElement_Detailed_Object(arr) {
  const result = [];
  const stack = [];
  
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }
    
    result[i] = {
      element: arr[i],
      nextGreater: stack.length > 0 ? stack[stack.length - 1] : -1
    };
    
    stack.push(arr[i]);
  }
  
  return result;
}

// Test cases
console.log("=== Find Next Greater Element ===");

const testArr1 = [4, 5, 2, 25];
console.log(`Array: [${testArr1.join(', ')}]`);
console.log(`Brute Force: [${nextGreaterElement_BruteForce(testArr1).join(', ')}]`);
console.log(`Stack (Left to Right): [${nextGreaterElement(testArr1).join(', ')}]`);
console.log(`Stack (Right to Left): [${nextGreaterElement_RightToLeft(testArr1).join(', ')}]`);

console.log("\n=== Test 2 ===");
const testArr2 = [1, 5, 0, 3, 4, 5];
console.log(`Array: [${testArr2.join(', ')}]`);
console.log(`Result: [${nextGreaterElement(testArr2).join(', ')}]`);

console.log("\n=== Test 3 (Decreasing) ===");
const testArr3 = [5, 4, 3, 2, 1];
console.log(`Array: [${testArr3.join(', ')}]`);
console.log(`Result: [${nextGreaterElement(testArr3).join(', ')}]`);

console.log("\n=== Test 4 (All same) ===");
const testArr4 = [3, 3, 3, 3];
console.log(`Array: [${testArr4.join(', ')}]`);
console.log(`Result: [${nextGreaterElement(testArr4).join(', ')}]`);

console.log("\n=== Detailed Trace ===");
nextGreaterElement_Detailed([1, 5, 0, 3, 4]);

console.log("\n=== Circular Array ===");
const testArr5 = [1, 2, 1];
console.log(`Array: [${testArr5.join(', ')}]`);
console.log(`Circular: [${nextGreaterElement_Circular(testArr5).join(', ')}]`);

console.log("\n=== Detailed Object Format ===");
const arr = [4, 5, 2, 25];
const detailedResult = nextGreaterElement_Detailed_Object(arr);
console.log("Array:", arr);
detailedResult.forEach(item => {
  console.log(`${item.element} -> ${item.nextGreater}`);
});

console.log("\nTime Complexity: O(n) - each element pushed and popped once");
console.log("Space Complexity: O(n) for stack");
