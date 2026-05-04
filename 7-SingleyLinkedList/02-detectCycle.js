/**
 * Detect a Cycle in a Linked List
 * Using Floyd's Cycle Detection Algorithm (Tortoise and Hare)
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
  
  // Create cycle for testing
  createCycle(pos) {
    if (pos < 0) return;
    
    let current = this.head;
    let cycleNode = null;
    let count = 0;
    
    while (current.next) {
      if (count === pos) {
        cycleNode = current;
      }
      current = current.next;
      count++;
    }
    
    if (cycleNode) {
      current.next = cycleNode;
    }
  }
  
  display() {
    let current = this.head;
    let count = 0;
    let result = [];
    const max = 10;
    
    while (current && count < max) {
      result.push(current.data);
      current = current.next;
      count++;
    }
    
    if (count === max && current) {
      result.push("...(cycle)");
    }
    
    console.log(result.join(' -> '));
  }
}

// Method 1: Floyd's Cycle Detection (Tortoise and Hare)
function hasCycle_Floyd(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      return true; // Cycle detected
    }
  }
  
  return false;
}

// Method 2: With cycle details
function hasCycle_Floyd_Detailed(head) {
  if (!head || !head.next) return { hasCycle: false };
  
  let slow = head;
  let fast = head;
  let slowSteps = 0;
  let fastSteps = 0;
  
  while (fast && fast.next) {
    slow = slow.next;
    slowSteps++;
    fast = fast.next.next;
    fastSteps++;
    
    console.log(`Step${slowSteps}: Slow=${slow.data}, Fast=${fast ? fast.data : 'null'}`);
    
    if (slow === fast) {
      return {
        hasCycle: true,
        meetingPoint: slow.data,
        slowSteps,
        fastSteps: slowSteps * 2
      };
    }
  }
  
  return { hasCycle: false };
}

// Method 3: Find cycle start node
function findCycleStart(head) {
  if (!head || !head.next) return null;
  
  let slow = head;
  let fast = head;
  
  // First: detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      // Cycle detected
      // Second: find start of cycle
      let ptr1 = head;
      let ptr2 = slow;
      
      while (ptr1 !== ptr2) {
        ptr1 = ptr1.next;
        ptr2 = ptr2.next;
      }
      
      return ptr1; // Start of cycle
    }
  }
  
  return null; // No cycle
}

// Method 4: Using Set (alternative)
function hasCycle_Set(head) {
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

// Method 5: Using Map with position
function detectCycle_Map(head) {
  const nodeMap = new Map();
  let current = head;
  let position = 0;
  
  while (current) {
    if (nodeMap.has(current)) {
      return {
        hasCycle: true,
        cycleStart: nodeMap.get(current),
        cycleEnd: position
      };
    }
    
    nodeMap.set(current, position);
    current = current.next;
    position++;
  }
  
  return { hasCycle: false };
}

// Method 6: Calculate cycle length
function getCycleLength(head) {
  if (!head || !head.next) return 0;
  
  let slow = head;
  let fast = head;
  
  // Find meeting point
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      // Count cycle length
      let count = 1;
      let current = slow.next;
      
      while (current !== slow) {
        count++;
        current = current.next;
      }
      
      return count;
    }
  }
  
  return 0;
}

// Test cases
console.log("=== Detect Cycle in Linked List ===\n");

// Test 1: No cycle
console.log("Test 1: List without cycle");
const list1 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list1.insert(x));
console.log("List:", list1.display() || "1 -> 2 -> 3 -> 4 -> 5");
console.log("Has cycle (Floyd):", hasCycle_Floyd(list1.head));
console.log("Has cycle (Set):", hasCycle_Set(list1.head));

// Test 2: Cycle at end
console.log("\n=== Test 2: Cycle created ===");
const list2 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list2.insert(x));
console.log("Creating cycle...");
list2.createCycle(2);
console.log("Display (first 10 nodes):");
list2.display();
console.log("Has cycle (Floyd):", hasCycle_Floyd(list2.head));
console.log("Has cycle (Set):", hasCycle_Set(list2.head));

// Test 3: Find cycle start
console.log("\n=== Test 3: Find Cycle Start ===");
const list3 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list3.insert(x));
list3.createCycle(1);
const cycleStart = findCycleStart(list3.head);
console.log("Cycle starts at node with data:", cycleStart ? cycleStart.data : "No cycle");

// Test 4: Cycle length
console.log("\n=== Test 4: Cycle Length ===");
const list4 = new LinkedList();
[1, 2, 3, 4, 5, 6].forEach(x => list4.insert(x));
list4.createCycle(2);
console.log("Cycle length:", getCycleLength(list4.head));

// Test 5: Detailed trace
console.log("\n=== Detailed Trace ===");
const list5 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list5.insert(x));
list5.createCycle(1);
console.log("Tracing cycle detection:");
hasCycle_Floyd_Detailed(list5.head);

// Test 6: Map detection
console.log("\n=== Using Map ===");
const list6 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list6.insert(x));
list6.createCycle(2);
const result = detectCycle_Map(list6.head);
console.log("Cycle detection result:", result);

console.log("\nTime Complexity: O(n) for all methods");
console.log("Space Complexity:");
console.log("  Floyd's Algorithm: O(1)");
console.log("  Set/Map: O(n)");
