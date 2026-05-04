/**
 * Traverse Circular Linked List
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
  
  // Display entire list
  display() {
    if (!this.head) {
      console.log("null");
      return;
    }
    
    const result = [];
    let current = this.head;
    
    do {
      result.push(current.data);
      current = current.next;
    } while (current !== this.head);
    
    console.log(result.join(" -> ") + " (circular)");
  }
  
  // Get elements as array
  toArray(limit = 20) {
    if (!this.head) return [];
    
    const result = [];
    let current = this.head;
    let count = 0;
    
    do {
      result.push(current.data);
      current = current.next;
      count++;
    } while (current !== this.head && count < limit);
    
    return result;
  }
  
  // Count elements
  count() {
    if (!this.head) return 0;
    
    let count = 1;
    let current = this.head.next;
    
    while (current !== this.head) {
      count++;
      current = current.next;
    }
    
    return count;
  }
  
  // Find element
  find(value) {
    if (!this.head) return false;
    
    let current = this.head;
    
    do {
      if (current.data === value) return true;
      current = current.next;
    } while (current !== this.head);
    
    return false;
  }
  
  // Traverse and apply function
  traverse(callback) {
    if (!this.head) return;
    
    let current = this.head;
    
    do {
      callback(current.data);
      current = current.next;
    } while (current !== this.head);
  }
}

// Test cases
console.log("=== Traverse Circular Linked List ===\n");

const cll = new CircularLinkedList();
[10, 20, 30, 40, 50].forEach(x => cll.insertAtEnd(x));

console.log("Display:");
cll.display();

console.log("\nAs Array:", cll.toArray());

console.log("\nCount:", cll.count());

console.log("\nFind 30:", cll.find(30));
console.log("Find 99:", cll.find(99));

console.log("\nTraverse and print each:");
let count = 0;
cll.traverse(data => {
  process.stdout.write("Element " + (++count) + ": " + data + "\n");
});

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1)");
