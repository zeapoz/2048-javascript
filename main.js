import Board from "./board.js"
let board = new Board();

let scoreText = document.getElementById("score");
let resetButton = document.getElementById("restart-button");
let gameOverText = document.getElementById("game-end");

// Keyboard input
document.addEventListener("keydown", function(e) {
    // Clone grid for comparison
    let copy = [];
    for (let i = 0; i < board.grid.length; i++) {
        copy[i] = board.grid[i].value;
    }
    // Move each tile based on input
    switch (e.key) {
        case "ArrowLeft":
            moveLeft(copy);
            break;
        case "ArrowRight":
            moveRight(copy);
            break;
        case "ArrowUp":
            moveUp(copy);
            break;
        case "ArrowDown":
            moveDown(copy);
            break;
        // Debug keys
        case "r":
            this.location.reload();
            break;
        case "s":
            board.addRandomCell();
            break;
    }
});
// Swipe input
document.addEventListener("swiped", function(e) {
    // Clone grid for comparison
    let copy = [];
    for (let i = 0; i < board.grid.length; i++) {
        copy[i] = board.grid[i].value;
    }
    // Move each tile based on input
    switch (e.detail.dir) {
        case "left":
            moveLeft(copy);
            break;
        case "right":
            moveRight(copy);
            break;
        case "up":
            moveUp(copy);
            break;
        case "down":
            moveDown(copy);
            break;
    }
});

function moveLeft(copy) {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            board.moveHorizontally(r, c, 0, -1);
        }
    }
    afterMove(copy);
}

function moveRight(copy) {
    for (let r = 3; r > -1; r--) {
        for (let c = 3; c > -1; c--) {
            board.moveHorizontally(r, c, 3, 1);
        }
    }
    afterMove(copy)
}

function moveUp(copy) {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            board.moveVertically(r, c, 0, -1);
        }
    }
    afterMove(copy)
}

function moveDown(copy) {
    for (let r = 3; r > -1; r--) {
        for (let c = 3; c > -1; c--) {
            board.moveVertically(r, c, 3, 1);
        }
    }
    afterMove(copy)
}

function afterMove(copy) {
    // Check if board has changed
    if (compareGrids(copy)) {
        board.addRandomCell();
        board.resetMerged();
        scoreText.innerHTML = "Score: " + board.calculateScore();
        if (board.isGameOver()) {
            gameOverText.style.display = "block";
            gameOverText.classList.remove("popins");
            gameOverText.offsetWidth;
            gameOverText.classList.add("popins");
        }
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

resetButton.onclick = function() {
    board.reset();
    scoreText.innerHTML = "Score: " + board.calculateScore();
    gameOverText.style.display = "none";
};