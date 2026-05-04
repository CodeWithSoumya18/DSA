/**
 * Evaluate a Postfix Expression
 * Example: "3 4 +" => 7, "5 3 2 * +" => 11
 */

// Method 1: Standard postfix evaluation
function evaluatePostfix(expression) {
  const stack = [];
  const tokens = expression.split(' ');
  
  for (let token of tokens) {
    if (!isOperator(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      const result = performOperation(a, b, token);
      stack.push(result);
    }
  }
  
  return stack[0];
}

function isOperator(token) {
  return ['+', '-', '*', '/', '%', '^'].includes(token);
}

function performOperation(a, b, operator) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    case '%': return a % b;
    case '^': return Math.pow(a, b);
    default: return 0;
  }
}

// Method 2: With detailed steps
function evaluatePostfix_Detailed(expression) {
  const stack = [];
  const tokens = expression.split(' ');
  
  console.log(`Evaluating: "${expression}"`);
  console.log(`Tokens: [${tokens.join(', ')}]\n`);
  
  for (let token of tokens) {
    console.log(`Token: '${token}'`);
    
    if (!isOperator(token)) {
      stack.push(parseFloat(token));
      console.log(`  Pushed ${token}. Stack: [${stack.join(', ')}]`);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      const result = performOperation(a, b, token);
      console.log(`  Operator: ${a} ${token} ${b} = ${result}`);
      stack.push(result);
      console.log(`  Stack: [${stack.join(', ')}]`);
    }
    console.log();
  }
  
  console.log(`Final result: ${stack[0]}`);
  return stack[0];
}

// Method 3: With validation
function evaluatePostfix_Validated(expression) {
  const stack = [];
  const tokens = expression.split(' ').filter(token => token !== '');
  
  for (let token of tokens) {
    if (!isOperator(token)) {
      const num = parseFloat(token);
      if (isNaN(num)) {
        throw new Error(`Invalid token: ${token}`);
      }
      stack.push(num);
    } else {
      if (stack.length < 2) {
        throw new Error(`Invalid expression: insufficient operands for ${token}`);
      }
      const b = stack.pop();
      const a = stack.pop();
      
      if (token === '/' && b === 0) {
        throw new Error(`Division by zero`);
      }
      
      const result = performOperation(a, b, token);
      stack.push(result);
    }
  }
  
  if (stack.length !== 1) {
    throw new Error(`Invalid expression: too many operands`);
  }
  
  return stack[0];
}

// Method 4: Convert infix to postfix (bonus)
function infixToPostfix(expression) {
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3 };
  const stack = [];
  let output = '';
  
  for (let char of expression) {
    if (char === ' ') continue;
    
    if (/[0-9]/.test(char)) {
      output += char + ' ';
    } else if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output += stack.pop() + ' ';
      }
      stack.pop(); // Remove '('
    } else if (isOperator(char)) {
      while (stack.length > 0 && isOperator(stack[stack.length - 1]) &&
             precedence[stack[stack.length - 1]] >= precedence[char]) {
        output += stack.pop() + ' ';
      }
      stack.push(char);
    }
  }
  
  while (stack.length > 0) {
    output += stack.pop() + ' ';
  }
  
  return output.trim();
}

// Test cases
console.log("=== Evaluate Postfix Expression ===");

const testCases = [
  "3 4 +",
  "5 3 2 * +",
  "10 5 /",
  "7 8 9 * +",
  "15 7 1 1 + - / 3 * 2 1 1 + + -"
];

testCases.forEach(test => {
  const result = evaluatePostfix(test);
  console.log(`"${test}" = ${result}`);
});

console.log("\n=== Detailed Evaluation ===");
evaluatePostfix_Detailed("5 3 2 * +");

console.log("\n=== Another Example ===");
evaluatePostfix_Detailed("10 2 / 3 4 * -");

console.log("\n=== With Error Handling ===");
const testWithErrors = [
  "3 4 +",
  "3 +",   // Error: insufficient operands
  "3 4 + 5 6", // Error: too many operands
  "10 0 /"  // Division by zero
];

testWithErrors.forEach(test => {
  try {
    const result = evaluatePostfix_Validated(test);
    console.log(`"${test}" = ${result}`);
  } catch (error) {
    console.log(`"${test}" => Error: ${error.message}`);
  }
});

console.log("\n=== Infix to Postfix Conversion ===");
const infixExpressions = [
  "3 + 4",
  "5 + 3 * 2",
  "(5 + 3) * 2",
  "10 / 2 - 3"
];

infixExpressions.forEach(infix => {
  const postfix = infixToPostfix(infix);
  const result = evaluatePostfix(postfix);
  console.log(`"${infix}" => "${postfix}" = ${result}`);
});

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(n) for stack");
