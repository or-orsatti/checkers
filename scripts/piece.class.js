class Piece {
    constructor(row, col, color, img) {
        this._row = row;
        this._col = col;
        this._img = document.createElement("img");
        this._img.src = img;
        this._img.classList.add("piece");
        this._color = color;
        this._moves = [];
        this._alive = true;
    }

    get cell() {
        return gm._cells[Cell.getLocation(this._row, this._col)];
    }

    get alive() {
        return this._alive;
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    set row(newRow) {
        this._row = newRow;
    }

    set col(newCol) {
        this._col = newCol;
    }
    get img() {
        return this._img;
    }

    get color() {
        return this._color;
    }

    get opponentColor() {
        return this._color === WHITE ? BLACK : WHITE;
    }

    get moves() {
        return this._moves;
    }

    kill() {
        this.cell.setEmpty();
        this._row = -1;
        this._col = -1;
        this._alive = false;
    }

    get direction() {
        if (this.color === BLACK) return -1;
        return 1;
    }

    /**
     *@function calcMoves calculates the possible moves of a piece.
     * @returns an array of the possible moves;
     */
    calcMoves() {
        let moves = [];
        moves.push(this.checkInDirection(this.row, this.col, -1));
        moves.push(this.checkInDirection(this.row, this.col, 1));
        moves = moves.filter((move) => move !== null);
        return moves;
    }
    /**
     * @function displayMoves calculates the possible moves
     * and display the styles.
     */
    displayMoves() {
        this._moves = [...this.calcMoves()];
        console.log(this._moves);
        this._moves.forEach((move) => {
            move.cell.showMove();
        });
    }
    /**
     * @function removeMoves calculates the possible moves
     * and removes the styles.
     */
    removeMoves() {
        this._moves.forEach((move) => {
            move.cell.removeMove();
        });
    }
    /**
     *function that calculate the next move of a piece.
     * @param {int} row x coordinate
     * @param {int} col y coordinate
     * @param {int} colDirection left or right (1,-1)
     * @param {Piece} piece if theres a piece between (for the recursion)
     * @returns an object containing the destination and the captured piece.
     */
    checkInDirection(row, col, colDirection, piece = null) {
        row = row + this.direction;
        col = col + colDirection;

        const cellLocation = Cell.getLocation(row, col);
        const cell = gm.cells[cellLocation];
        if (Cell.getLocation(row, col) === false) return null;
        if (cell.isOpponment(this.cell))
            return this.checkInDirection(row, col, colDirection, cell.piece);
        if (cell.isOccupied()) return null;
        return { cell: cell, captured: piece };
    }
    /**
     * @function tryMove tries to move a piece to a new cell.
     * @param {Cell} destination cell to move to
     * @returns true if a move was a success, else false.
     */
    tryMove(destination) {
        console.log("moving to ", destination);
        const move = this.moves.find((move) => destination === move.cell);
        if (move) {
            if (move.captured) move.captured.kill();
            this.cell.setEmpty();
            this.removeMoves();
            destination.piece = this;
            return true;
        }
        return false;
    }
}
