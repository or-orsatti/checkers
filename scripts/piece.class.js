class Piece {
  constructor(cell, color, img) {
    this._cell = cell;
    this._img = document.createElement("img");
    this._img.src = img;
    this._img.classList.add("piece");
    this._color = color;
    this._moves = [];
  }

  set cell(newCell) {
    newCell.piece = this;
    this._cell = newCell;
  }

  get cell() {
    return this._cell;
  }

  getCoordinates() {
    return { row: this._cell.row, col: this._cell.col };
  }

  get img() {
    return this._img;
  }

  get color() {
    return this._color;
  }

  get opponmentColor() {
    return this._color === WHITE ? BLACK : WHITE;
  }

  get moves() {
    return this._moves;
  }

  calcMoves() {
    const relativeMoves = this.getRelativeMoves();
    const moves = [];
    for (const relativeMove of relativeMoves) {
      let cellNumber = null;
      try {
        cellNumber = Cell.getLocation(relativeMove.row, relativeMove.col);
      } catch (e) {
        console.log(e);
      }
      if (cellNumber === null) continue;
      moves.push(cellsList[cellNumber]);
    }
    return moves;
  }

  displayMoves() {
    this._moves = [...this.calcMoves()];
    this._moves.forEach((move) => {
      move.showMove();
    });
  }

  removeMoves() {
    this._moves = [...this.calcMoves()];
    this._moves.forEach((move) => {
      move.removeMove();
    });
  }

  getRelativeMoves() {
    let direction = 1;
    if (this.color === BLACK) {
      direction = -1;
    }

    return [
      { row: this._cell.row + direction, col: this._cell.col },
      {
        row: this._cell.row + direction,
        col: this._cell.col + (this._cell.col % 2),
      },
    ];
  }
}
