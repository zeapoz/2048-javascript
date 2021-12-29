import Board from "./board.js"
let board = new Board();

let score_text = document.getElementById("score");

document.addEventListener("keydown", function(e) {
    // Clone grid for comparison
    let copy = [];
    for (let i = 0; i < board.grid.length; i++) {
        copy[i] = board.grid[i].value;
    }
    // Move each tile based on input
    switch (e.key) {
        case "ArrowLeft":
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    board.moveHorizontally(r, c, 0, -1);
                }
            }
            afterMove(copy);
            break;
        case "ArrowRight":
            for (let r = 3; r > -1; r--) {
                for (let c = 3; c > -1; c--) {
                    board.moveHorizontally(r, c, 3, 1);
                }
            }
            afterMove(copy)
            break;
        case "ArrowUp":
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    board.moveVertically(r, c, 0, -1);
                }
            }
            afterMove(copy)
            break;
        case "ArrowDown":
            for (let r = 3; r > -1; r--) {
                for (let c = 3; c > -1; c--) {
                    board.moveVertically(r, c, 3, 1);
                }
            }
            afterMove(copy)
            break;
        case "r":
            this.location.reload();
            break;
    }
});

function afterMove(copy) {
    // Check if board has changed
    if (compareGrids(copy)) {
        board.addRandomCell();
        board.resetMerged();
        score_text.innerHTML = "Score: " + board.calculateScore();
    }
}

function compareGrids(copy) {
    for (let i = 0; i < board.grid.length; i++) {
        if (board.grid[i].value != copy[i]) {
            return true;
        }
    }
    return false;
}
