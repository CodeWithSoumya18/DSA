/**
 * Remove the nth Node From the End
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

// Method 1: Two pass approach
function removeNthFromEnd_TwoPass(head, n) {
  let dummy = new Node(0);
  dummy.next = head;
  let length = 0;
  let first = head;
  
  // Calculate length
  while (first) {
    length++;
    first = first.next;
  }
  
  // Find node before the one to remove
  length -= n;
  first = dummy;
  
  while (length > 0) {
    first = first.next;
    length--;
  }
  
  first.next = first.next.next;
  return dummy.next;
}

// Method 2: Two pointer approach (one pass)
function removeNthFromEnd_OnePass(head, n) {
  let dummy = new Node(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;
  
  // Move first pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    if (!first) return head; // n is greater than list length
    first = first.next;
  }
  
  // Move both pointers until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }
  
  // Remove node
  second.next = second.next.next;
  return dummy.next;
}

// Method 3: With detailed steps
function removeNthFromEnd_Detailed(head, n) {
  let dummy = new Node(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;
  
  console.log(`Removing ${n}th node from end\n`);
  
  // Move first pointer
  console.log(`Step 1: Move first pointer ${n + 1} steps ahead`);
  for (let i = 0; i <= n; i++) {
    if (!first) {
      console.log("  Error: n is greater than list length");
      return head;
    }
    first = first.next;
    console.log(`  Step ${i + 1}: first moved to ${first ? first.data : 'null'}`);
  }
  
  console.log(`\nStep 2: Move both pointers until first reaches end`);
  let moveCount = 0;
  while (first) {
    moveCount++;
    first = first.next;
    second = second.next;
    console.log(`  Move ${moveCount}: second at ${second.data}, first at ${first ? first.data : 'null'}`);
  }
  
  console.log(`\nStep 3: Remove node`);
  console.log(`  Node before removal: ${second.data}`);
  console.log(`  Node to remove: ${second.next ? second.next.data : 'null'}`);
  second.next = second.next.next;
  console.log(`  Node after removal: ${second.next ? second.next.data : 'null'}\n`);
  
  return dummy.next;
}

// Method 4: Stack-based approach
function removeNthFromEnd_Stack(head, n) {
  const stack = [];
  let current = head;
  
  // Push all nodes on stack
  while (current) {
    stack.push(current);
    current = current.next;
  }
  
  // Pop n times
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  
  if (stack.length === 0) {
    return head.next;
  }
  
  const node = stack[stack.length - 1];
  node.next = node.next.next;
  return head;
}

// Test cases
console.log("=== Remove nth Node From End ===\n");

// Test 1: Remove from middle
console.log("Test 1: Remove 2nd from end");
const list1 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list1.insert(x));
console.log("Original: ");
list1.display();
list1.head = removeNthFromEnd_OnePass(list1.head, 2);
console.log("After removing 2nd from end: ");
list1.display();

// Test 2: Remove from beginning (end is same)
console.log("\nTest 2: Remove 1st from end (head)");
const list2 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list2.insert(x));
console.log("Original: ");
list2.display();
list2.head = removeNthFromEnd_OnePass(list2.head, 5);
console.log("After removing 1st from end (head): ");
list2.display();

// Test 3: Remove from end
console.log("\nTest 3: Remove from end");
const list3 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list3.insert(x));
console.log("Original: ");
list3.display();
list3.head = removeNthFromEnd_OnePass(list3.head, 1);
console.log("After removing from end: ");
list3.display();

// Test 4: Single node - remove it
console.log("\nTest 4: Remove single node");
const list4 = new LinkedList();
list4.insert(1);
console.log("Original: ");
list4.display();
list4.head = removeNthFromEnd_OnePass(list4.head, 1);
console.log("After removal: ");
if (list4.head) {
  list4.display();
} else {
  console.log("null");
}

// Test 5: Two nodes
console.log("\nTest 5: Remove from two nodes");
const list5 = new LinkedList();
[1, 2].forEach(x => list5.insert(x));
console.log("Original: ");
list5.display();
list5.head = removeNthFromEnd_OnePass(list5.head, 2);
console.log("After removing 2nd from end: ");
list5.display();

// Test 6: Detailed trace
console.log("Test 6: Detailed Trace");
const list6 = new LinkedList();
[1, 2, 3, 4, 5, 6].forEach(x => list6.insert(x));
console.log("Original: ");
list6.display();
console.log();
list6.head = removeNthFromEnd_Detailed(list6.head, 3);
console.log("After removal: ");
list6.display();

// Test 7: Using two-pass method
console.log("\nTest 7: Using two-pass method");
const list7 = new LinkedList();
[10, 20, 30, 40, 50].forEach(x => list7.insert(x));
console.log("Original: ");
list7.display();
list7.head = removeNthFromEnd_TwoPass(list7.head, 2);
console.log("After removing 2nd from end: ");
list7.display();

// Test 8: Using stack method
console.log("\nTest 8: Using stack method");
const list8 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list8.insert(x));
console.log("Original: ");
list8.display();
list8.head = removeNthFromEnd_Stack(list8.head, 2);
console.log("After removing 2nd from end: ");
list8.display();

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity:");
console.log("  One-pass/Two-pass: O(1)");
console.log("  Stack: O(n)");
