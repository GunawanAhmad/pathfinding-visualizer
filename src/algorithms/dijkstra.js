export function dijkstra(grid, startNode, finishNode) {
  startNode.distance = 0;
  const visistedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length != 0) {
    sortNodesByDistance(unvisitedNodes);
    const currNode = unvisitedNodes.shift();
    if (currNode.isWall) continue;
    if (currNode.distance === Infinity) {
      return visistedNodesInOrder;
    }
    currNode.isVisited = true;
    visistedNodesInOrder.push(currNode);
    if (currNode === finishNode) return visistedNodesInOrder;
    updateUnvisitedNeighbours(currNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbours(node, grid) {
  const unvisitedNeighbours = getUnvisistedNeighbours(node, grid);
  for (let neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
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

function getAllNodes(grid) {
  const nodes = [];
  for (let row of grid) {
    for (let col of row) {
      nodes.push(col);
    }
  }
  return nodes;
}

export function findTheShortestPath(finishNode) {
  const nodesInShortesPathOrder = [];
  let currNode = finishNode;
  while (currNode !== null) {
    nodesInShortesPathOrder.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return nodesInShortesPathOrder;
}
