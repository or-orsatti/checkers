class GameManager {
    constructor() {
        this._cells = this.initGame();
        this._pieces = this.initPieces();
        this.turnColor = WHITE;
        this._active = null;
        this.modal = new Modal("", "restart");
        this.modal.btn.addEventListener("click", () => {
            this._pieces = this.initPieces();
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

    setActiveForMove() {}

    removeActive() {
        this._active.deactivate();
        this._active = null;
    }

    changeTurn() {
        this.turnColor = this.turnColor === WHITE ? BLACK : WHITE;
        if (this.checkWinCondition()) {
            this.modal.text = `${this.turnColor} has lost!`;
            this.modal.display();
        }
    }

    checkWinCondition() {
        const sameColoredPieces = this.turnPiecesList;
        const livePiece = sameColoredPieces.find((piece) => piece.alive);
        if (!livePiece) return true;

        if (
            sameColoredPieces.find(
                (piece) => piece.alive && piece !== livePiece
            )
        )
            return false;

        if (!this.checkIfHaveMoves(livePiece)) return true;
        return false;
    }

    checkIfHaveMoves(piece) {
        return piece.calcMoves().length !== 0;
    }

    get turnPiecesList() {
        return this.pieces.filter(
            (piece) => piece.color === this.turnColor && piece.cell
        );
    }

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
}
