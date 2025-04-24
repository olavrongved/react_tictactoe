import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //console.log(squares);
  for (const line of lines) {
    if (
      squares[line[0]] === squares[line[1]] &&
      squares[line[0]] === squares[line[2]] &&
      squares[line[0]] !== null
    ) {
      return squares[line[0]];
    }
  }
  return null;
}

function nextSquareExists(currentIdx, gridsize, direction) {
  if (direction === "right") {
    const test = (currentIdx + 1) % gridsize !== 0;
    return (currentIdx + 1) % gridsize !== 0;
  }

  if (direction === "left") {
    return (currentIdx + 1) % gridsize !== 1;
  }

  if (direction === "down") {
    return currentIdx + 1 < 6;
  }

  if (direction === "up") {
    return currentIdx + 1 > 3;
  }

  if (direction === "diagonalDownRight") {
    const isInBoundsRow = currentIdx + 1 < 6;
    const isInBoundsCol = currentIdx + (1 % gridsize) !== 0;
    return isInBoundsRow && isInBoundsCol;
  }

  if (direction === "diagonalUpLeft") {
    const isInBoundsRow = currentIdx + 1 > 3;
    const isInBoundsCol = (currentIdx + 1) % gridsize !== 1;
    return isInBoundsRow && isInBoundsCol;
  }

  if (direction === "diagonalDownLeft") {
    console.log(
      "diagonalDownLeft",
      currentIdx,
      (currentIdx + 1) % gridsize !== 1
    );
    const isInBoundsRow = currentIdx + 1 < 6;
    const isInBoundsCol = (currentIdx + 1) % gridsize !== 1;
    return isInBoundsRow && isInBoundsCol;
  }

  if (direction === "diagonalUpRight") {
    const isInBoundsRow = currentIdx + 1 > 3;
    const isInBoundsCol = (currentIdx + 1) % gridsize !== 0;
    return isInBoundsRow && isInBoundsCol;
  }

  return false;
}

// Keeping this monster here for later practice
function calculateWinnerRecursive(squares, currentIdx, player, count = 1, visited = new Set(), visitedDirections = new Set()) {
  const gridsize = 3; // 3x3 grid, must check diags for existence
  const directions = {
    right: 1,
    left: -1,
    down: 3,
    up: -3,
    diagonalDownRight: 4,
    diagonalUpLeft: -4,
    diagonalDownLeft: 2,
    diagonalUpRight: -2,
  };

  let currentValue = squares[currentIdx];
  console.log("count", count, currentValue, player);
  if (count === 3) {
    return player;
  }
  visited.add(currentIdx);
  // check left right
  if (nextSquareExists(currentIdx, gridsize, "right") && !visited.has(currentIdx + directions.right) && !visitedDirections.has("leftRight")) {
    const nextIdx = currentIdx + directions.right;
    if (squares[nextIdx] === player && currentValue != null) {
      return calculateWinnerRecursive(
        squares,
        nextIdx,
        player,
        count + 1,
        visited
      );
    }
  }
  if (nextSquareExists(currentIdx, gridsize, "right") && !visited.has(currentIdx + directions.left) && !visitedDirections.has("leftRight")) {
    const nextIdx = currentIdx + directions.left;
    if (squares[nextIdx] === player && currentValue != null) {
      return calculateWinnerRecursive(
        squares,
        nextIdx,
        player,
        count + 1,
        visited
      );
    }
  }
  visitedDirections.add("leftRight");

  // check up down
  if (nextSquareExists(currentIdx, gridsize, "down") && !visited.has(currentIdx + directions.down) && !visitedDirections.has("upDown")) {
    const nextIdx = currentIdx + directions.down;
    if (squares[nextIdx] === player && currentValue != null) {
      return calculateWinnerRecursive(
        squares,
        nextIdx,
        player,
        count + 1,
        visited
      );
    }
  }
  if (nextSquareExists(currentIdx, gridsize, "up") && !visited.has(currentIdx + directions.up) && !visitedDirections.has("upDown")) {
    const nextIdx = currentIdx + directions.up;
    if (squares[nextIdx] === player && currentValue != null) {
      return calculateWinnerRecursive(
        squares,
        nextIdx,
        player,
        count + 1,
        visited
      );
    }
  }
  visitedDirections.add("upDown");
  
  // check one diagonal
  if (nextSquareExists(currentIdx, gridsize, "diagonalDownRight") && !visited.has(currentIdx + directions.diagonalDownRight) && !visitedDirections.has("diagonal1")) {
    const nextIdx = currentIdx + directions.diagonalDownRight;
    if (squares[nextIdx] === player && currentValue != null) {
      return calculateWinnerRecursive(
        squares,
        nextIdx,
        player,
        count + 1,
        visited
      );
    }
  }
  if (nextSquareExists(currentIdx, gridsize, "diagonalUpLeft") && !visited.has(currentIdx + directions.diagonalUpLeft) && !visitedDirections.has("diagonal1")) {
    const nextIdx = currentIdx + directions.diagonalUpLeft;
    if (squares[nextIdx] === player && currentValue != null) {
      return calculateWinnerRecursive(
        squares,
        nextIdx,
        player,
        count + 1,
        visited
      );
    }
  }
  visitedDirections.add("diagonal1");
  // check another diagonal
  if (nextSquareExists(currentIdx, gridsize, "diagonalDownLeft") && !visited.has(currentIdx + directions.diagonalDownLeft) && !visitedDirections.has("diagonal2")) {
    const nextIdx = currentIdx + directions.diagonalDownLeft;
    if (squares[nextIdx] === player && currentValue != null) {
      return calculateWinnerRecursive(
        squares,
        nextIdx,
        player,
        count + 1,
        visited
      );
    }
  }
  if (nextSquareExists(currentIdx, gridsize, "diagonalUpRight") && !visited.has(currentIdx + directions.diagonalUpRight) && !visitedDirections.has("diagonal2")) {
    const nextIdx = currentIdx + directions.diagonalUpRight;
    if (squares[nextIdx] === player && currentValue != null) {
      return calculateWinnerRecursive(
        squares,
        nextIdx,
        player,
        count + 1,
        visited
      );
    }
  }
  visitedDirections.add("diagonal2");
  return;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true);
  let status;
  function handleClick(i) {
    const nextSquares = squares.slice();

    if (nextSquares[i] != null) return;

    nextSquares[i] = isFirstPlayerTurn ? "X" : "O";
    setSquares(nextSquares);
    setIsFirstPlayerTurn(!isFirstPlayerTurn);
    //console.log(calculateWinnerRecursive(nextSquares, i, nextSquares[i], 1));
  }
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isFirstPlayerTurn ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
