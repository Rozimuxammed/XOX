let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let gameMode = "player";

function startGame(mode) {
    gameMode = mode;
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("mode-selection").style.display = "none";
    document.getElementById("game-board").classList.remove("hidden");
    updateBoard();
    document.getElementById("status").innerText = `Navbat: ${currentPlayer}`;
}

function makeMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    updateBoard();

    if (checkWinner()) {
        document.getElementById("status").innerText = `${currentPlayer} yutdi!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText = "Durrang!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = `Navbat: ${currentPlayer}`;

    if (gameMode === "computer" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

    for (let i of emptyCells) {
        board[i] = "O";
        if (checkWinner()) {
            updateBoard();
            gameActive = false;
            document.getElementById("status").innerText = "O yutdi!";
            return;
        }
        board[i] = "";
    }

    for (let i of emptyCells) {
        board[i] = "X";
        if (checkWinner()) {
            board[i] = "O";
            updateBoard();
            currentPlayer = "X";
            document.getElementById("status").innerText = `Navbat: ${currentPlayer}`;
            return;
        }
        board[i] = "";
    }

    if (board[4] === "") {
        board[4] = "O";
    } else {
        let corners = emptyCells.filter(i => [0, 2, 6, 8].includes(i));
        if (corners.length > 0) {
            board[corners[Math.floor(Math.random() * corners.length)]] = "O";
        } else {
            board[emptyCells[Math.floor(Math.random() * emptyCells.length)]] = "O";
        }
    }

    updateBoard();

    if (checkWinner()) {
        document.getElementById("status").innerText = "O yutdi!";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText = "Durrang!";
        gameActive = false;
        return;
    }

    currentPlayer = "X";
    document.getElementById("status").innerText = `Navbat: ${currentPlayer}`;
}


function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.innerText = board[index];
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        let [a, b, c] = pattern;
        return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
    });
}

function resetGame() {
    document.getElementById("mode-selection").style.display = "flex";
    document.getElementById("game-board").classList.add("hidden");
}