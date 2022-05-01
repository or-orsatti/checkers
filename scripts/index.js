const containerEl = document.querySelector(".container");
const tableEl = document.createElement("table");

const ROW_CLASS = "row",
  CELL_CLASS = "cell",
  CHESSBOARD_CLASS = "chessboard",
  BOARD_SIZE = 8,
  WHITE = "white",
  BLACK = "black";

let active = null;

function createChessboard() {
  tableEl.classList.add(CHESSBOARD_CLASS);
  const cellsList = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const rowEl = tableEl.insertRow();
    rowEl.classList.add(ROW_CLASS);
    for (let j = 0; j < BOARD_SIZE; j++) {
      const el = rowEl.insertCell();
      el.classList.add(CELL_CLASS);
      if (i % 2 === 0) {
        if (j % 2 === 0) continue;
        cellsList.push(new Cell(i, j, el));
      } else {
        if (j % 2 !== 0) continue;
        cellsList.push(new Cell(i, j, el));
      }
    }
  }
  containerEl.appendChild(tableEl);
  return cellsList;
}

function initPieces() {
  const pieces = [];
  for (let i = 0; i < cellsList.length; i++) {
    const element = cellsList[i];
    let color = "";

    if (element.row === 3 || element.row === 4) continue;

    if (element.row < 3) {
      color = WHITE;
    }

    if (element.row > 4) {
      color = BLACK;
    }

    const piece = new Piece(element, color, `../imgs/basic-${color}.png`);
    piece.cell = element;
    pieces.push(piece);
  }
  return pieces;
}

const cellsList = createChessboard();
console.log(cellsList);
const pieces = initPieces();
console.log(pieces);
