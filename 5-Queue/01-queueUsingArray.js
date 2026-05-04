/**
 * Implement a Queue using an Array
 */

class Queue {
  constructor() {
    this.items = [];
  }
  
  // Add element to rear
  enqueue(element) {
    this.items.push(element);
  }
  
  // Remove element from front
  dequeue() {
    if (this.isEmpty()) return undefined;
    return this.items.shift();
  }
  
  // Get front element
  front() {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }
  
  // Get rear element
  rear() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }
  
  // Check if queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Get queue size
  size() {
    return this.items.length;
  }
  
  // Clear queue
  clear() {
    this.items = [];
  }
  
  // Print queue
  print() {
    console.log(this.items.toString());
  }
  
  // Get all elements
  toArray() {
    return [...this.items];
  }
}

// Optimized Queue using pointers (to avoid O(n) shift)
class OptimizedQueue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }
  
  enqueue(element) {
    this.items[this.rear] = element;
    this.rear++;
  }
  
  dequeue() {
    if (this.isEmpty()) return undefined;
    
    const element = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return element;
  }
  
  front_element() {
    return this.items[this.front];
  }
  
  isEmpty() {
    return this.front === this.rear;
  }
  
  size() {
    return this.rear - this.front;
  }
  
  clear() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }
  
  print() {
    const result = [];
    for (let i = this.front; i < this.rear; i++) {
      result.push(this.items[i]);
    }
    console.log(result.toString());
  }
  
  toArray() {
    const result = [];
    for (let i = this.front; i < this.rear; i++) {
      result.push(this.items[i]);
    }
    return result;
  }
}

// Test cases
console.log("=== Queue Implementation (Array-based) ===");

const queue = new Queue();
console.log("Is empty:", queue.isEmpty());

console.log("\n=== Enqueue operations ===");
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.print();
console.log("Size:", queue.size());
console.log("Front:", queue.front());
console.log("Rear:", queue.rear());

console.log("\n=== Dequeue operations ===");
console.log("Dequeued:", queue.dequeue());
queue.print();
console.log("Dequeued:", queue.dequeue());
queue.print();

console.log("\n=== More operations ===");
console.log("Size:", queue.size());
console.log("Front:", queue.front());
console.log("Is empty:", queue.isEmpty());

console.log("\n=== Dequeue until empty ===");
while (!queue.isEmpty()) {
  console.log("Dequeue:", queue.dequeue());
}
console.log("Is empty:", queue.isEmpty());

console.log("\n=== FIFO demonstration ===");
const queue2 = new Queue();
[1, 2, 3, 4, 5].forEach(x => queue2.enqueue(x));
console.log("Enqueued:", [1, 2, 3, 4, 5]);
const result = [];
while (!queue2.isEmpty()) {
  result.push(queue2.dequeue());
}
console.log("Dequeued order (FIFO):", result);

console.log("\n=== Optimized Queue ===");
const optQueue = new OptimizedQueue();
[1, 2, 3, 4, 5].forEach(x => optQueue.enqueue(x));
console.log("Enqueued: [1, 2, 3, 4, 5]");
optQueue.print();
console.log("Dequeued:", optQueue.dequeue());
console.log("Dequeued:", optQueue.dequeue());
optQueue.print();
console.log("Size:", optQueue.size());

console.log("\nTime Complexity:");
console.log("  Enqueue: O(1)");
console.log("  Dequeue: O(n) for regular, O(1) for optimized");
console.log("Space Complexity: O(n)");
