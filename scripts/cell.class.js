class Cell {
  constructor(row, col, td) {
    this.row = row;
    this.col = Math.floor(col / 2);
    this._td = td;
    this._piece = null;

    this._td.addEventListener("click", () => {
      switch (active) {
        case this:
          this.deactivate();
          this.piece.removeMoves();
          active = null;
          break;
        case null:
          this.activate();
          active = this;
          this.piece.displayMoves();
          break;
        default:
          active.deactivate();
          active.piece.removeMoves();
          this.activate();
          active = this;
          this.piece.displayMoves();
          break;
      }
    });
  }

  get row() {
    return this._row;
  }

  set row(newRow) {
    if (newRow > 7 || newRow < 0) throw "illegal value for col";
    this._row = newRow;
  }

  get col() {
    return this._col;
  }

  set col(newCol) {
    if (newCol > 3 || newCol < 0) throw "illegal value for col";
    this._col = newCol;
  }

  get td() {
    return this._td;
  }

  set td(img) {
    if (img === null) throw "illegal img. use setEmpty to put null.";
    this._td.appendChild(img);
  }

  set piece(newPiece) {
    if (newPiece === null) throw "illegal piece";
    this.td = newPiece.img;
    this._piece = newPiece;
  }

  get piece() {
    return this._piece;
  }

  setEmpty() {
    this.td.innerHTML = "";
    this._piece = null;
  }

  isEmpty() {
    return this.td.innerHTML === "";
  }

  isOccupied() {
    return this.td.innerHTML !== "";
  }

  activate() {
    this.td.classList.add("cell--active");
    this.piece.displayMoves();
  }

  deactivate() {
    this.td.classList.remove("cell--active");
  }

  showMove() {
    this.td.classList.add("cell--move");
  }

  removeMove() {
    this.td.classList.remove("cell--move");
  }

  /**
   * @function getLocation return the location in a 1d array based on the row and colunm
   * @param {Integer} row
   * @param {Integer} col
   * @returns location based on the row and coumn
   */
  static getLocation(row, col) {
    if (col < 0 || col > 3) throw ("illegal value for col: ", col);
    if (row < 0 || row > 7) throw ("illegal value for row: ", row);

    return row * 4 + col;
  }
}