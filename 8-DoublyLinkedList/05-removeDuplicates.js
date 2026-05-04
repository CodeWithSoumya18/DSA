/**
 * Remove Duplicates from Sorted Doubly Linked List
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
  
  display() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    console.log(result.length > 0 ? result.join(' <-> ') : 'null');
  }
}

// Remove duplicates
function removeDuplicates(head) {
  if (!head) return head;
  
  let current = head;
  
  while (current && current.next) {
    if (current.data === current.next.data) {
      const duplicate = current.next;
      
      current.next = duplicate.next;
      if (duplicate.next) {
        duplicate.next.prev = current;
      }
    } else {
      current = current.next;
    }
  }
  
  return head;
}

// Test cases
console.log("=== Remove Duplicates from Sorted Doubly Linked List ===\n");

const dll = new DoublyLinkedList();
[1, 1, 2, 2, 2, 3, 4, 4, 5].forEach(x => dll.insertAtEnd(x));

console.log("Original:");
dll.display();

console.log("\nAfter removing duplicates:");
removeDuplicates(dll.head);
dll.display();

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(1)");
