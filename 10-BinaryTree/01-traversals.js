/**
 * Binary Tree - Inorder Traversal (Recursive and Iterative)
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  // Insert using level order
  insert(data) {
    const node = new Node(data);
    
    if (this.root === null) {
      this.root = node;
    } else {
      const queue = [this.root];
      
      while (queue.length > 0) {
        const current = queue.shift();
        
        if (current.left === null) {
          current.left = node;
          return;
        } else if (current.right === null) {
          current.right = node;
          return;
        }
        
        queue.push(current.left);
        queue.push(current.right);
      }
    }
  }
}

// Inorder recursive
function inorderRecursive(root, result = []) {
  if (!root) return result;
  
  inorderRecursive(root.left, result);
  result.push(root.data);
  inorderRecursive(root.right, result);
  
  return result;
}

// Inorder iterative
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;
  
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    
    current = stack.pop();
    result.push(current.data);
    current = current.right;
  }
  
  return result;
}

// Preorder recursive
function preorderRecursive(root, result = []) {
  if (!root) return result;
  
  result.push(root.data);
  preorderRecursive(root.left, result);
  preorderRecursive(root.right, result);
  
  return result;
}

// Preorder iterative
function preorderIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length > 0) {
    const current = stack.pop();
    result.push(current.data);
    
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  
  return result;
}

// Postorder recursive
function postorderRecursive(root, result = []) {
  if (!root) return result;
  
  postorderRecursive(root.left, result);
  postorderRecursive(root.right, result);
  result.push(root.data);
  
  return result;
}

// Postorder iterative
function postorderIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  const visited = new Set();
  
  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    
    if (visited.has(current)) {
      result.push(current.data);
      stack.pop();
    } else {
      visited.add(current);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }
  
  return result;
}

// Test cases
console.log("=== Binary Tree Traversals ===\n");

const tree = new BinaryTree();
[1, 2, 3, 4, 5, 6, 7].forEach(x => tree.insert(x));

console.log("Tree structure:");
console.log("       1");
console.log("      / \\");
console.log("     2   3");
console.log("    / \\ / \\");
console.log("   4 5 6  7\n");

console.log("Inorder (Recursive):", inorderRecursive(tree.root));
console.log("Inorder (Iterative):", inorderIterative(tree.root));

console.log("\nPreorder (Recursive):", preorderRecursive(tree.root));
console.log("Preorder (Iterative):", preorderIterative(tree.root));

console.log("\nPostorder (Recursive):", postorderRecursive(tree.root));
console.log("Postorder (Iterative):", postorderIterative(tree.root));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(h) where h is height");
