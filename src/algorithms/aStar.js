export function aStar(grid, startNode, finishNode) {
  let openList = [];
  let openListRecord = [];
  let closedList = [];

  startNode.distance = 0;
  startNode.heuristic = 0;
  startNode.totalDistance = 0;
  openList.push(startNode);
  openListRecord.push(startNode);

  while (openList.length != 0) {
    let currentNode = findLowestInOpenList(openList);

    if (currentNode === finishNode) {
      return openListRecord;
    }
    if (currentNode.distance === Infinity) return false;
    openList = removeFromArray(currentNode, openList);
    currentNode.isVisited = true;
    closedList.push(currentNode);
    updateNeighbours(currentNode, grid, openList, openListRecord, finishNode);
  }
}

function findLowestInOpenList(openList) {
  let current = openList[0];
  for (let i = 0; i < openList.length; i++) {
    if (openList[i].totalDistance < current.totalDistance) {
      current = openList[i];
    }
  }
  return current;
}

function removeFromArray(node, list) {
  let newOpenList = [];
  for (let i = 0; i < list.length; i++) {
    if (!(node === list[i])) {
      newOpenList.push(list[i]);
    }
  }
  return newOpenList;
}

function updateNeighbours(node, grid, openList, openListRecord, finishNode) {
  let neighbours = getNeighbours(node, grid);
  for (let neighbour of neighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.heuristic = manhattanDistance(neighbour, finishNode);
    neighbour.totalDistance = neighbour.distance + neighbour.heuristic;
    neighbour.previousNode = node;
    openList.push(neighbour);
    openListRecord.push(neighbour);
  }
}

function getNeighbours(node, grid) {
  const neighbours = [];
  const { col, row } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter((node) => !node.isVisited);
}

function manhattanDistance(nodeOne, nodeTwo) {
  let x = Math.abs(nodeOne.row - nodeTwo.row);
  let y = Math.abs(nodeOne.col - nodeTwo.col);

  return x + y;
}

export function findTheShortestPathFromAstar(finishNode) {
  const nodesInShortesPathOrder = [];
  let currNode = finishNode;
  while (currNode !== null) {
    nodesInShortesPathOrder.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return nodesInShortesPathOrder;
}
