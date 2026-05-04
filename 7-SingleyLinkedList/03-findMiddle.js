/**
 * Find the Middle of a Linked List
 * Using Floyd's Algorithm (Slow and Fast pointers)
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
  
  display() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    console.log(result.join(' -> '));
  }
  
  getLength() {
    let current = this.head;
    let length = 0;
    
    while (current) {
      length++;
      current = current.next;
    }
    
    return length;
  }
}

// Method 1: Using slow and fast pointers
function findMiddle_TwoPointer(head) {
  if (!head) return null;
  
  let slow = head;
  let fast = head;
  
  // Move slow by 1, fast by 2 until fast reaches end
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
}

// Method 2: With detailed steps
function findMiddle_TwoPointer_Detailed(head) {
  if (!head) return null;
  
  let slow = head;
  let fast = head;
  let step = 0;
  
  console.log("Finding middle using two pointers:\n");
  
  while (fast && fast.next) {
    step++;
    slow = slow.next;
    fast = fast.next.next;
    
    console.log(`Step ${step}:`);
    console.log(`  Slow moved to: ${slow.data}`);
    console.log(`  Fast moved to: ${fast ? fast.data : 'null'}`);
  }
  
  console.log(`\nMiddle element: ${slow.data}\n`);
  return slow;
}

// Method 3: Get middle and previous node
function findMiddleWithPrev(head) {
  if (!head || !head.next) return { middle: head, prev: null };
  
  let slow = head;
  let fast = head;
  let prevSlow = null;
  
  while (fast && fast.next) {
    prevSlow = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return { middle: slow, prev: prevSlow };
}

// Method 4: Find both middles in even-length list
function findBothMiddles(head) {
  if (!head) return { first: null, second: null };
  
  let slow = head;
  let fast = head;
  let prevSlow = null;
  
  while (fast && fast.next) {
    prevSlow = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // For odd length, slow is middle
  // For even length, slow is first of two middle nodes
  return { first: slow, second: slow.next };
}

// Method 5: Using length calculation (alternative)
function findMiddle_ByLength(head) {
  if (!head) return null;
  
  // Calculate length
  let length = 0;
  let current = head;
  
  while (current) {
    length++;
    current = current.next;
  }
  
  // Find middle
  const mid = Math.floor(length / 2);
  current = head;
  
  for (let i = 0; i < mid; i++) {
    current = current.next;
  }
  
  return current;
}

// Method 6: Find kth node from middle
function findFromMiddle(head, k) {
  const middle = findMiddle_TwoPointer(head);
  
  if (!middle) return null;
  
  let current = middle;
  for (let i = 0; i < k && current; i++) {
    current = current.next;
  }
  
  return current;
}

// Test cases
console.log("=== Find Middle of Linked List ===\n");

// Test 1: Odd length
console.log("Test 1: Odd length list (5 elements)");
const list1 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list1.insert(x));
console.log("List: ");
list1.display();
const middle1 = findMiddle_TwoPointer(list1.head);
console.log(`Middle element: ${middle1.data}\n`);

// Test 2: Even length
console.log("Test 2: Even length list (6 elements)");
const list2 = new LinkedList();
[1, 2, 3, 4, 5, 6].forEach(x => list2.insert(x));
console.log("List: ");
list2.display();
const middle2 = findMiddle_TwoPointer(list2.head);
console.log(`Middle element (first of two): ${middle2.data}\n`);

// Test 3: Single element
console.log("Test 3: Single element");
const list3 = new LinkedList();
list3.insert(42);
console.log("List: ");
list3.display();
const middle3 = findMiddle_TwoPointer(list3.head);
console.log(`Middle element: ${middle3.data}\n`);

// Test 4: Two elements
console.log("Test 4: Two elements");
const list4 = new LinkedList();
[1, 2].forEach(x => list4.insert(x));
console.log("List: ");
list4.display();
const middle4 = findMiddle_TwoPointer(list4.head);
console.log(`Middle element: ${middle4.data}\n`);

// Test 5: Detailed trace
console.log("Test 5: Detailed Trace");
const list5 = new LinkedList();
[10, 20, 30, 40, 50, 60, 70].forEach(x => list5.insert(x));
console.log("List: ");
list5.display();
findMiddle_TwoPointer_Detailed(list5.head);

// Test 6: Both middles
console.log("Test 6: Both middles for even length");
const list6 = new LinkedList();
[1, 2, 3, 4, 5, 6, 7, 8].forEach(x => list6.insert(x));
console.log("List: ");
list6.display();
const bothMiddles = findBothMiddles(list6.head);
console.log(`First middle: ${bothMiddles.first.data}`);
console.log(`Second middle: ${bothMiddles.second ? bothMiddles.second.data : 'null'}\n`);

// Test 7: Using length method
console.log("Test 7: Finding middle by length method");
const list7 = new LinkedList();
[1, 2, 3, 4, 5, 6, 7].forEach(x => list7.insert(x));
console.log("List: ");
list7.display();
console.log("Length:", list7.getLength());
const middle7 = findMiddle_ByLength(list7.head);
console.log(`Middle element: ${middle7.data}\n`);

// Test 8: Middle with previous node
console.log("Test 8: Finding middle with previous node");
const list8 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list8.insert(x));
console.log("List: ");
list8.display();
const result = findMiddleWithPrev(list8.head);
console.log(`Middle: ${result.middle.data}`);
console.log(`Previous: ${result.prev ? result.prev.data : 'null'}\n`);

console.log("Time Complexity: O(n) for both methods");
console.log("Space Complexity:");
console.log("  Two-pointer: O(1)");
console.log("  Length method: O(1)");
