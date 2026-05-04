/**
 * Find All Pairs with Given Sum in Sorted Doubly Linked List
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
}

// Find pairs with given sum
function findPairsWithSum(head, targetSum) {
  const pairs = [];
  
  let left = head;
  let right = head;
  
  // Move right to end
  while (right.next) {
    right = right.next;
  }
  
  // Two pointer approach
  while (left && right && left !== right && left.prev !== right) {
    const sum = left.data + right.data;
    
    if (sum === targetSum) {
      pairs.push([left.data, right.data]);
      left = left.next;
      right = right.prev;
    } else if (sum < targetSum) {
      left = left.next;
    } else {
      right = right.prev;
    }
  }
  
  return pairs;
}

// Test cases
console.log("=== Find Pairs with Given Sum ===\n");

const dll = new DoublyLinkedList();
[1, 2, 3, 4, 5, 6, 7, 8].forEach(x => dll.insertAtEnd(x));

console.log("List: 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> 6 <-> 7 <-> 8");
console.log("Find pairs with sum 9:");
const pairs = findPairsWithSum(dll.head, 9);
pairs.forEach(pair => console.log(`  ${pair[0]} + ${pair[1]} = 9`));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1) excluding output");
