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

    return {
        print: _prettyPrint,
        insert: _insert,
    }
};

const newTree = TreeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 18, 13]);
newTree.print();
