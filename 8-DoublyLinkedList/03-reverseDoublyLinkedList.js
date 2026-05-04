/**
 * Reverse a Doubly Linked List
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
  
  // Reverse the list
  reverse() {
    let current = this.head;
    let temp = null;
    
    while (current) {
      // Swap pointers
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      
      // Move to next node
      current = current.prev;
    }
    
    // Update head
    if (temp) {
      this.head = temp.prev;
    }
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
console.log("=== Reverse Doubly Linked List ===\n");

const dll = new DoublyLinkedList();
[1, 2, 3, 4, 5].forEach(x => dll.insertAtEnd(x));
console.log("Original:");
dll.displayForward();
dll.displayBackward();

console.log("\nAfter reverse:");
dll.reverse();
dll.displayForward();
dll.displayBackward();

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1)");
