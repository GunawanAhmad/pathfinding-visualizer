let unvisitedNodesFromStart = [];
let unvisitedNodesFromFinish = [];
let visitedNodesFromFinish = [];
let visitedNodesFromStart = [];
let foundByBothTarget = false;
let foundNode = null;
let lastNode = null;

export function bidirectionalDijkstra(grid, startNode, finishNode) {
  unvisitedNodesFromStart = [];
  unvisitedNodesFromFinish = [];
  visitedNodesFromFinish = [];
  visitedNodesFromStart = [];
  foundByBothTarget = false;
  foundNode = null;
  lastNode = null;
  startNode.distance = 0;
  finishNode.distance = 0;
  const visistedNodesInOrder = [];
  unvisitedNodesFromFinish.push(finishNode);
  unvisitedNodesFromStart.push(startNode);

  while (
    unvisitedNodesFromStart.length != 0 &&
    unvisitedNodesFromFinish.length != 0
  ) {
    sortNodesByDistance(unvisitedNodesFromFinish);
    sortNodesByDistance(unvisitedNodesFromStart);

    const currNodeStart = unvisitedNodesFromStart.shift();
    const currNodeFinish = unvisitedNodesFromFinish.shift();

    if (!currNodeStart.isWall) {
      currNodeStart.isVisited = true;
      visistedNodesInOrder.push(currNodeStart);
      visitedNodesFromStart.push(currNodeStart);
      if (foundByBothTarget) {
        return visistedNodesInOrder;
      }
      updateUnvisitedNeighbours(
        currNodeStart,
        grid,
        unvisitedNodesFromStart,
        true,
        false
      );
    }
    if (!currNodeFinish.isWall) {
      currNodeFinish.isVisited = true;
      visistedNodesInOrder.push(currNodeFinish);
      visitedNodesFromFinish.push(currNodeFinish);
      if (foundByBothTarget) {
        return visistedNodesInOrder;
      }
      updateUnvisitedNeighbours(
        currNodeFinish,
        grid,
        unvisitedNodesFromFinish,
        false,
        true
      );
    }

    if (currNodeStart == finishNode || currNodeFinish == startNode) {
      console.log(visistedNodesInOrder);
      return visistedNodesInOrder;
    }
  }

  return visistedNodesInOrder;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbours(
  node,
  grid,
  unvisitedNodes,
  isFromStart,
  isFromFinish
) {
  const unvisitedNeighbours = getUnvisistedNeighbours(node, grid);
  for (let neighbour of unvisitedNeighbours) {
    if (neighbour.isWall) continue;
    if (isFromStart) {
      if (unvisitedNodesFromFinish.includes(neighbour)) {
        foundNode = neighbour;
        foundByBothTarget = true;
        lastNode = node;
        return;
      }
    } else if (isFromFinish) {
      if (unvisitedNodesFromStart.includes(neighbour)) {
        foundNode = neighbour;
        foundByBothTarget = true;
        lastNode = node;
        return;
      }
    }
    if (
      !unvisitedNodesFromFinish.includes(neighbour) &&
      !unvisitedNodesFromStart.includes(neighbour)
    ) {
      if (!neighbour.isVisited) {
        neighbour.distance = node.distance + 1;
        neighbour.previousNode = node;
        unvisitedNodes.push(neighbour);
      }
    }
  }
}

function getUnvisistedNeighbours(node, grid) {
  const neighbours = [];
  const { col, row } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);

  return neighbours;
}

export function findTheShortestPathFromBidirectional() {
  const nodesInShortesPathOrder = [];
  const nodesInShortesPathOrder2 = [];
  let currNode = foundNode;
  let currNode2 = lastNode;
  while (currNode !== null) {
    nodesInShortesPathOrder.unshift(currNode);
    currNode = currNode.previousNode;
  }
  while (currNode2 !== null) {
    nodesInShortesPathOrder2.unshift(currNode2);
    currNode2 = currNode2.previousNode;
  }
  return nodesInShortesPathOrder.concat(nodesInShortesPathOrder2);
}
