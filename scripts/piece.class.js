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

  /**
   *@function calcMoves calculates the possible moves of a piece.
   * @returns an array of the possible moves;
   */
  calcMoves() {
    const relativeMoves = this.getRelativeMoves();
    const moves = [];
    for (const relativeMove of relativeMoves) {
      let cellNumber = null;
      try {
        cellNumber = Cell.getLocation(relativeMove.row, relativeMove.col);
      } catch (e) {}
      if (cellNumber === null) continue;
      moves.push(cellsList[cellNumber]);
    }
    return moves;
  }
  /**
   * @function displayMoves calculates the possible moves
   * and display the styles.
   */
  displayMoves() {
    this._moves = [...this.calcMoves()];
    this._moves.forEach((move) => {
      move.showMove();
    });
  }
  /**
   * @function removeMoves calculates the possible moves
   * and removes the styles.
   */
  removeMoves() {
    this._moves = [...this.calcMoves()];
    this._moves.forEach((move) => {
      move.removeMove();
    });
  }
  /**
   * @function getRelativeMoves return all the possible moves relative to the currect location
   * @returns {Array<>} all possible relative moves
   */
  getRelativeMoves() {
    let rowDirection = 1;
    let colDirection = 1;
    if (this.color === BLACK) {
      //flip the calc
      rowDirection = -1;
    }

    if (this._cell.row % 2 !== 0) {
      // bacause im calulating based only on the black cells
      colDirection = -1;
    }

    return [
      { row: this._cell.row + rowDirection, col: this._cell.col },
      {
        row: this._cell.row + rowDirection,
        col: this._cell.col + colDirection,
      },
    ];
  }
}
