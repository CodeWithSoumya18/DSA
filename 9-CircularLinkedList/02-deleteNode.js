/**
 * Circular Linked List - Delete Node
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
  
  // Delete first node
  deleteFirst() {
    if (this.head === null) return null;
    
    const data = this.head.data;
    
    if (this.head.next === this.head) {
      this.head = null;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      
      current.next = this.head.next;
      this.head = this.head.next;
    }
    
    return data;
  }
  
  // Delete last node
  deleteLast() {
    if (this.head === null) return null;
    
    if (this.head.next === this.head) {
      const data = this.head.data;
      this.head = null;
      return data;
    }
    
    let current = this.head;
    while (current.next.next !== this.head) {
      current = current.next;
    }
    
    const data = current.next.data;
    current.next = this.head;
    
    return data;
  }
  
  // Delete by value
  deleteByValue(value) {
    if (this.head === null) return null;
    
    if (this.head.data === value) {
      return this.deleteFirst();
    }
    
    let current = this.head;
    
    while (current.next !== this.head) {
      if (current.next.data === value) {
        current.next = current.next.next;
        return value;
      }
      current = current.next;
    }
    
    return null;
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
    
    result.push("(circular)");
    console.log(result.join(" -> "));
  }
}

// Test cases
console.log("=== Circular Linked List - Delete Node ===\n");

const cll = new CircularLinkedList();
[1, 2, 3, 4, 5].forEach(x => cll.insertAtEnd(x));

console.log("Original list:");
cll.display();

console.log("\nDelete first:");
console.log("Deleted:", cll.deleteFirst());
cll.display();

console.log("\nDelete last:");
console.log("Deleted:", cll.deleteLast());
cll.display();

console.log("\nDelete by value 3:");
console.log("Deleted:", cll.deleteByValue(3));
cll.display();

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1)");
