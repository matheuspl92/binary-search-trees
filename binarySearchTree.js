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

/** Main functions */

const NodeFactory = (value) => {
  let data = value;
  let left = null;
  let right = null;

  return { data, left, right }
};

const TreeFactory = (array) => {
  let root = buildTree();

  function buildTree () {
    const sortedArray = mergeSort(array);
    const noDuplicatesArray = removeDuplicates(sortedArray);
    const midValue = noDuplicatesArray[parseInt((noDuplicatesArray.length - 1) / 2)];
    return NodeFactory(midValue);
  }
};

const newTree = TreeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 18, 13]);