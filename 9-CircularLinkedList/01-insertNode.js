/**
 * Circular Linked List - Insert Node
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
  }
  
  // Insert at beginning
  insertAtBeginning(data) {
    const node = new Node(data);
    
    if (this.head === null) {
      node.next = node;
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      
      node.next = this.head;
      current.next = node;
      this.head = node;
    }
  }
  
  // Insert at end
  insertAtEnd(data) {
    const node = new Node(data);
    
    if (this.head === null) {
      node.next = node;
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      
      current.next = node;
      node.next = this.head;
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
    
    while (current.next !== this.head && count < pos - 1) {
      current = current.next;
      count++;
    }
    
    node.next = current.next;
    current.next = node;
  }
  
  display() {
    if (this.head === null) {
      console.log("null");
      return;
    }
    
    let result = [];
    let current = this.head;
    
    do {
      result.push(current.data);
      current = current.next;
    } while (current !== this.head);
    
    result.push("(back to " + this.head.data + ")");
    console.log(result.join(" -> "));
  }
}

// Test cases
console.log("=== Circular Linked List - Insert Node ===\n");

const cll = new CircularLinkedList();

console.log("Empty list:");
cll.display();

console.log("\nInsert 5 at beginning:");
cll.insertAtBeginning(5);
cll.display();

console.log("\nInsert 3 at beginning:");
cll.insertAtBeginning(3);
cll.display();

console.log("\nInsert 7 at end:");
cll.insertAtEnd(7);
cll.display();

console.log("\nInsert 1 at position 0:");
cll.insertAtPosition(1, 0);
cll.display();

console.log("\nInsert 4 at position 2:");
cll.insertAtPosition(4, 2);
cll.display();

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1)");
