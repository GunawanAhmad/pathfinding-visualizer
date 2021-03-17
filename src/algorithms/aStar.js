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
      return closedList;
    }
    if (currentNode.distance === Infinity) {
      console.log("wall");
      return closedList;
    }
    openList = removeFromArray(currentNode, openList);
    if (currentNode.isWall) continue;
    currentNode.isVisited = true;
    updateNeighbours(
      currentNode,
      grid,
      openList,
      openListRecord,
      finishNode,
      closedList
    );
    closedList.push(currentNode);
  }
  return closedList;
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

function updateNeighbours(
  node,
  grid,
  openList,
  openListRecord,
  finishNode,
  closedList
) {
  let neighbours = getNeighbours(node, grid);
  for (let neighbour of neighbours) {
    if (!closedList.includes(neighbour)) {
      let temp = node.distance + 1;
      let newPath = false;
      if (openList.includes(neighbour)) {
        if (temp < neighbour.distance) {
          neighbour.distance = temp;
          newPath = true;
        }

        openList.push(neighbour);
        openListRecord.push(neighbour);
      } else {
        neighbour.distance = temp;
        openList.push(neighbour);
        newPath = true;
      }

      if (newPath) {
        neighbour.heuristic = manhattanDistance(neighbour, finishNode);
        neighbour.totalDistance = neighbour.distance + neighbour.heuristic;
        neighbour.previousNode = node;
      }
    }
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
  if (nodesInShortesPathOrder.length < 1) {
    return [];
  }
  return nodesInShortesPathOrder;
}
