/*
*   Code written for the Binary Search Trees project assignment of The Odin Project.
*/

/** Auxiliary functions */

function mergeSort(array) {
    if (array.length === 1) return array;
    const sortedArray = [];
    const leftArray = mergeSort(array.slice(0, array.length / 2));
    const rightArray = mergeSort(array.slice(array.length / 2));
    while (leftArray.length !== 0 && rightArray.length !== 0) {
        (leftArray[0] <= rightArray[0]) ? sortedArray.push(leftArray.splice(0, 1)[0]) : sortedArray.push(rightArray.splice(0, 1)[0]);
    }
    return (leftArray.length === 0) ? sortedArray.concat(rightArray) : sortedArray.concat(leftArray);
}

function removeDuplicates(array, index = 0) {
    const copy = array.slice();
    if (index >= copy.length - 1) return copy;
    if (copy[index] === copy[index + 1]) {
        copy.splice(index + 1, 1);
        return removeDuplicates(copy, index);
    } else {
        return removeDuplicates(copy, index + 1);
    }
}

function sortedArrayToBST(arr, start = 0, end = arr.length - 1) {
    /* Base Case */
    if (start > end) {
        return null;
    }
    /* Get the middle element and make it root */
    var mid = parseInt((start + end) / 2);
    var node = NodeFactory(arr[mid]);
    /* Recursively construct the left subtree and make it
     left child of root */
    node.left = sortedArrayToBST(arr, start, mid - 1);
    /* Recursively construct the right subtree and make it
     right child of root */
    node.right = sortedArrayToBST(arr, mid + 1, end);
    return node;
}

function findInorderSuccessor(node, parent) {
    if (node.left === null) return { node, parent };
    return findInorderSuccessor(node.left, node);
}

/** Main functions */

const NodeFactory = (value) => {
    let data = value;
    let left = null;
    let right = null;

    return { data, left, right }
};

const TreeFactory = (array) => {
    let root = _buildTree(array);

    function _buildTree(array) {
        const sortedArray = mergeSort(array);
        const noDuplicatesArray = removeDuplicates(sortedArray);
        console.log(noDuplicatesArray);
        return sortedArrayToBST(noDuplicatesArray);
    }

    const _prettyPrint = (node = root, prefix = '', isLeft = true) => {
        if (node.right !== null) {
            _prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            _prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    const _insert = (value, node = root) => {
        if (value === node.data) {
            console.log('TreeFactory.insert() ERROR: value already exist inside the tree.');
            return null;
        }
        if (value < node.data) (node.left) ? _insert(value, node.left) : node.left = NodeFactory(value);
        if (value > node.data) (node.right) ? _insert(value, node.right) : node.right = NodeFactory(value);
    }

    const _delete = (value, node = root, parent = null) => {
        //Base case
        if (node === null) return node;

        //Recursion case
        if (value < node.data) return _delete(value, node.left, node);
        if (value > node.data) return _delete(value, node.right, node);

        if (value === node.data) {
            //In case the node is a leaf node, delete reference in parent
            if (!node.left && !node.right) {
                (parent.left === node) ? parent.left = null : parent.right = null;
                return;

                //In case the node has two children puts successor node in its place    
            } else if (node.left && node.right) {
                let inorderSuccessor = findInorderSuccessor(node.right, node);
                //In case the successor found is actually the node right child
                if (inorderSuccessor.parent === node) {
                    node.data = inorderSuccessor.node.data;
                    node.right = inorderSuccessor.node.right;
                    return;
                    //In case the successor found has right child
                } else if (inorderSuccessor.node.right) {
                    node.data = inorderSuccessor.node.data;
                    inorderSuccessor.parent.left = inorderSuccessor.node.right;
                    return;
                    //In case the successor found is a leaf node
                } else {
                    node.data = inorderSuccessor.node.data;
                    inorderSuccessor.parent.left = null;
                    return;
                }
            } else {
                //In case the node has only one child
                if (node.left) {
                    node.data = node.left.data;
                    node.left = node.left.left;
                    return;
                } else {
                    node.data = node.right.data;
                    node.right = node.right.right;
                    return;
                }
            }
        }
    }

    const _find = (value, node = root) => {
        if (node === null) {
            console.log('TreeFactory.find() ALERT: value do not exist inside the tree.');
            return null;
        }
        if (value === node.data) return node;

        return (value < node.data) ? _find(value, node.left) : _find(value, node.right);
    }

    const _levelOrder = (func = null, queue = null, valuesArray = []) => {
        let newQueue = [];

        if (queue === null) queue = [root];

        queue.forEach(node => {
            (func !== null) ? func(node.data) : valuesArray.push(node.data);
            if (node.left) newQueue.push(node.left);
            if (node.right) newQueue.push(node.right);
        });

        if (newQueue.length === 0) {
            return (func === null) ? valuesArray : null;
        }

        return _levelOrder(func, newQueue, valuesArray);
    }

    const _inorder = (func = null, node = root, valuesArray = [], isFirstCall = true) => {
        if (node === null) return null

        if (node.left) _inorder(func, node.left, valuesArray, false);
        (func) ? func(node.data) : valuesArray.push(node.data);
        if (node.right) _inorder(func, node.right, valuesArray, false);

        if (isFirstCall) return valuesArray;
    }

    const _preorder = (func = null, node = root, valuesArray = [], isFirstCall = true) => {
        if (node === null) return null;

        (func) ? func(node.data) : valuesArray.push(node.data);
        if (node.left) _preorder(func, node.left, valuesArray, false);
        if (node.right) _preorder(func, node.right, valuesArray, false);

        if (isFirstCall) return valuesArray;
    }

    const _postorder = (func = null, node = root, valuesArray = [], isFirstCall = true) => {
        if (node === null) return null;

        if (node.left) _postorder(func, node.left, valuesArray, false);
        if (node.right) _postorder(func, node.right, valuesArray, false);
        (func) ? func(node.data) : valuesArray.push(node.data);

        if (isFirstCall) return valuesArray;
    }

    const _height = (node, queue = null, height = 0) => {
        let newQueue = [];

        if (queue === null) queue = [node];

        queue.forEach(node => {
            if (node.left) newQueue.push(node.left);
            if (node.right) newQueue.push(node.right);
        });

        if (newQueue.length === 0) {
            return height;
        }

        return _height(node, newQueue, height + 1);
    }

    const _depth = (targetNode, node = root, depth = 0) => {
        if (node === null) {
            console.log('TreeFactory.depth() ALERT: value do not exist inside the tree.');
            return null;
        }
        if (targetNode === node) return depth;

        return (targetNode.data < node.data) ? _depth(targetNode, node.left, depth + 1) : _depth(targetNode, node.right, depth + 1);
    }

    const _isBalanced = () => {
        return (Math.abs(_height(root.left) - _height(root.right)) <= 1) 
    }

    const _rebalance = () => {
        root = _buildTree(_inorder());
    }

    return {
        print: _prettyPrint,
        insert: _insert,
        delete: _delete,
        find: _find,
        levelOrder: _levelOrder,
        inorder: _inorder,
        preorder: _preorder,
        postorder: _postorder,
        height: _height,
        depth: _depth,
        isBalanced: _isBalanced,
        rebalance: _rebalance,
    }
};

const newTree = TreeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 18, 13]);
newTree.print();
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.inorder());
console.log(newTree.preorder());
console.log(newTree.postorder());

for (let i = 1; i <= 101; i ++) {
    newTree.insert(23 * i);
}

console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.inorder());
console.log(newTree.preorder());
console.log(newTree.postorder());
newTree.print();