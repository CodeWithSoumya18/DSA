/**
 * Doubly Linked List - Insert at Beginning
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
  }
  
  // Insert at beginning
  insertAtBeginning(data) {
    const node = new Node(data);
    
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }
  
  // Insert at end
  insertAtEnd(data) {
    const node = new Node(data);
    
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      node.prev = current;
    }
  }
  
  // Insert at position
  insertAtPosition(data, pos) {
    if (pos === 0) {
      this.insertAtBeginning(data);
      return;
    }
    
    const node = new Node(data);
    let current = this.head;
    let count = 0;
    
    while (current && count < pos - 1) {
      current = current.next;
      count++;
    }
    
    if (!current) return;
    
    node.next = current.next;
    node.prev = current;
    
    if (current.next) {
      current.next.prev = node;
    }
    
    current.next = node;
  }
  
  // Display forward
  displayForward() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    console.log("Forward: " + (result.length > 0 ? result.join(' <-> ') : 'null'));
  }
  
  // Display backward
  displayBackward() {
    if (!this.head) {
      console.log("Backward: null");
      return;
    }
    
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    let result = [];
    while (current) {
      result.push(current.data);
      current = current.prev;
    }
    
    console.log("Backward: " + result.join(' <-> '));
  }
}

// Test cases
console.log("=== Doubly Linked List - Insert at Beginning ===\n");

const dll = new DoublyLinkedList();
console.log("Initial list:");
dll.displayForward();

console.log("\nInsert at beginning:");
dll.insertAtBeginning(5);
dll.displayForward();
dll.displayBackward();

console.log("\nInsert 3 at beginning:");
dll.insertAtBeginning(3);
dll.displayForward();
dll.displayBackward();

console.log("\nInsert 1 at beginning:");
dll.insertAtBeginning(1);
dll.displayForward();
dll.displayBackward();

console.log("\nInsert at end:");
dll.insertAtEnd(7);
dll.displayForward();
dll.displayBackward();

console.log("\nInsert at position 2:");
dll.insertAtPosition(4, 2);
dll.displayForward();
dll.displayBackward();

console.log("\nTime Complexity:");
console.log("  Insert at Beginning: O(1)");
console.log("  Insert at End: O(n)");
console.log("  Insert at Position: O(n)");
console.log("Space Complexity: O(1)");
