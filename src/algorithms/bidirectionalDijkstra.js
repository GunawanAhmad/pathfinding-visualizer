export function bidirectionalDijkstra(grid, startNode, finishNode) {
  startNode.distance = 0;
  finishNode.distance = 0;
  const visistedNodesInOrderFromStart = [];
  const visistedNodesInOrderFromFinish = [];
  const visistedNodesInOrder = [];
  const unvisitedNodesFromStart = getAllNodes(grid);
  const unvisitedNodesFromFinish = getAllNodes(grid);
  startNode.distance = Infinity;
  unvisitedNodesFromFinish.push(startNode);
  unvisitedNodesFromStart.splice(
    unvisitedNodesFromStart.indexOf(finishNode),
    1
  );
  finishNode.distance = Infinity;
  unvisitedNodesFromStart.push(finishNode);

  while (
    unvisitedNodesFromStart.length != 0 &&
    unvisitedNodesFromFinish.length != 0
  ) {
    sortNodesByDistance(unvisitedNodesFromStart);
    sortNodesByDistance(unvisitedNodesFromFinish);
    const currNodeFromStart = unvisitedNodesFromStart.shift();
    const currNodeFromFinish = unvisitedNodesFromFinish.shift();
    if (currNodeFromStart.isWall) continue;
    if (currNodeFromFinish.isWall) continue;
    if (
      currNodeFromStart.distance === Infinity &&
      currNodeFromFinish.distance === Infinity
    ) {
      return visistedNodesInOrder;
    }
    currNodeFromStart.isVisited = true;
    currNodeFromFinish.isVisited = true;
    visistedNodesInOrderFromStart.push(currNodeFromStart);
    visistedNodesInOrderFromFinish.push(currNodeFromFinish);
    visistedNodesInOrder.push(currNodeFromStart);
    visistedNodesInOrder.push(currNodeFromFinish);
    if (currNodeFromStart === currNodeFromFinish) {
      console.log("hai");
      return [];
    }
    updateUnvisitedNeighbours(currNodeFromStart, grid);
    updateUnvisitedNeighbours(currNodeFromFinish, grid);
  }
  return visistedNodesInOrder;
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
