/**
 * Binary Tree - Height and Balanced Check
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Find height of tree
function findHeight(root) {
  if (!root) return 0;
  
  const leftHeight = findHeight(root.left);
  const rightHeight = findHeight(root.right);
  
  return Math.max(leftHeight, rightHeight) + 1;
}

// Check if tree is balanced
function isBalanced(root) {
  if (!root) return true;
  
  const leftHeight = findHeight(root.left);
  const rightHeight = findHeight(root.right);
  
  if (Math.abs(leftHeight - rightHeight) > 1) {
    return false;
  }
  
  return isBalanced(root.left) && isBalanced(root.right);
}

// Optimized balanced check with height
function isBalancedOptimized(root) {
  function check(node) {
    if (!node) return { balanced: true, height: 0 };
    
    const left = check(node.left);
    if (!left.balanced) return { balanced: false, height: 0 };
    
    const right = check(node.right);
    if (!right.balanced) return { balanced: false, height: 0 };
    
    const balanced = Math.abs(left.height - right.height) <= 1;
    const height = Math.max(left.height, right.height) + 1;
    
    return { balanced, height };
  }
  
  return check(root).balanced;
}

// Test cases
console.log("=== Binary Tree Height and Balanced Check ===\n");

// Create balanced tree
const balancedRoot = new Node(1);
balancedRoot.left = new Node(2);
balancedRoot.right = new Node(3);
balancedRoot.left.left = new Node(4);
balancedRoot.left.right = new Node(5);

console.log("Balanced Tree:");
console.log("       1");
console.log("      / \\");
console.log("     2   3");
console.log("    / \\");
console.log("   4   5\n");

console.log("Height:", findHeight(balancedRoot));
console.log("Is balanced:", isBalanced(balancedRoot));

// Create unbalanced tree
const unbalancedRoot = new Node(1);
unbalancedRoot.left = new Node(2);
unbalancedRoot.left.left = new Node(3);
unbalancedRoot.left.left.left = new Node(4);

console.log("\nUnbalanced Tree:");
console.log("   1");
console.log("  /");
console.log(" 2");
console.log("/");
console.log("3");
console.log("/");
console.log("4\n");

console.log("Height:", findHeight(unbalancedRoot));
console.log("Is balanced:", isBalanced(unbalancedRoot));

console.log("\nTime Complexity: O(n²) naive, O(n) optimized");
console.log("Space Complexity: O(h) recursion stack");
