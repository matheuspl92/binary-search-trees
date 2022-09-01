/*
*   Code written for the Binary Search Trees project assignment of The Odin Project.
*/

const NodeFactory = (data) => {
  let data = data;
  let left = null;
  let right = null;

  return { data, left, right }
};