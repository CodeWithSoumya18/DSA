/**
 * Implement a Deque using Doubly Linked List
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  // Add element at front
  addFirst(element) {
    const node = new Node(element);
    
    if (this.isEmpty()) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    
    this.size++;
  }
  
  // Add element at rear
  addLast(element) {
    const node = new Node(element);
    
    if (this.isEmpty()) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    
    this.size++;
  }
  
  // Remove element from front
  removeFirst() {
    if (this.isEmpty()) return undefined;
    
    const element = this.head.data;
    
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    
    this.size--;
    return element;
  }
  
  // Remove element from rear
  removeLast() {
    if (this.isEmpty()) return undefined;
    
    const element = this.tail.data;
    
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    
    this.size--;
    return element;
  }
  
  // Get element from front
  getFirst() {
    return this.isEmpty() ? undefined : this.head.data;
  }
  
  // Get element from rear
  getLast() {
    return this.isEmpty() ? undefined : this.tail.data;
  }
  
  // Check if empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Get size
  getSize() {
    return this.size;
  }
  
  // Print forward
  print() {
    if (this.isEmpty()) {
      console.log("Deque is empty");
      return;
    }
    
    let current = this.head;
    const elements = [];
    
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    
    console.log("Front -> [" + elements.join(", ") + "] <- Rear");
  }
  
  // Print backward
  printReverse() {
    if (this.isEmpty()) {
      console.log("Deque is empty");
      return;
    }
    
    let current = this.tail;
    const elements = [];
    
    while (current) {
      elements.push(current.data);
      current = current.prev;
    }
    
    console.log("Rear -> [" + elements.join(", ") + "] <- Front");
  }
  
  // Get all elements
  toArray() {
    const elements = [];
    let current = this.head;
    
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    
    return elements;
  }
  
  // Clear deque
  clear() {
    this.head = this.tail = null;
    this.size = 0;
  }
}

// Test cases
console.log("=== Deque Implementation (Doubly Linked List) ===");

const deque = new Deque();
console.log("Is empty:", deque.isEmpty());

console.log("\n=== Add operations ===");
deque.addLast(10);
deque.addLast(20);
deque.addFirst(5);
deque.addFirst(1);
deque.print();
deque.printReverse();
console.log("Size:", deque.getSize());

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
deque.printReverse();
console.log("Size:", deque.getSize());

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

console.log("\n=== Palindrome check using Deque ===");
function isPalindromeDeque(str) {
  const deque = new Deque();
  
  for (let char of str) {
    deque.addLast(char);
  }
  
  while (deque.getSize() > 1) {
    if (deque.removeFirst() !== deque.removeLast()) {
      return false;
    }
  }
  
  return true;
}

const testStrings = ["racecar", "hello", "madam", "abc"];
console.log("Testing palindromes:");
testStrings.forEach(str => {
  console.log(`"${str}": ${isPalindromeDeque(str)}`);
});

console.log("\nTime Complexity: O(1) for all operations");
console.log("Space Complexity: O(n)");
console.log("Advantage: True bidirectional access and modification");
