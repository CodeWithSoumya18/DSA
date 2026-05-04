/**
 * Check if a String is a Palindrome using Deque
 */

// Method 1: Simple deque-based palindrome check
function isPalindrome(str) {
  const deque = [];
  
  // Add all characters to deque
  for (let char of str.toLowerCase()) {
    if (/[a-z0-9]/.test(char)) {
      deque.push(char);
    }
  }
  
  // Check from both ends
  while (deque.length > 1) {
    if (deque.shift() !== deque.pop()) {
      return false;
    }
  }
  
  return true;
}

// Method 2: With detailed steps
function isPalindrome_Detailed(str) {
  const deque = [];
  const original = str;
  str = str.toLowerCase();
  
  console.log(`Checking: "${original}"`);
  
  // Filter and add to deque
  for (let char of str) {
    if (/[a-z0-9]/.test(char)) {
      deque.push(char);
    }
  }
  
  console.log(`Deque: [${deque.join(', ')}]\n`);
  
  let step = 1;
  while (deque.length > 1) {
    const first = deque.shift();
    const last = deque.pop();
    
    console.log(`Step ${step}:`);
    console.log(`  Compare: '${first}' == '${last}' ? ${first === last}`);
    console.log(`  Remaining: [${deque.join(', ')}]`);
    
    if (first !== last) {
      console.log(`  Result: NOT a palindrome`);
      return false;
    }
    
    step++;
  }
  
  console.log(`Result: IS a palindrome`);
  return true;
}

// Method 3: Using two pointers with deque
function isPalindrome_TwoPointer(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const deque = cleaned.split('');
  
  while (deque.length > 1) {
    if (deque.shift() !== deque.pop()) {
      return false;
    }
  }
  
  return true;
}

// Method 4: Ignore spaces and special characters
function isPalindrome_Ignoring(str) {
  const deque = [];
  
  for (let char of str) {
    if (/[a-zA-Z0-9]/.test(char)) {
      deque.push(char.toLowerCase());
    }
  }
  
  while (deque.length > 1) {
    if (deque.shift() !== deque.pop()) {
      return false;
    }
  }
  
  return true;
}

// Method 5: Return details object
function isPalindrome_WithDetails(str) {
  const deque = [];
  const original = str;
  const cleaned = [];
  
  for (let char of str.toLowerCase()) {
    if (/[a-z0-9]/.test(char)) {
      deque.push(char);
      cleaned.push(char);
    }
  }
  
  let comparisons = 0;
  let matches = 0;
  
  while (deque.length > 1) {
    const first = deque.shift();
    const last = deque.pop();
    comparisons++;
    
    if (first === last) {
      matches++;
    } else {
      return {
        original,
        cleaned: cleaned.join(''),
        isPalindrome: false,
        comparisons,
        matches
      };
    }
  }
  
  return {
    original,
    cleaned: cleaned.join(''),
    isPalindrome: true,
    comparisons,
    matches: comparisons
  };
}

// Method 6: Case variations
function testPalindromeVariations(str) {
  const results = {};
  
  // Exact match
  const deque1 = str.split('');
  let exact = true;
  while (deque1.length > 1) {
    if (deque1.shift() !== deque1.pop()) {
      exact = false;
      break;
    }
  }
  results.exact = exact;
  
  // Case-insensitive
  results.caseInsensitive = isPalindrome_TwoPointer(str);
  
  // Ignore space and punctuation
  results.ignoreSpecial = isPalindrome_Ignoring(str);
  
  return results;
}

// Test cases
console.log("=== Check Palindrome using Deque ===\n");

const testStrings = [
  "racecar",
  "hello",
  "madam",
  "A man a plan a canal Panama",
  "12321",
  "123456",
  "Was it a car or a cat I saw?",
  "Able was I ere I saw Elba",
  "level",
  "world"
];

testStrings.forEach(str => {
  console.log(`"${str}": ${isPalindrome(str) ? 'Palindrome' : 'Not Palindrome'}`);
});

console.log("\n=== Ignoring Special Characters ===");
const specialStrings = [
  "A man, a plan, a canal: Panama",
  "race a car",
  "0P",
  "a.b.c"
];

specialStrings.forEach(str => {
  console.log(`"${str}": ${isPalindrome_Ignoring(str) ? 'Palindrome' : 'Not Palindrome'}`);
});

console.log("\n=== Detailed Analysis ===");
isPalindrome_Detailed("racecar");

console.log("\n");
isPalindrome_Detailed("hello");

console.log("\n=== With Details ===");
const details1 = isPalindrome_WithDetails("racecar");
console.log(`"${details1.original}"`);
console.log(`  Cleaned: "${details1.cleaned}"`);
console.log(`  Palindrome: ${details1.isPalindrome}`);
console.log(`  Comparisons: ${details1.comparisons}`);

const details2 = isPalindrome_WithDetails("A man a plan a canal Panama");
console.log(`\n"${details2.original}"`);
console.log(`  Cleaned: "${details2.cleaned}"`);
console.log(`  Palindrome: ${details2.isPalindrome}`);
console.log(`  Comparisons: ${details2.comparisons}`);

console.log("\n=== Case Variations ===");
console.log('Testing "RaceCar":');
console.log(testPalindromeVariations("RaceCar"));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(n)");
console.log("Note: Works with various character filters and case handling");
