class Modal {
    constructor(text = "", btnText = "") {
        this._text = text;
        this._btnText = btnText;

        const containerEl = document.querySelector(".container");

        const modalEl = document.createElement("div");
        const modalContentEl = document.createElement("div");
        const btnEl = document.createElement("button");
        const textEl = document.createElement("p");
        this.btn = btnEl;
        modalEl.classList.add("modal");
        modalContentEl.classList.add("modal__content");
        btnEl.classList.add("btn");
        textEl.classList.add("text");

        btnEl.textContent = this._btnText;
        textEl.textContent = this._text;
        btnEl.addEventListener("click", () => {
            modalEl.classList.remove("modal--active");
        });

        modalContentEl.appendChild(textEl);
        modalContentEl.appendChild(btnEl);
        modalEl.appendChild(modalContentEl);
        containerEl.appendChild(modalEl);
        this._modal = modalEl;
    }

    set text(newText) {
        this._text = newText;
        this._modal.querySelector(".text").textContent = this._text;
    }

    get text() {
        return this._text;
    }
    set btnText(newBtnText) {
        this._btnText = newBtnText;
        this._modal.querySelector(".btn").textContent = this._text;
    }

    get btnText() {
        return this._btnText;
    }

    display() {
        this._modal.classList.add("modal--active");
    }
}
