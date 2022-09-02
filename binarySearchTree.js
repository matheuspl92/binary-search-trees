/*
*   Code written for the Binary Search Trees project assignment of The Odin Project.
*/

/** Auxiliary functions */

function mergeSort (array) {
    if (array.length === 1) return array;
    const sortedArray = [];
    const leftArray = mergeSort(array.slice(0, array.length / 2));
    const rightArray = mergeSort(array.slice(array.length / 2));
    while (leftArray.length !== 0 && rightArray.length !== 0) {
        (leftArray[0] <= rightArray[0]) ? sortedArray.push(leftArray.splice(0, 1)[0]) : sortedArray.push(rightArray.splice(0, 1)[0]);
    }
    return (leftArray.length === 0) ? sortedArray.concat(rightArray) : sortedArray.concat(leftArray);
}

function removeDuplicates (array, index = 0) {
    const copy = array.slice();
    if (index >= copy.length - 1) return copy;
    if (copy[index] === copy[index + 1]) {
        copy.splice(index + 1, 1);
        return removeDuplicates(copy, index);
    } else {
        return removeDuplicates(copy, index + 1);
    }
}

function sortedArrayToBST (arr, start = 0, end = arr.length - 1) {
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

function findInorderSuccessor (node, parent) {
    if (node.left === null) return {node, parent};
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
    let root = _buildTree();

    function _buildTree() {
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
            return;
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

    /*const _delete = (value, node = root) => {
        const leftChild = node.left;
        const rightChild = node.right;

        if (leftChild && leftChild.data === value) {
            if (!leftChild.left && !leftChild.right) {
                node.left = null;
                return;
            } else if (leftChild.left && leftChild.right) {
                console.log('NODE HAS 2 CHILDREN');
                return
            } else {
                if (leftChild.left) {
                    node.left.data = leftChild.left.data;
                    node.left.left = null;
                } else {
                    node.left.data = leftChild.right.data;
                    node.left.right = null;
                }
            }
        }
        if (rightChild && rightChild.data === value) {
            if (!rightChild.left && !rightChild.right) {
                node.right = null;
                return;
            } else if (rightChild.left && rightChild.right) {
                console.log('NODE HAS 2 CHILDREN');
                return
            } else {
                if (rightChild.left) {
                    node.right.data = rightChild.left.data;
                    node.right.left = null;
                    return
                } else {
                    node.right.data = rightChild.right.data;
                    node.right.right = null;
                    return
                }
            }
        }

        if (value < node.data && node.left) _delete(value, node.left);
        if (value > node.data && node.right) _delete(value, node.right);
    }*/

    return {
        print: _prettyPrint,
        insert: _insert,
        delete: _delete,
    }
};

const newTree = TreeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 18, 13]);
newTree.print();
