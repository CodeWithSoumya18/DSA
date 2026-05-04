/**
 * Find the First Non-repeating Character in a Stream
 * Using Queue
 */

// Method 1: Using frequency map and queue
function firstNonRepeatingCharStream_V1(stream) {
  const freq = {};
  const queue = [];
  const result = [];
  
  for (let char of stream) {
    // Update frequency
    freq[char] = (freq[char] || 0) + 1;
    
    // Add to queue if first occurrence
    if (freq[char] === 1) {
      queue.push(char);
    }
    
    // Remove repeated characters from front
    while (queue.length > 0 && freq[queue[0]] > 1) {
      queue.shift();
    }
    
    // Add first non-repeating or -1 to result
    result.push(queue.length > 0 ? queue[0] : -1);
  }
  
  return result;
}

// Method 2: With detailed steps
function firstNonRepeatingCharStream_Detailed(stream) {
  const freq = {};
  const queue = [];
  const result = [];
  
  console.log(`Stream: "${stream}"\n`);
  
  for (let i = 0; i < stream.length; i++) {
    const char = stream[i];
    console.log(`Step ${i + 1}: Processing '${char}'`);
    
    // Update frequency
    freq[char] = (freq[char] || 0) + 1;
    console.log(`  Frequency: ${JSON.stringify(freq)}`);
    
    // Add to queue if first occurrence
    if (freq[char] === 1) {
      queue.push(char);
      console.log(`  First occurrence of '${char}', added to queue`);
    }
    
    // Remove repeated characters from front
    while (queue.length > 0 && freq[queue[0]] > 1) {
      const removed = queue.shift();
      console.log(`  Removed '${removed}' from queue (repeated)`);
    }
    
    // Get first non-repeating
    const firstNonRep = queue.length > 0 ? queue[0] : -1;
    result.push(firstNonRep);
    console.log(`  Queue: [${queue.join(', ')}]`);
    console.log(`  First non-repeating: ${firstNonRep}\n`);
  }
  
  return result;
}

// Method 3: More efficient using array instead of object
function firstNonRepeatingCharStream_Array(stream) {
  const MAX_CHARS = 26;
  const freq = new Array(MAX_CHARS).fill(0);
  const queue = [];
  const result = [];
  
  for (let char of stream) {
    const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
    freq[index]++;
    
    if (freq[index] === 1) {
      queue.push(char);
    }
    
    while (queue.length > 0) {
      const front = queue[0];
      const frontIndex = front.charCodeAt(0) - 'a'.charCodeAt(0);
      if (freq[frontIndex] > 1) {
        queue.shift();
      } else {
        break;
      }
    }
    
    result.push(queue.length > 0 ? queue[0] : -1);
  }
  
  return result;
}

// Method 4: Single char query
function firstNonRepeatingInStream(stream) {
  const result = [];
  
  for (let i = 0; i < stream.length; i++) {
    const substring = stream.substring(0, i + 1);
    const firstNonRep = findFirstNonRepeatingInString(substring);
    result.push(firstNonRep);
  }
  
  return result;
}

function findFirstNonRepeatingInString(str) {
  const freq = {};
  
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  for (let char of str) {
    if (freq[char] === 1) {
      return char;
    }
  }
  
  return -1;
}

// Method 5: Query with index
function firstNonRepeatingChar_WithIndex(stream) {
  const freq = {};
  const firstIndex = {};
  const result = [];
  
  for (let i = 0; i < stream.length; i++) {
    const char = stream[i];
    
    if (!firstIndex[char]) {
      firstIndex[char] = i;
    }
    
    freq[char] = (freq[char] || 0) + 1;
    
    let minIndex = Infinity;
    for (let c in firstIndex) {
      if (freq[c] === 1 && firstIndex[c] < minIndex) {
        minIndex = firstIndex[c];
      }
    }
    
    result.push(minIndex === Infinity ? -1 : stream[minIndex]);
  }
  
  return result;
}

// Test cases
console.log("=== First Non-repeating Character in Stream ===\n");

const testStreams = [
  "abadbc",
  "aab",
  "abcd",
  "aabbcc",
  "geeksforgeeks"
];

testStreams.forEach(stream => {
  const result = firstNonRepeatingCharStream_V1(stream);
  console.log(`Stream: "${stream}"`);
  console.log(`Result: [${result.join(', ')}]\n`);
});

console.log("=== Detailed Trace ===");
firstNonRepeatingCharStream_Detailed("abadbc");

console.log("\n=== Another Example ===");
firstNonRepeatingCharStream_Detailed("aab");

console.log("\n=== Using Array Method ===");
const testStream = "abadbc";
const resultArray = firstNonRepeatingCharStream_Array(testStream);
console.log(`Stream: "${testStream}"`);
console.log(`Result: [${resultArray.join(', ')}]`);

console.log("\n=== Using Index Tracking ===");
testStreams.forEach(stream => {
  const result = firstNonRepeatingChar_WithIndex(stream);
  console.log(`"${stream}" => [${result.join(', ')}]`);
});

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1) - at most 26 chars for lowercase");
