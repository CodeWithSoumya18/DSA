/**
 * Binary Tree - Lowest Common Ancestor
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Find LCA - Recursive approach
function findLCA(root, n1, n2) {
  if (!root) return null;
  
  // If both are less than root, LCA in left subtree
  if (n1 < root.data && n2 < root.data) {
    return findLCA(root.left, n1, n2);
  }
  
  // If both are greater than root, LCA in right subtree
  if (n1 > root.data && n2 > root.data) {
    return findLCA(root.right, n1, n2);
  }
  
  // One is on each side or one is root itself
  return root;
}

// Find LCA in general binary tree
function findLCAGeneral(root, n1, n2) {
  if (!root) return null;
  
  // If one of n1 or n2 matches root's data, root is LCA
  if (root.data === n1 || root.data === n2) {
    return root;
  }
  
  // Look for keys in left and right subtrees
  const left = findLCAGeneral(root.left, n1, n2);
  const right = findLCAGeneral(root.right, n1, n2);
  
  // If both left and right return non-null, root is LCA
  if (left && right) {
    return root;
  }
  
  // Otherwise return whichever side is non-null
  return left ? left : right;
}

// Test cases
console.log("=== Lowest Common Ancestor ===\n");

// BST example
const bstRoot = new Node(20);
bstRoot.left = new Node(8);
bstRoot.right = new Node(22);
bstRoot.left.left = new Node(4);
bstRoot.left.right = new Node(12);
bstRoot.left.right.left = new Node(10);
bstRoot.left.right.right = new Node(14);

console.log("BST:");
console.log("        20");
console.log("       /  \\");
console.log("      8    22");
console.log("     / \\");
console.log("    4   12");
console.log("       / \\");
console.log("      10  14\n");

let lca = findLCA(bstRoot, 10, 14);
console.log("LCA of 10 and 14:", lca.data);

lca = findLCA(bstRoot, 8, 22);
console.log("LCA of 8 and 22:", lca.data);

lca = findLCA(bstRoot, 4, 8);
console.log("LCA of 4 and 8:", lca.data);

// General binary tree
const treeRoot = new Node(1);
treeRoot.left = new Node(2);
treeRoot.right = new Node(3);
treeRoot.left.left = new Node(4);
treeRoot.left.right = new Node(5);
treeRoot.right.left = new Node(6);
treeRoot.right.right = new Node(7);

console.log("\nGeneral Binary Tree:");
console.log("       1");
console.log("      / \\");
console.log("     2   3");
console.log("    / \\ / \\");
console.log("   4 5 6  7\n");

lca = findLCAGeneral(treeRoot, 4, 5);
console.log("LCA of 4 and 5:", lca.data);

lca = findLCAGeneral(treeRoot, 4, 6);
console.log("LCA of 4 and 6:", lca.data);

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(h) recursion stack");
