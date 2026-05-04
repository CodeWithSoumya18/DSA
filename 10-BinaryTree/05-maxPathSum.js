/**
 * Binary Tree - Maximum Path Sum
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Find maximum path sum
function maxPathSum(root) {
  let maxSum = Number.NEGATIVE_INFINITY;
  
  function helper(node) {
    if (!node) return 0;
    
    // Get max sum from left and right, ignore negative paths
    const leftSum = Math.max(helper(node.left), 0);
    const rightSum = Math.max(helper(node.right), 0);
    
    // Update global max if path through this node is larger
    maxSum = Math.max(maxSum, node.data + leftSum + rightSum);
    
    // Return max path sum ending at this node
    return node.data + Math.max(leftSum, rightSum);
  }
  
  helper(root);
  return maxSum;
}

// Path sum to leaf
function pathSum(root, targetSum) {
  const paths = [];
  
  function helper(node, currentSum, path) {
    if (!node) return;
    
    currentSum += node.data;
    path.push(node.data);
    
    // If leaf node and sum matches
    if (!node.left && !node.right && currentSum === targetSum) {
      paths.push([...path]);
    } else {
      helper(node.left, currentSum, path);
      helper(node.right, currentSum, path);
    }
    
    path.pop();
  }
  
  helper(root, 0, []);
  return paths;
}

// Test cases
console.log("=== Binary Tree Maximum Path Sum ===\n");

const root = new Node(10);
root.left = new Node(2);
root.right = new Node(10);
root.left.left = new Node(20);
root.left.right = new Node(1);
root.right.right = new Node(-25);
root.right.right.left = new Node(3);
root.right.right.right = new Node(4);

console.log("Tree:");
console.log("         10");
console.log("        /  \\");
console.log("       2    10");
console.log("      / \\      \\");
console.log("    20  1      -25");
console.log("              / \\");
console.log("             3   4\n");

console.log("Maximum Path Sum:", maxPathSum(root));

// Path sum example
const root2 = new Node(5);
root2.left = new Node(4);
root2.right = new Node(8);
root2.left.left = new Node(11);
root2.left.left.left = new Node(7);
root2.left.left.right = new Node(2);
root2.right.left = new Node(13);
root2.right.right = new Node(4);
root2.right.right.right = new Node(1);

console.log("\nTree for Path Sum:");
console.log("       5");
console.log("      / \\");
console.log("     4   8");
console.log("    /   / \\");
console.log("   11 13  4");
console.log("  / \\       \\");
console.log(" 7  2        1\n");

console.log("Paths with sum 22:");
console.log(JSON.stringify(pathSum(root2, 22)));

console.log("\nTime Complexity: O(n)");
console.log("Space Complexity: O(h) recursion");
