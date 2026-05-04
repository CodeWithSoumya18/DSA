/**
 * Implement a Stack using a Linked List
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }
  
  // Push element onto stack
  push(data) {
    const node = new Node(data);
    node.next = this.top;
    this.top = node;
    this.size++;
  }
  
  // Pop element from stack
  pop() {
    if (this.isEmpty()) return undefined;
    
    const data = this.top.data;
    this.top = this.top.next;
    this.size--;
    return data;
  }
  
  // Peek at top element
  peek() {
    return this.isEmpty() ? undefined : this.top.data;
  }
  
  // Check if stack is empty
  isEmpty() {
    return this.top === null;
  }
  
  // Get stack size
  getSize() {
    return this.size;
  }
  
  // Clear stack
  clear() {
    this.top = null;
    this.size = 0;
  }
  
  // Print stack from top to bottom
  print() {
    let current = this.top;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    console.log(result.join(' -> ') || 'Empty');
  }
  
  // Get all elements as array
  toArray() {
    const result = [];
    let current = this.top;
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }
}

// Test cases
console.log("=== Stack Implementation (Linked List-based) ===");

const stack = new Stack();
console.log("Is empty:", stack.isEmpty());
console.log("Size:", stack.getSize());

console.log("\n=== Push operations ===");
stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);
stack.print();
console.log("Size:", stack.getSize());
console.log("Top element:", stack.peek());

console.log("\n=== Pop operations ===");
console.log("Popped:", stack.pop());
stack.print();
console.log("Size:", stack.getSize());

console.log("Popped:", stack.pop());
stack.print();
console.log("Size:", stack.getSize());

console.log("\n=== More operations ===");
console.log("Peek:", stack.peek());
console.log("Is empty:", stack.isEmpty());

console.log("\n=== Pop until empty ===");
while (!stack.isEmpty()) {
  console.log("Popping:", stack.pop());
  console.log("Size:", stack.getSize());
}
console.log("Is empty:", stack.isEmpty());

console.log("\n=== LIFO demonstration ===");
const stack2 = new Stack();
[1, 2, 3, 4, 5].forEach(x => stack2.push(x));
console.log("Pushed: [1, 2, 3, 4, 5]");
stack2.print();
const result = [];
while (!stack2.isEmpty()) {
  result.push(stack2.pop());
}
console.log("Popped order (LIFO):", result);

console.log("\n=== String reversal using stack ===");
const stack3 = new Stack();
const str = "Hello";
for (let char of str) {
  stack3.push(char);
}
console.log("Original string:", str);
let reversed = "";
while (!stack3.isEmpty()) {
  reversed += stack3.pop();
}
console.log("Reversed string:", reversed);

console.log("\nTime Complexity:");
console.log("  Push: O(1)");
console.log("  Pop: O(1)");
console.log("  Peek: O(1)");
console.log("Space Complexity: O(n)");
console.log("Advantage: Dynamic size, no pre-allocation needed");
