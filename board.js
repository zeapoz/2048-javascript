import Cell from "./cell.js";

export default class Board {
    constructor() {
        this.grid = [];
        this.generateCells();
        this.addRandomCell();
        this.addRandomCell();
    }

    generateCells() {
        let container = document.getElementById("grid-container");
        for (let r = 0; r < 4; r++) {
            let row = document.createElement("div");
            row.className = "row";
            row.id = r;
            container.appendChild(row);
            for (let c = 0; c < 4; c++) {
                // Cell html
                let box = document.createElement("div");
                box.className = "cell";
                row.appendChild(box);
                // Text
                let text = document.createElement("p");
                text.innerHTML = "";
                box.appendChild(text);
                // Cell object
                let cell = new Cell(c, r, text);
                this.grid = this.grid.concat(cell);
            }
        }
    }

    moveHorizontally(r, c, edge, offset) {
        if (c == edge) {
            return;
        }
        let index = this.calculateIndex(r, c);
        let other = index + offset;
        let value = this.grid[index].value;
        // Empty cell
        if (this.grid[other].value < 2) {
            this.grid[other].updateValue(value);
            this.grid[index].updateValue(0);
            this.moveHorizontally(r, c + offset, edge, offset);
        // Merge same numbered cells
        } else if (!this.grid[other].merged && this.grid[other].value == value) {
            this.grid[other].updateValue(value*2);
            this.grid[other].merged = true;
            this.grid[index].updateValue(0);
        }
    }

    moveVertically(r, c, edge, offset) {
        if (r == edge) {
            return;
        }
        let index = this.calculateIndex(r, c);
        let other = index + offset * 4;
        let value = this.grid[index].value;
        // Empty cell
        if (this.grid[other].value < 2) {
            this.grid[other].updateValue(value);
            this.grid[index].updateValue(0);
            this.moveVertically(r + offset, c, edge, offset);
        // Merge same numbered cells
        } else if (!this.grid[other].merged && this.grid[other].value == value) {
            this.grid[other].updateValue(value*2);
            this.grid[other].merged = true;
            this.grid[index].updateValue(0);
        }
    }

    isGameOver() {
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i].value < 2) {
                return false;
            }
        }
        // Check if moves can be made
        return true;
    }

    resetMerged() {
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i].merged = false;
        }
    }

    calculateScore() {
        let sum = 0;
        for (let i = 0; i < this.grid.length; i++) {
            sum += this.grid[i].value;
        }
        return sum;
    }

    addRandomCell() {
        let r = Math.floor(Math.random() * 4);
        let c = Math.floor(Math.random() * 4);
        let index = this.calculateIndex(r, c);
        if (this.grid[index].value > 0) {
            this.addRandomCell();
            return;
        }
        let value = 2;
        if (Math.random() >= 0.9) {
            value = 4;
        }
        this.grid[index].updateValue(value);
        this.grid[index].text.parentElement.classList.remove("popin");
        this.grid[index].text.parentElement.offsetWidth;
        this.grid[index].text.parentElement.classList.add("popin");
    }

    calculateIndex(r, c) {
        return c + r*4;
    }
}
