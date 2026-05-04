/**
 * Implement a Stack using an Array
 */

class Stack {
  constructor() {
    this.items = [];
  }
  
  // Push element onto stack
  push(element) {
    this.items.push(element);
  }
  
  // Pop element from stack
  pop() {
    if (this.isEmpty()) return undefined;
    return this.items.pop();
  }
  
  // Peek at top element
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }
  
  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Get stack size
  size() {
    return this.items.length;
  }
  
  // Clear stack
  clear() {
    this.items = [];
  }
  
  // Print stack
  print() {
    console.log(this.items.toString());
  }
  
  // Get all elements
  toArray() {
    return [...this.items];
  }
}

// Use array methods directly
class SimpleStack {
  constructor() {
    this.data = [];
  }
  
  push(x) {
    this.data.push(x);
  }
  
  pop() {
    return this.data.pop();
  }
  
  top() {
    return this.data[this.data.length - 1];
  }
}

// Test cases
console.log("=== Stack Implementation (Array-based) ===");

const stack = new Stack();
console.log("Is empty:", stack.isEmpty());

console.log("\n=== Push operations ===");
stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);
stack.print();
console.log("Size:", stack.size());
console.log("Peek:", stack.peek());

console.log("\n=== Pop operations ===");
console.log("Popped:", stack.pop());
stack.print();
console.log("Popped:", stack.pop());
stack.print();

console.log("\n=== More operations ===");
console.log("Size:", stack.size());
console.log("Peek:", stack.peek());
console.log("Is empty:", stack.isEmpty());

console.log("\n=== Pop until empty ===");
while (!stack.isEmpty()) {
  console.log("Popping:", stack.pop());
}
console.log("Is empty:", stack.isEmpty());

console.log("\n=== LIFO demonstration ===");
const stack2 = new Stack();
[1, 2, 3, 4, 5].forEach(x => stack2.push(x));
console.log("Pushed:", [1, 2, 3, 4, 5]);
const result = [];
while (!stack2.isEmpty()) {
  result.push(stack2.pop());
}
console.log("Popped order (LIFO):", result);

console.log("\nTime Complexity:");
console.log("  Push: O(1)");
console.log("  Pop: O(1)");
console.log("  Peek: O(1)");
console.log("Space Complexity: O(n)");
