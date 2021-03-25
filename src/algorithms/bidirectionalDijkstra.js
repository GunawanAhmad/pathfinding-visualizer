const unvisitedNodesFromStart = [];
const unvisitedNodesFromFinish = [];
const visitedNodesFromFinish = [];
const visitedNodesFromStart = [];
let found = false;
let foundNode = null;
let lastNode = null;
let last = undefined;

export function bidirectionalDijkstra(grid, startNode, finishNode) {
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
      if (found) {
        if (last == "start") {
          sortNodesByDistance(visitedNodesFromStart);

          lastNode = visitedNodesFromStart[visitedNodesFromStart.length - 1];
        } else {
          sortNodesByDistance(visitedNodesFromFinish);
          lastNode = visitedNodesFromFinish[visitedNodesFromFinish.length - 1];
        }
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
      if (found) {
        if (last == "start") {
          sortNodesByDistance(visitedNodesFromStart);

          lastNode = visitedNodesFromStart[visitedNodesFromStart.length - 1];
        } else {
          sortNodesByDistance(visitedNodesFromFinish);
          lastNode = visitedNodesFromFinish[visitedNodesFromFinish.length - 1];
        }
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
  if (last == "start") {
    sortNodesByDistance(visitedNodesFromStart);
    lastNode = visitedNodesFromStart[visitedNodesFromStart.length - 1];
  } else {
    sortNodesByDistance(visitedNodesFromFinish);
    lastNode = visitedNodesFromFinish[visitedNodesFromFinish.length - 1];
    console.log(visitedNodesFromFinish[visitedNodesFromFinish.length - 1]);
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
    if (isFromStart) {
      if (visitedNodesFromFinish.includes(neighbour)) {
        last = "start";

        foundNode = neighbour;
        found = true;
        return;
      }
    } else if (isFromFinish) {
      if (visitedNodesFromStart.includes(neighbour)) {
        foundNode = neighbour;
        last = "finish";
        found = true;
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
