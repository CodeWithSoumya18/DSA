/**
 * Detect if Linked List is Circular
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
}

// Method 1: Using Floyd's algorithm
function isCircular_Floyd(head) {
  if (!head) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) return true;
  }
  
  return false;
}

// Method 2: Using Set
function isCircular_Set(head) {
  if (!head) return false;
  
  const visited = new Set();
  let current = head;
  
  while (current) {
    if (visited.has(current)) {
      return true;
    }
    visited.add(current);
    current = current.next;
  }
  
  return false;
}

// Test cases
console.log("=== Detect Circular Linked List ===\n");

// Circular list
const cll1 = new CircularLinkedList();
[1, 2, 3, 4, 5].forEach(x => cll1.insertAtEnd(x));

console.log("Circular list detection:");
console.log("Floyd's:", isCircular_Floyd(cll1.head));
console.log("Set:", isCircular_Set(cll1.head));

// Non-circular list
console.log("\nNon-circular list (singly linked):");
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
node1.next = node2;
node2.next = node3;

console.log("Floyd's:", isCircular_Floyd(node1));
console.log("Set:", isCircular_Set(node1));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity:");
console.log("  Floyd's: O(1)");
console.log("  Set: O(n)");
