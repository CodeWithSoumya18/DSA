/**
 * Split Circular Linked List into Two Halves
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
}

// Split circular linked list
function splitCircularList(head) {
  if (!head) return { head1: null, head2: null };
  
  let slow = head;
  let fast = head;
  
  // Find middle
  while (fast.next !== head && fast.next.next !== head) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  let head1 = head;
  let head2 = slow.next;
  
  // Break the circle
  slow.next = head1;
  
  if (fast.next.next === head) {
    fast.next.next = head2;
  } else {
    fast.next = head2;
  }
  
  return { head1, head2 };
}

// Test cases
console.log("=== Split Circular Linked List ===\n");

const cll = new CircularLinkedList();
[1, 2, 3, 4, 5, 6].forEach(x => cll.insertAtEnd(x));

console.log("Original list:");
cll.display();

const { head1, head2 } = splitCircularList(cll.head);

console.log("\nFirst half:");
const cll1 = new CircularLinkedList();
cll1.head = head1;
cll1.display();

console.log("\nSecond half:");
const cll2 = new CircularLinkedList();
cll2.head = head2;
cll2.display();

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1)");
