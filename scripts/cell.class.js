class Cell {
    constructor(row, col, td) {
        this._row = row;
        this._col = col;
        this._td = td;
        this._piece = null;

        this._td.addEventListener("click", () => {
            if (!gm.active) this.activateCell();
            else this.takeAction();
        });
    }
    /**
     * @function activateCell() - doing the first click on the board.
     * when nothing is activated yet.
     */
    activateCell() {
        if (this.isEmpty()) return;
        if (this.piece.color !== gm.turnColor) return;
        gm.active = this;
    }
    /**
     * @function takeAction() - after the first click, user can take action by moving.
     * this function handles that.
     */
    takeAction() {
        if (this === gm.active) gm.removeActive();
        else if (gm.active.isOpponment(this)) {
            gm.removeActive();
        } else if (this.isOccupied()) {
            gm.removeActive();
            gm.active = this;
        } else {
            let action = gm.active.piece.tryMove(this);
            if (action === 0) return; // illegal move.
            gm.removeActive();
            gm.changeTurn();
        }
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
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
        this._piece.row = this.row;
        this._piece.col = this.col;
    }

    get piece() {
        return this._piece;
    }

    setEmpty() {
        this.td.innerHTML = "";
        const p = this._piece;
        this._piece = null;
        return p;
    }

    isEmpty() {
        return this.td.innerHTML === "";
    }

    isOccupied() {
        return this.td.innerHTML !== "";
    }

    isOpponment(cell) {
        return (
            this.isOccupied() &&
            cell.isOccupied() &&
            this.piece.color !== cell.piece.color
        );
    }

    activate() {
        this.td.classList.add("cell--active");
        if (this.isOccupied()) this.piece.displayMoves();
    }

    deactivate() {
        this.td.classList.remove("cell--active");
        if (this.isOccupied()) this.piece.removeMoves();
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
        if (col < 0 || col > 7) return false;
        if (row < 0 || row > 7) return false;

        return row * 4 + Math.floor(col / 2);
    }
}
