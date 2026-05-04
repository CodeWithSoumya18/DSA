/**
 * Binary Tree - Level Order Traversal
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Level order traversal (BFS)
function levelOrderTraversal(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.data);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}

// Reverse level order
function reverseLevelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  const stack = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    stack.push(node.data);
    
    if (node.right) queue.push(node.right);
    if (node.left) queue.push(node.left);
  }
  
  while (stack.length > 0) {
    result.push(stack.pop());
  }
  
  return result;
}

// Zigzag traversal
function zigzagTraversal(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  let leftToRight = true;
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.data);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    if (!leftToRight) {
      currentLevel.reverse();
    }
    
    result.push(currentLevel);
    leftToRight = !leftToRight;
  }
  
  return result;
}

// Test cases
console.log("=== Binary Tree Level Order Traversal ===\n");

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);
root.left.left.left = new Node(8);

console.log("Tree:");
console.log("       1");
console.log("      / \\");
console.log("     2   3");
console.log("    / \\ / \\");
console.log("   4 5 6  7");
console.log("  /");
console.log(" 8\n");

console.log("Level Order:");
console.log(JSON.stringify(levelOrderTraversal(root)));

console.log("\nReverse Level Order:");
console.log(JSON.stringify(reverseLevelOrder(root)));

console.log("\nZigzag Traversal:");
console.log(JSON.stringify(zigzagTraversal(root)));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(w) where w is max width");
