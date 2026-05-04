/**
 * Merge Two Sorted Linked Lists
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
}

// Method 1: Using new nodes (extra space)
function mergeSortedLists(list1, list2) {
  let dummy = new Node(0);
  let current = dummy;
  
  let p1 = list1;
  let p2 = list2;
  
  while (p1 && p2) {
    if (p1.data <= p2.data) {
      current.next = p1;
      p1 = p1.next;
    } else {
      current.next = p2;
      p2 = p2.next;
    }
    current = current.next;
  }
  
  // Attach remaining nodes
  current.next = p1 ? p1 : p2;
  
  return dummy.next;
}

// Method 2: In-place merging
function mergeSortedLists_InPlace(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;
  
  let head;
  
  if (list1.data <= list2.data) {
    head = list1;
    head.next = mergeSortedLists_InPlace(list1.next, list2);
  } else {
    head = list2;
    head.next = mergeSortedLists_InPlace(list1, list2.next);
  }
  
  return head;
}

// Method 3: Iterative in-place
function mergeSortedLists_IterativeInPlace(list1, list2) {
  let dummy = new Node(0);
  let current = dummy;
  
  while (list1 && list2) {
    if (list1.data <= list2.data) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  current.next = list1 || list2;
  
  return dummy.next;
}

// Method 4: With detailed steps
function mergeSortedLists_Detailed(list1, list2) {
  let dummy = new Node(0);
  let current = dummy;
  let step = 0;
  
  console.log("Merging two sorted lists...\n");
  
  while (list1 && list2) {
    step++;
    console.log(`Step ${step}:`);
    console.log(`  list1=${list1.data}, list2=${list2.data}`);
    
    if (list1.data <= list2.data) {
      console.log(`  ${list1.data} <= ${list2.data}, add ${list1.data}`);
      current.next = list1;
      list1 = list1.next;
    } else {
      console.log(`  ${list1.data} > ${list2.data}, add ${list2.data}`);
      current.next = list2;
      list2 = list2.next;
    }
    
    current = current.next;
    console.log(`  Current merged list: ${getListString(dummy.next)}\n`);
  }
  
  console.log("Attaching remaining nodes...");
  current.next = list1 ? list1 : list2;
  console.log(`Final list: ${getListString(dummy.next)}\n`);
  
  return dummy.next;
}

function getListString(head) {
  let result = [];
  let current = head;
  
  while (current) {
    result.push(current.data);
    current = current.next;
  }
  
  return result.join(' -> ');
}

// Method 5: Merge multiple sorted lists
function mergeKSortedLists(lists) {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];
  
  while (lists.length > 1) {
    const newLists = [];
    
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      
      newLists.push(mergeSortedLists_InPlace(l1, l2));
    }
    
    lists = newLists;
  }
  
  return lists[0];
}

// Test cases
console.log("=== Merge Two Sorted Linked Lists ===\n");

// Test 1: Both non-empty
console.log("Test 1: Merge two non-empty lists");
const list1 = new LinkedList();
[1, 3, 5].forEach(x => list1.insert(x));
const list2 = new LinkedList();
[2, 4, 6].forEach(x => list2.insert(x));

console.log("List 1: ");
list1.display();
console.log("List 2: ");
list2.display();

const merged1 = mergeSortedLists(list1.head, list2.head);
console.log("Merged: ");
let temp = merged1;
const result1 = [];
while (temp) {
  result1.push(temp.data);
  temp = temp.next;
}
console.log(result1.join(' -> '));

// Test 2: Different lengths
console.log("\n\nTest 2: Lists with different lengths");
const list3 = new LinkedList();
[1, 2, 3, 4, 5].forEach(x => list3.insert(x));
const list4 = new LinkedList();
[1, 3].forEach(x => list4.insert(x));

console.log("List 1: ");
list3.display();
console.log("List 2: ");
list4.display();

const merged2 = mergeSortedLists_InPlace(list3.head, list4.head);
console.log("Merged: ");
temp = merged2;
const result2 = [];
while (temp) {
  result2.push(temp.data);
  temp = temp.next;
}
console.log(result2.join(' -> '));

// Test 3: One empty
console.log("\n\nTest 3: One empty list");
const list5 = new LinkedList();
[1, 2, 3].forEach(x => list5.insert(x));
const list6 = new LinkedList();

console.log("List 1: ");
list5.display();
console.log("List 2: ");
if (list6.head) {
  list6.display();
} else {
  console.log("null");
}

const merged3 = mergeSortedLists(list5.head, list6.head);
console.log("Merged: ");
temp = merged3;
const result3 = [];
while (temp) {
  result3.push(temp.data);
  temp = temp.next;
}
console.log(result3.join(' -> '));

// Test 4: With duplicates
console.log("\n\nTest 4: Lists with duplicates");
const list7 = new LinkedList();
[1, 2, 2, 4].forEach(x => list7.insert(x));
const list8 = new LinkedList();
[1, 3, 3, 4].forEach(x => list8.insert(x));

console.log("List 1: ");
list7.display();
console.log("List 2: ");
list8.display();

const merged4 = mergeSortedLists(list7.head, list8.head);
console.log("Merged: ");
temp = merged4;
const result4 = [];
while (temp) {
  result4.push(temp.data);
  temp = temp.next;
}
console.log(result4.join(' -> '));

// Test 5: Detailed trace
console.log("\n\nTest 5: Detailed Trace");
const list9 = new LinkedList();
[1, 3, 5].forEach(x => list9.insert(x));
const list10 = new LinkedList();
[2, 4, 6].forEach(x => list10.insert(x));

console.log("List 1: ");
list9.display();
console.log("List 2: ");
list10.display();
console.log();

mergeSortedLists_Detailed(list9.head, list10.head);

console.log("Time Complexity: O(n + m)");
console.log("Space Complexity: O(1) in-place, O(n+m) with new nodes");
