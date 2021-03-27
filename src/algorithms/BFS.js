export function BFS(grid, startNode, finishNode) {
  const queue = [];
  const visitedNodes = [];
  startNode.distance = 0;
  queue.push(startNode);
  while (queue.length != 0) {
    let currNode = queue.shift();
    if (currNode.isVisited || currNode.isWall) continue;
    currNode.isVisited = true;
    if (currNode.distance == Infinity) return visitedNodes;
    visitedNodes.push(currNode);
    if (currNode == finishNode) return visitedNodes;
    updateUnvisitedNeighbours(currNode, grid, queue);
  }
  return visitedNodes;
}

function updateUnvisitedNeighbours(node, grid, queue) {
  const unvisitedNeighbours = getUnvisistedNeighbours(node, grid);
  for (let neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
    queue.push(neighbour);
  }
}

function getUnvisistedNeighbours(node, grid) {
  const neighbours = [];
  const { col, row } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter((node) => !node.isVisited);
}

export function findTheShortestPathFromBFS(finishNode) {
  const nodesInShortesPathOrder = [];
  let currNode = finishNode;
  while (currNode !== null) {
    nodesInShortesPathOrder.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return nodesInShortesPathOrder;
}
