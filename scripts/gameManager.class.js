class GameManager {
    constructor() {
        this._cells = this.initGame();
        this._pieces = this.initPieces();
        this.turnColor = WHITE;
        this._active = null;
        this.modal = new Modal("", "restart");
        this.modal.btn.addEventListener("click", () => {
            gm.removeGame();
            const bodyEl = document.body;
            this._cells = this.initGame();
            this._pieces = this.initPieces();
            bodyEl.classList.remove("bg--dark");
            this.turnColor = WHITE;
        });
    }

    get cells() {
        return this._cells;
    }

    get pieces() {
        return this._pieces;
    }

    get active() {
        return this._active;
    }

    set active(newActive) {
        this._active = newActive;
        this._active.activate();
    }

    removeActive() {
        this._active.deactivate();
        this._active = null;
    }
    /**
     * @function changeTurn changes turn and checking winning condition.
     */
    changeTurn() {
        this.turnColor = this.turnColor === WHITE ? BLACK : WHITE;
        const bodyEl = document.querySelector("body");
        bodyEl.classList.toggle("bg--dark");
        if (this.checkIfColorLost()) {
            this.modal.text = `${
                this.turnColor === WHITE ? BLACK : WHITE
            } has won!`;
            this.modal.display();
        }
    }
    /**
     * @function checkIfColorLost checks if theres no more players from the
     * turn color or if all of them dont have moves.
     * @returns {Boolean} true - if the current color lost. else - false.
     */
    checkIfColorLost() {
        const sameColoredPieces = this.turnPiecesList;

        console.log(
            "check win con:",
            sameColoredPieces.find((piece) => piece.calcMoves().length)
        );
        if (!sameColoredPieces.length) return true; //no piece is alive

        if (!sameColoredPieces.find((piece) => piece.calcMoves().length))
            return true; // check if some piece has moves

        return false;
    }
    /**
     *@returns {Array<Piece>} array with pieces with the same color as the turn color
     */
    get turnPiecesList() {
        return this.pieces.filter(
            (piece) => piece.color === this.turnColor && piece.alive
        );
    }
    /**
     * @function initGame() initates the game board and creates a list of all the cells.
     * @returns {Array<Cell>} array of the black cells on the board.
     */
    initGame() {
        const containerEl = document.querySelector(".container");
        const tableEl = document.createElement("table");
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
    /**
     * @function initPieces initates all the pieces on the board.
     * @returns {Array<Piece>} array with all the pieces on the board.
     */
    initPieces() {
        const pieces = [];
        for (let i = 0; i < this._cells.length; i++) {
            const element = this._cells[i];
            let color = "";

            if (element.row === 3 || element.row === 4) continue;

            if (element.row < 3) {
                color = WHITE;
            }

            if (element.row > 4) {
                color = BLACK;
            }

            const piece = new Piece(
                element.row,
                element.col,
                color,
                `../imgs/basic-${color}.png`
            );
            this._cells[Cell.getLocation(element.row, element.col)].piece =
                piece;
            pieces.push(piece);
        }

        return pieces;
    }

    removeGame() {
        const containerEl = document.querySelector(".container");
        const table = document.querySelector(".chessboard");
        containerEl.removeChild(table);
    }
}
