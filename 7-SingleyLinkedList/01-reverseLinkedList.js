/**
 * Reverse a Singly Linked List
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  // Add element at the end
  insert(data) {
    const node = new Node(data);
    
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }
  
  // Display list
  display() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    console.log(result.join(' -> '));
  }
  
  // Get array representation
  toArray() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }
}

// Method 1: Iterative reversal
function reverseLinkedList_Iterative(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next;  // Store next node
    current.next = prev;        // Reverse the link
    prev = current;             // Move prev forward
    current = next;             // Move current forward
  }
  
  return prev;
}

// Method 2: Recursive reversal
function reverseLinkedList_Recursive(head) {
  // Base case: empty list or single node
  if (!head || !head.next) {
    return head;
  }
  
  // Reverse the rest of the list
  const newHead = reverseLinkedList_Recursive(head.next);
  
  // Put first element at the end
  head.next.next = head;
  head.next = null;
  
  return newHead;
}

// Method 3: With detailed steps
function reverseLinkedList_Detailed(head) {
  let prev = null;
  let current = head;
  let step = 0;
  
  console.log("Reversing linked list...\n");
  
  while (current) {
    step++;
    const next = current.next;
    
    console.log(`Step ${step}: Current = ${current.data}, Prev = ${prev ? prev.data : 'null'}`);
    current.next = prev;
    console.log(`  Reversed: ${current.data} -> ${prev ? prev.data : 'null'}`);
    
    prev = current;
    current = next;
  }
  
  console.log(`\nNew head: ${prev ? prev.data : 'null'}\n`);
  return prev;
}

// Method 4: Between two nodes
function reverseBetween(head, left, right) {
  if (!head || left === right) return head;
  
  let dummy = new Node(0);
  dummy.next = head;
  let prev = dummy;
  
  // Move to the node before left
  for (let i = 0; i < left - 1; i++) {
    prev = prev.next;
  }
  
  let current = prev.next;
  
  // Reverse the sublist
  for (let i = 0; i < right - left; i++) {
    const next = current.next;
    current.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  
  return dummy.next;
}

// Method 5: Alternative recursive with helper
function reverseHelper(head) {
  function reverse(node) {
    if (!node || !node.next) {
      return { newHead: node, tail: node };
    }
    
    const { newHead, tail } = reverse(node.next);
    tail.next = node;
    node.next = null;
    
    return { newHead, tail: node };
  }
  
  const result = reverse(head);
  return result.newHead;
}

// Test cases
console.log("=== Reverse Singly Linked List ===\n");

const list1 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list1.insert(x));
console.log("Original list:");
list1.display();

console.log("\nAfter iterative reversal:");
list1.head = reverseLinkedList_Iterative(list1.head);
list1.display();

console.log("\n=== Test 2 ===");
const list2 = new LinkedList();
[10, 20, 30, 40].forEach(x => list2.insert(x));
console.log("Original list:");
list2.display();

console.log("\nAfter recursive reversal:");
list2.head = reverseLinkedList_Recursive(list2.head);
list2.display();

console.log("\n=== Detailed Trace ===");
const list3 = new LinkedList();
[1, 2, 3, 4].forEach(x => list3.insert(x));
console.log("Original list:");
list3.display();
console.log();

list3.head = reverseLinkedList_Detailed(list3.head);
console.log("After reversal:");
list3.display();

console.log("\n=== Reverse Between Positions ===");
const list4 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list4.insert(x));
console.log("Original list:");
list4.display();

console.log("\nReverse between positions 2 and 4:");
list4.head = reverseBetween(list4.head, 2, 4);
list4.display();

console.log("\n=== Single Element ===");
const list5 = new LinkedList();
list5.insert(42);
console.log("Original:");
list5.display();

list5.head = reverseLinkedList_Iterative(list5.head);
console.log("After reversal:");
list5.display();

console.log("\n=== Empty List ===");
const list6 = new LinkedList();
console.log("Original:");
list6.display || console.log("null");

list6.head = reverseLinkedList_Iterative(list6.head);
console.log("After reversal:");
list6.display || console.log("null");

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1) iterative, O(n) recursive");
