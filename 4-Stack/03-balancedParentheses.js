/**
 * Check if parentheses are balanced in a string
 * Using Stack
 */

// Method 1: Basic parentheses checking
function isBalanced(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of str) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

// Method 2: With more characters (only checking parentheses)
function isBalanced_Detailed(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  console.log(`Checking: "${str}"`);
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    console.log(`Char ${i}: '${char}'`);
    
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
      console.log(`  Pushed '${char}'. Stack: [${stack.join(', ')}]`);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.length === 0) {
        console.log(`  Error: No matching opening bracket`);
        return false;
      }
      const top = stack.pop();
      if (top !== pairs[char]) {
        console.log(`  Error: '${top}' doesn't match '${char}'`);
        return false;
      }
      console.log(`  Matched '${top}' with '${char}'. Stack: [${stack.join(', ')}]`);
    }
  }
  
  if (stack.length === 0) {
    console.log(`Final: Balanced!`);
    return true;
  } else {
    console.log(`Final: Unbalanced - unmatched brackets: [${stack.join(', ')}]`);
    return false;
  }
}

// Method 3: Check multiple types of brackets
function isBalancedMultiple(str) {
  const stack = [];
  const opening = new Set(['(', '{', '[']);
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of str) {
    if (opening.has(char)) {
      stack.push(char);
    } else if (pairs[char]) {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

// Method 4: Handle nested structures
function isBalancedNested(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if (char === '(' || char === '{' || char === '[') {
      stack.push({ type: char, index: i });
    } else if (pairs[char]) {
      if (stack.length === 0) {
        return {
          balanced: false,
          error: `Unmatched '${char}' at index ${i}`
        };
      }
      const top = stack.pop();
      if (top.type !== pairs[char]) {
        return {
          balanced: false,
          error: `Mismatched '${top.type}' at index ${top.index} and '${char}' at index ${i}`
        };
      }
    }
  }
  
  if (stack.length === 0) {
    return { balanced: true };
  } else {
    return {
      balanced: false,
      error: `Unmatched '${stack[0].type}' at index ${stack[0].index}`
    };
  }
}

// Test cases
console.log("=== Check Balanced Parentheses ===");

const testCases = [
  "()",
  "()[]{}",
  "([{}])",
  "([)]",
  "{[}]",
  "((())",
  "()()())",
  "",
  "({[]})",
  "({[}])"
];

testCases.forEach(test => {
  console.log(`"${test}": ${isBalanced(test) ? 'Balanced' : 'Unbalanced'}`);
});

console.log("\n=== Detailed Analysis ===");
isBalanced_Detailed("({[]})");

console.log("\n");
isBalanced_Detailed("([)]");

console.log("\n=== With Error Details ===");
const errorCases = ["(]", "([)]", "{[}", "(()", "))"];

errorCases.forEach(test => {
  const result = isBalancedNested(test);
  console.log(`"${test}":`, result);
});

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(n) for stack");
