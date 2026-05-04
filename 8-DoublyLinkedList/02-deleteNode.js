/**
 * Doubly Linked List - Delete Node
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
  
  // Delete first node
  deleteFirst() {
    if (this.head === null) return null;
    
    const data = this.head.data;
    
    if (this.head.next) {
      this.head.next.prev = null;
    }
    
    this.head = this.head.next;
    return data;
  }
  
  // Delete last node
  deleteLast() {
    if (this.head === null) return null;
    
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    const data = current.data;
    
    if (current.prev) {
      current.prev.next = null;
    } else {
      this.head = null;
    }
    
    return data;
  }
  
  // Delete at position
  deleteAtPosition(pos) {
    if (this.head === null) return null;
    
    if (pos === 0) {
      return this.deleteFirst();
    }
    
    let current = this.head;
    let count = 0;
    
    while (current && count < pos) {
      current = current.next;
      count++;
    }
    
    if (!current) return null;
    
    const data = current.data;
    
    if (current.next) {
      current.next.prev = current.prev;
    }
    
    if (current.prev) {
      current.prev.next = current.next;
    }
    
    return data;
  }
  
  // Delete by value
  deleteByValue(value) {
    let current = this.head;
    
    while (current) {
      if (current.data === value) {
        if (current.next) {
          current.next.prev = current.prev;
        }
        
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        
        return value;
      }
      
      current = current.next;
    }
    
    return null;
  }
  
  displayForward() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    console.log("Forward: " + (result.length > 0 ? result.join(' <-> ') : 'null'));
  }
}

// Test cases
console.log("=== Doubly Linked List - Delete Node ===\n");

const dll = new DoublyLinkedList();
[1, 2, 3, 4, 5].forEach(x => dll.insertAtEnd(x));
console.log("Initial list:");
dll.displayForward();

console.log("\nDelete first:");
console.log("Deleted:", dll.deleteFirst());
dll.displayForward();

console.log("\nDelete last:");
console.log("Deleted:", dll.deleteLast());
dll.displayForward();

const dll2 = new DoublyLinkedList();
[10, 20, 30, 40, 50].forEach(x => dll2.insertAtEnd(x));
console.log("\n\nNew list:");
dll2.displayForward();

console.log("\nDelete at position 2:");
console.log("Deleted:", dll2.deleteAtPosition(2));
dll2.displayForward();

console.log("\nDelete by value 40:");
console.log("Deleted:", dll2.deleteByValue(40));
dll2.displayForward();

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1)");
