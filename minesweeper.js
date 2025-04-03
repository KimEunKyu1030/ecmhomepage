const boardSize = 5;
const mineCount = 5;
const board = [];
let revealed = 0;

function initBoard() {
  const container = document.getElementById("minesweeper-board");
  container.innerHTML = "";
  revealed = 0;
  board.length = 0;

  const minePositions = new Set();
  while (minePositions.size < mineCount) {
    minePositions.add(Math.floor(Math.random() * boardSize * boardSize));
  }

  for (let row = 0; row < boardSize; row++) {
    board[row] = [];
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      container.appendChild(cell);
      board[row][col] = {
        element: cell,
        mine: minePositions.has(row * boardSize + col),
        revealed: false,
        adjacent: 0,
      };

      cell.addEventListener("click", () => revealCell(row, col));
    }
  }

  // Set adjacent counts
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = row + dr;
          const nc = col + dc;
          if (
            nr >= 0 &&
            nr < boardSize &&
            nc >= 0 &&
            nc < boardSize &&
            board[nr][nc].mine
          ) {
            count++;
          }
        }
      }
      board[row][col].adjacent = count;
    }
  }
}

function revealCell(row, col) {
  const cell = board[row][col];
  if (cell.revealed) return;
  cell.revealed = true;
  revealed++;
  cell.element.classList.add("revealed");

  if (cell.mine) {
    cell.element.textContent = "💣";
    document.getElementById("game-status").textContent = "게임 오버!";
    revealAllMines();
    return;
  } else if (cell.adjacent > 0) {
    cell.element.textContent = cell.adjacent;
  } else {
    // reveal neighbors
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = row + dr;
        const nc = col + dc;
        if (
          nr >= 0 &&
          nr < boardSize &&
          nc >= 0 &&
          nc < boardSize
        ) {
          revealCell(nr, nc);
        }
      }
    }
  }

  if (revealed === boardSize * boardSize - mineCount) {
    document.getElementById("game-status").textContent = "🎉 승리!";
  }
}

function revealAllMines() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = board[row][col];
      if (cell.mine) {
        cell.element.textContent = "💣";
        cell.element.classList.add("revealed");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", initBoard);