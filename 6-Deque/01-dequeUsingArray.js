/**
 * Implement a Deque (Double Ended Queue) using Array
 */

class Deque {
  constructor() {
    this.items = [];
  }
  
  // Add element at front
  addFirst(element) {
    this.items.unshift(element);
  }
  
  // Add element at rear
  addLast(element) {
    this.items.push(element);
  }
  
  // Remove element from front
  removeFirst() {
    if (this.isEmpty()) return undefined;
    return this.items.shift();
  }
  
  // Remove element from rear
  removeLast() {
    if (this.isEmpty()) return undefined;
    return this.items.pop();
  }
  
  // Get element from front without removing
  getFirst() {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }
  
  // Get element from rear without removing
  getLast() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }
  
  // Check if empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Get size
  size() {
    return this.items.length;
  }
  
  // Clear deque
  clear() {
    this.items = [];
  }
  
  // Print deque
  print() {
    console.log("Front -> [" + this.items.join(", ") + "] <- Rear");
  }
  
  // Get all elements
  toArray() {
    return [...this.items];
  }
}

// Optimized Deque using pointers
class OptimizedDeque {
  constructor(maxSize = 100) {
    this.items = new Array(maxSize);
    this.front = 0;
    this.rear = -1;
    this.maxSize = maxSize;
  }
  
  addFirst(element) {
    if (this.front === 0) {
      // Need to shift all elements
      for (let i = this.rear; i >= this.front; i--) {
        this.items[i + 1] = this.items[i];
      }
      this.rear++;
      this.items[this.front] = element;
    } else {
      this.front--;
      this.items[this.front] = element;
    }
  }
  
  addLast(element) {
    this.rear++;
    this.items[this.rear] = element;
  }
  
  removeFirst() {
    if (this.isEmpty()) return undefined;
    const element = this.items[this.front];
    if (this.front === this.rear) {
      this.rear = -1;
    } else {
      this.front++;
    }
    return element;
  }
  
  removeLast() {
    if (this.isEmpty()) return undefined;
    const element = this.items[this.rear];
    if (this.front === this.rear) {
      this.rear = -1;
    } else {
      this.rear--;
    }
    return element;
  }
  
  getFirst() {
    return this.isEmpty() ? undefined : this.items[this.front];
  }
  
  getLast() {
    return this.isEmpty() ? undefined : this.items[this.rear];
  }
  
  isEmpty() {
    return this.rear === -1;
  }
  
  size() {
    return this.isEmpty() ? 0 : this.rear - this.front + 1;
  }
  
  print() {
    if (this.isEmpty()) {
      console.log("Deque is empty");
    } else {
      const elements = [];
      for (let i = this.front; i <= this.rear; i++) {
        elements.push(this.items[i]);
      }
      console.log("Front -> [" + elements.join(", ") + "] <- Rear");
    }
  }
}

// Test cases
console.log("=== Deque Implementation (Array-based) ===");

const deque = new Deque();
console.log("Is empty:", deque.isEmpty());

console.log("\n=== Add operations ===");
deque.addLast(10);
deque.addLast(20);
deque.addFirst(5);
deque.addFirst(1);
deque.print();
console.log("Size:", deque.size());

console.log("\n=== Get operations ===");
console.log("First:", deque.getFirst());
console.log("Last:", deque.getLast());

console.log("\n=== Remove operations ===");
console.log("Remove first:", deque.removeFirst());
deque.print();
console.log("Remove last:", deque.removeLast());
deque.print();

console.log("\n=== More additions ===");
deque.addFirst(2);
deque.addLast(30);
deque.print();
console.log("Size:", deque.size());

console.log("\n=== Remove until empty ===");
while (!deque.isEmpty()) {
  console.log("Remove first:", deque.removeFirst());
}
console.log("Is empty:", deque.isEmpty());

console.log("\n=== Deque as Stack ===");
const stack = new Deque();
[1, 2, 3, 4, 5].forEach(x => stack.addLast(x));
console.log("Added as stack: [1, 2, 3, 4, 5]");
stack.print();
const stackResult = [];
while (!stack.isEmpty()) {
  stackResult.push(stack.removeLast());
}
console.log("Remove from rear (LIFO):", stackResult);

console.log("\n=== Deque as Queue ===");
const queue = new Deque();
[1, 2, 3, 4, 5].forEach(x => queue.addLast(x));
console.log("Added as queue: [1, 2, 3, 4, 5]");
queue.print();
const queueResult = [];
while (!queue.isEmpty()) {
  queueResult.push(queue.removeFirst());
}
console.log("Remove from front (FIFO):", queueResult);

console.log("\n=== Optimized Deque ===");
const optDeque = new OptimizedDeque(10);
optDeque.addLast(10);
optDeque.addLast(20);
optDeque.addLast(30);
optDeque.addFirst(5);
console.log("After operations:");
optDeque.print();
console.log("Remove first:", optDeque.removeFirst());
optDeque.print();

console.log("\nTime Complexity:");
console.log("  Add First/Last: O(n) for array, O(1) for optimized");
console.log("  Remove First/Last: O(n) for array, O(1) for optimized");
console.log("Space Complexity: O(n)");
