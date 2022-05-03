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

        if (this.checkForJumps(moves)) moves = this.filterJumps(moves);
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
     *  @function checkForJumps checks if a piece has  capture/jump move
     * @param {Array<Cell>} moves - default is the moves of the player
     * @returns if there is a capture/jump move -true, else - false;
     */
    checkForJumps(moves = this._moves) {
        return moves.find((move) => move.captured !== null) ? true : false;
    }

    /**
     *  @function filterJumps return only the moves with jumps/captures
     * @param {Array<Cell>} moves - default is the moves of the player
     * @returns {Array<Cell>} the new array of moves
     */
    filterJumps(moves = this._moves) {
        return moves.filter((move) => move.captured !== null);
    }
    /**
     *function that calculate the next move of a piece.
     * @param {int} row x coordinate
     * @param {int} col y coordinate
     * @param {int} colDirection left or right (1,-1)
     * @param {Piece} piece if theres a piece between (for the recursion)
     * @returns an object containing the destination and the captured piece.
     */
    checkInDirection(
        row,
        col,
        colDirection,
        rowDirection = this.direction,
        piece = null
    ) {
        row = row + rowDirection;
        col = col + colDirection;
        const cellLocation = Cell.getLocation(row, col);
        const cell = gm.cells[cellLocation];

        if (Cell.getLocation(row, col) === false) return null; // if location doesnt exist (should not occur)
        if (cell.isOpponment(this.cell) && !piece)
            // if theres a player in the checked cell, call this function again with the cell after it
            return this.checkInDirection(
                row,
                col,
                colDirection,
                rowDirection,
                cell.piece
            );
        if (cell.isOccupied()) return null; //if team member is in the cell
        return { cell: cell, captured: piece }; //if no if has activated, return the cell and the piece (if it can eat)
    }

    /**
     * @function tryMove tries to move a piece to a new cell.
     * @param {Cell} destination cell to move to
     * @returns 1 or 2 if a move was a success, else 0.
     */
    tryMove(destination) {
        let type = 0;
        const move = this.moves.find((move) => destination === move.cell);
        if (move) {
            this.cell.setEmpty();
            destination.piece = this;
            this.removeMoves();
            type++;
            if (move.captured) {
                move.captured.kill();
                type++;
            }
        }
        return type;
    }
}
