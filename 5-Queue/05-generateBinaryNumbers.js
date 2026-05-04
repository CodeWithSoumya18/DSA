/**
 * Generate Binary Numbers from 1 to n using Queue
 */

// Method 1: Using queue to generate binary numbers
function generateBinaryNumbers(n) {
  const queue = [];
  const result = [];
  
  queue.push("1");
  
  for (let i = 0; i < n; i++) {
    const front = queue.shift();
    result.push(front);
    
    // Generate next numbers by appending 0 and 1
    queue.push(front + "0");
    queue.push(front + "1");
  }
  
  return result;
}

// Method 2: With detailed steps
function generateBinaryNumbers_Detailed(n) {
  const queue = [];
  const result = [];
  
  queue.push("1");
  console.log(`Generating binary numbers from 1 to ${n}\n`);
  
  for (let i = 0; i < n; i++) {
    const front = queue.shift();
    result.push(front);
    
    const binary0 = front + "0";
    const binary1 = front + "1";
    
    queue.push(binary0);
    queue.push(binary1);
    
    console.log(`Step ${i + 1}:`);
    console.log(`  Dequeue: ${front}`);
    console.log(`  Enqueue: ${binary0}, ${binary1}`);
    console.log(`  Queue: [${queue.join(', ')}]`);
    console.log(`  Result so far: [${result.join(', ')}]\n`);
  }
  
  return result;
}

// Method 3: Convert to decimal
function generateBinaryNumbers_WithDecimal(n) {
  const queue = [];
  const result = [];
  
  queue.push({ binary: "1", decimal: 1 });
  
  for (let i = 0; i < n; i++) {
    const front = queue.shift();
    result.push(front);
    
    const binary0 = front.binary + "0";
    const binary1 = front.binary + "1";
    
    queue.push({ 
      binary: binary0, 
      decimal: parseInt(binary0, 2) 
    });
    queue.push({ 
      binary: binary1, 
      decimal: parseInt(binary1, 2) 
    });
  }
  
  return result;
}

// Method 4: Return only binary strings up to n numbers
function generateBinaryNumbers_Optimized(n) {
  if (n <= 0) return [];
  
  const result = [];
  const queue = [1];
  let count = 0;
  
  while (count < n) {
    const current = queue.shift();
    result.push(current.toString(2));
    
    queue.push(current * 2);
    queue.push(current * 2 + 1);
    
    count++;
  }
  
  return result;
}

// Method 5: Recursive approach
function generateBinaryNumbers_Recursive(n, current = "", result = []) {
  if (result.length === n) return result;
  
  if (current === "") {
    return generateBinaryNumbers_Recursive(n, "1", result);
  }
  
  result.push(current);
  
  generateBinaryNumbers_Recursive(n, current + "0", result);
  generateBinaryNumbers_Recursive(n, current + "1", result);
  
  return result.slice(0, n);
}

// Method 6: Using BFS level by level
function generateBinaryNumbers_LevelOrder(n) {
  const result = [];
  const queue = ["1"];
  let count = 0;
  
  while (count < n && queue.length > 0) {
    const size = queue.length;
    
    for (let i = 0; i < size && count < n; i++) {
      const current = queue.shift();
      result.push(current);
      count++;
      
      queue.push(current + "0");
      queue.push(current + "1");
    }
  }
  
  return result;
}

// Test cases
console.log("=== Generate Binary Numbers using Queue ===\n");

for (let n of [5, 8, 10]) {
  const result = generateBinaryNumbers(n);
  console.log(`First ${n} binary numbers: [${result.join(', ')}]`);
}

console.log("\n=== Detailed Trace ===");
generateBinaryNumbers_Detailed(8);

console.log("\n=== With Decimal Conversion ===");
const result = generateBinaryNumbers_WithDecimal(10);
console.log("First 10 numbers:");
result.forEach(item => {
  console.log(`  ${item.decimal} = ${item.binary}`);
});

console.log("\n=== Optimized Method ===");
for (let n of [5, 8, 10]) {
  const result = generateBinaryNumbers_Optimized(n);
  console.log(`First ${n}: [${result.join(', ')}]`);
}

console.log("\n=== Conversion Comparison ===");
const binary = generateBinaryNumbers(8);
console.log("Binary numbers:", binary);
console.log("Decimal equivalents:", binary.map(b => parseInt(b, 2)));

console.log("\n=== Format Output ===");
const binaryNums = generateBinaryNumbers(15);
console.log("First 15 binary numbers:");
for (let i = 0; i < binaryNums.length; i++) {
  const binary = binaryNums[i];
  const decimal = parseInt(binary, 2);
  console.log(`  ${i + 1}. ${binary.padStart(4)} (decimal: ${decimal})`);
}

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(n)");
console.log("Note: Each number contains 1 bit more than previous level");
