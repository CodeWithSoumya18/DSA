/**
 * Implement a Queue using Two Stacks
 */

class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}

// Method 1: Two stacks - transfer on dequeue
class Queue_Method1 {
  constructor() {
    this.stackIn = new Stack();
    this.stackOut = new Stack();
  }
  
  enqueue(element) {
    this.stackIn.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) return undefined;
    
    // Transfer all elements from stackIn to stackOut
    if (this.stackOut.isEmpty()) {
      while (!this.stackIn.isEmpty()) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    
    return this.stackOut.pop();
  }
  
  isEmpty() {
    return this.stackIn.isEmpty() && this.stackOut.isEmpty();
  }
  
  size() {
    return this.stackIn.size() + this.stackOut.size();
  }
}

// Method 2: With optimization - lazy transfer
class Queue_Method2 {
  constructor() {
    this.stackIn = new Stack();
    this.stackOut = new Stack();
  }
  
  enqueue(element) {
    console.log(`Enqueued: ${element}`);
    this.stackIn.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return undefined;
    }
    
    if (this.stackOut.isEmpty()) {
      console.log("Transferring from stackIn to stackOut");
      while (!this.stackIn.isEmpty()) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    
    const element = this.stackOut.pop();
    console.log(`Dequeued: ${element}`);
    return element;
  }
  
  isEmpty() {
    return this.stackIn.isEmpty() && this.stackOut.isEmpty();
  }
  
  size() {
    return this.stackIn.size() + this.stackOut.size();
  }
  
  printState() {
    console.log(`StackIn: [${this.stackIn.items.join(', ')}]`);
    console.log(`StackOut: [${this.stackOut.items.join(', ')}]`);
  }
}

// Method 3: With peek operation
class Queue_Full {
  constructor() {
    this.stackIn = new Stack();
    this.stackOut = new Stack();
  }
  
  enqueue(element) {
    this.stackIn.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) return undefined;
    
    if (this.stackOut.isEmpty()) {
      while (!this.stackIn.isEmpty()) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    
    return this.stackOut.pop();
  }
  
  front() {
    if (this.isEmpty()) return undefined;
    
    if (this.stackOut.isEmpty()) {
      while (!this.stackIn.isEmpty()) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    
    return this.stackOut.peek();
  }
  
  isEmpty() {
    return this.stackIn.isEmpty() && this.stackOut.isEmpty();
  }
  
  size() {
    return this.stackIn.size() + this.stackOut.size();
  }
  
  toArray() {
    const result = [...this.stackOut.items].reverse();
    result.push(...this.stackIn.items.reverse());
    return result;
  }
}

// Test cases
console.log("=== Queue using Two Stacks ===");

const queue = new Queue_Method1();
console.log("Is empty:", queue.isEmpty());

console.log("\n=== Enqueue operations ===");
[10, 20, 30, 40].forEach(x => queue.enqueue(x));
console.log("Size:", queue.size());

console.log("\n=== Dequeue operations ===");
console.log("Dequeued:", queue.dequeue());
console.log("Dequeued:", queue.dequeue());
console.log("Size:", queue.size());

console.log("\n=== Enqueue more ===");
queue.enqueue(50);
queue.enqueue(60);
console.log("Size:", queue.size());

console.log("\n=== Dequeue until empty ===");
while (!queue.isEmpty()) {
  console.log("Dequeue:", queue.dequeue());
}
console.log("Is empty:", queue.isEmpty());

console.log("\n=== FIFO demonstration ===");
const queue2 = new Queue_Method1();
[1, 2, 3, 4, 5].forEach(x => queue2.enqueue(x));
console.log("Enqueued: [1, 2, 3, 4, 5]");
const result = [];
while (!queue2.isEmpty()) {
  result.push(queue2.dequeue());
}
console.log("Dequeued order (FIFO):", result);

console.log("\n=== Detailed Trace ===");
const queue3 = new Queue_Method2();
queue3.enqueue(1);
queue3.enqueue(2);
queue3.enqueue(3);
queue3.printState();

console.log("\nFirst dequeue:");
queue3.dequeue();
queue3.printState();

console.log("\nEnqueue 4 and 5:");
queue3.enqueue(4);
queue3.enqueue(5);
queue3.printState();

console.log("\n=== Full Queue with Peek ===");
const queue4 = new Queue_Full();
[10, 20, 30].forEach(x => queue4.enqueue(x));
console.log("Queue:", queue4.toArray());
console.log("Front:", queue4.front());
console.log("Dequeue:", queue4.dequeue());
console.log("Front:", queue4.front());

console.log("\nTime Complexity:");
console.log("  Enqueue: O(1)");
console.log("  Dequeue: O(n) amortized, O(1) amortized per operation");
console.log("Space Complexity: O(n)");
