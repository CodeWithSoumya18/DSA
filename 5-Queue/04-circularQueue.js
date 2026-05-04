/**
 * Implement a Circular Queue
 */

class CircularQueue {
  constructor(size) {
    this.size = size;
    this.queue = new Array(size);
    this.front = -1;
    this.rear = -1;
  }
  
  // Check if queue is empty
  isEmpty() {
    return this.front === -1;
  }
  
  // Check if queue is full
  isFull() {
    return (this.rear + 1) % this.size === this.front;
  }
  
  // Enqueue element
  enqueue(element) {
    if (this.isFull()) {
      console.log("Queue is full");
      return false;
    }
    
    if (this.front === -1) {
      this.front = 0;
    }
    
    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = element;
    return true;
  }
  
  // Dequeue element
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return undefined;
    }
    
    const element = this.queue[this.front];
    
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.size;
    }
    
    return element;
  }
  
  // Get front element
  front() {
    if (this.isEmpty()) return undefined;
    return this.queue[this.front];
  }
  
  // Get rear element
  rear() {
    if (this.isEmpty()) return undefined;
    return this.queue[this.rear];
  }
  
  // Get number of elements
  getSize() {
    if (this.isEmpty()) return 0;
    
    if (this.rear >= this.front) {
      return this.rear - this.front + 1;
    } else {
      return this.size - this.front + this.rear + 1;
    }
  }
  
  // Display queue
  display() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return;
    }
    
    const elements = [];
    let i = this.front;
    let count = this.getSize();
    
    while (count > 0) {
      elements.push(this.queue[i]);
      i = (i + 1) % this.size;
      count--;
    }
    
    console.log("Queue: [" + elements.join(", ") + "]");
  }
  
  // Get all elements as array
  toArray() {
    if (this.isEmpty()) return [];
    
    const elements = [];
    let i = this.front;
    let count = this.getSize();
    
    while (count > 0) {
      elements.push(this.queue[i]);
      i = (i + 1) % this.size;
      count--;
    }
    
    return elements;
  }
}

// Circular Queue using objects (no size limit)
class DynamicCircularQueue {
  constructor() {
    this.items = {};
    this.front = -1;
    this.rear = -1;
    this.size = 0;
  }
  
  enqueue(element) {
    if (this.front === -1) {
      this.front = 0;
    }
    
    this.rear = (this.rear + 1);
    this.items[this.rear] = element;
    this.size++;
  }
  
  dequeue() {
    if (this.isEmpty()) return undefined;
    
    const element = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    this.size--;
    
    if (this.size === 0) {
      this.front = -1;
      this.rear = -1;
    }
    
    return element;
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  getSize() {
    return this.size;
  }
  
  front_element() {
    return this.items[this.front];
  }
  
  display() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return;
    }
    
    const elements = [];
    for (let i = this.front; i <= this.rear; i++) {
      elements.push(this.items[i]);
    }
    
    console.log("Queue: [" + elements.join(", ") + "]");
  }
}

// Test cases
console.log("=== Circular Queue Implementation ===");

const cq = new CircularQueue(5);
console.log("Queue size: 5");
console.log("Is empty:", cq.isEmpty());
console.log("Is full:", cq.isFull());

console.log("\n=== Enqueue operations ===");
console.log("Enqueue 10:", cq.enqueue(10));
console.log("Enqueue 20:", cq.enqueue(20));
console.log("Enqueue 30:", cq.enqueue(30));
console.log("Enqueue 40:", cq.enqueue(40));
cq.display();
console.log("Size:", cq.getSize());
console.log("Front:", cq.front());
console.log("Rear:", cq.rear());

console.log("\n=== Dequeue operations ===");
console.log("Dequeue:", cq.dequeue());
console.log("Dequeue:", cq.dequeue());
cq.display();
console.log("Size:", cq.getSize());

console.log("\n=== Circular behavior ===");
console.log("Enqueue 50:", cq.enqueue(50));
console.log("Enqueue 60:", cq.enqueue(60));
cq.display();
console.log("Size:", cq.getSize());
console.log("Is full:", cq.isFull());

console.log("\n=== Try to enqueue when full ===");
console.log("Enqueue 70:", cq.enqueue(70));

console.log("\n=== Dequeue and re-enqueue ===");
console.log("Dequeue:", cq.dequeue());
console.log("Enqueue 70:", cq.enqueue(70));
cq.display();

console.log("\n=== Dequeue until empty ===");
while (!cq.isEmpty()) {
  console.log("Dequeue:", cq.dequeue());
}
console.log("Is empty:", cq.isEmpty());

console.log("\n=== Dynamic Circular Queue ===");
const dcq = new DynamicCircularQueue();
[10, 20, 30, 40, 50].forEach(x => dcq.enqueue(x));
console.log("Enqueued: [10, 20, 30, 40, 50]");
dcq.display();

console.log("\nDequeue:", dcq.dequeue());
console.log("Dequeue:", dcq.dequeue());
dcq.display();

console.log("\nEnqueue 60 and 70:");
dcq.enqueue(60);
dcq.enqueue(70);
dcq.display();

console.log("\nTime Complexity: O(1) for all operations");
console.log("Space Complexity: O(n)");
