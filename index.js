//  1. when clicking on any square show either X or O based on who's turn it is and update player's turn display
//  2. determine when the game ends, check to see if the squares match to a winning solution
//  3. end game phase, show restart button, reset board

const playerTurnEl = document.getElementById("player-turn");
const squareEl = document.querySelectorAll(".square");
const restartButtonEl = document.getElementById("restart-button");

const boardSize = 3;
let player1Turn = true;
let moveCount = 0;
gameOver = false;

let player1Array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let player2Array = [0, 0, 0, 0, 0, 0, 0, 0, 0];

restartButtonEl.addEventListener("click", restartGame);

squareEl.forEach((square, i) => { // adds event listeners to each square and calls "makeMove()" when clicked
    square.addEventListener("click", () => {
        makeMove(square, i);

    })
})

function makeMove(square, i) { // function called everytime a square is clicked, passed in each square that is clicked
    console.log("made move", moveCount);
    moveCount++; // increments move count to use to check tie game (all squares clicked)

    square.disabled = true; // disables current square

    if (player1Turn) {
        player1Array[i] = 1;
    } else {
        player2Array[i] = 1;
    }

    square.innerText = player1Turn ? "X" : "O"; //writes X or O to square
    player1Turn = !player1Turn; //switches players turn

    if (player1Turn && !gameOver) {
        playerTurnEl.innerText = "Player 1's Turn";
    } else {
        playerTurnEl.innerText = "Player 2's Turn";
    }

    // checks for tie game if all squares filled
    if (moveCount >= boardSize * boardSize) {
        playerTurnEl.innerText = "Tie Game";
        restartButtonEl.style.display = "block";
        moveCount = 0;
        gameOver = true;
    }

    checkWinningMove();

}

function checkWinningMove() { // functions checks in squares array matches winning array
    console.log("checked winning move");
    console.log(player1Array);

    if (JSON.stringify(player1Array) === JSON.stringify([1, 1, 1, 0, 0, 0, 0, 0, 0]) ||
        JSON.stringify(player1Array) === JSON.stringify([0, 0, 0, 1, 1, 1, 0, 0, 0]) ||
        JSON.stringify(player1Array) === JSON.stringify([1, 1, 1, 0, 0, 0, 1, 1, 1]) ||
        JSON.stringify(player1Array) === JSON.stringify([0, 0, 1, 0, 0, 1, 0, 0, 1]) ||
        JSON.stringify(player1Array) === JSON.stringify([0, 1, 0, 0, 1, 0, 0, 1, 0]) ||
        JSON.stringify(player1Array) === JSON.stringify([1, 0, 0, 1, 0, 0, 1, 0, 0]) ||
        JSON.stringify(player1Array) === JSON.stringify([1, 0, 0, 0, 1, 0, 0, 0, 1]) ||
        JSON.stringify(player1Array) === JSON.stringify([0, 0, 1, 0, 1, 0, 1, 0, 0])) {
        playerTurnEl.innerText = "Player 1 WON!";
        squareEl.forEach(square => {
            square.disabled = true;
        })
        restartButtonEl.style.display = "block";
        player1Array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        player2Array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        gameOver = true;
    } else if (JSON.stringify(player2Array) === JSON.stringify([1, 1, 1, 0, 0, 0, 0, 0, 0]) ||
        JSON.stringify(player2Array) === JSON.stringify([0, 0, 0, 1, 1, 1, 0, 0, 0]) ||
        JSON.stringify(player2Array) === JSON.stringify([1, 1, 1, 0, 0, 0, 1, 1, 1]) ||
        JSON.stringify(player2Array) === JSON.stringify([0, 0, 1, 0, 0, 1, 0, 0, 1]) ||
        JSON.stringify(player2Array) === JSON.stringify([0, 1, 0, 0, 1, 0, 0, 1, 0]) ||
        JSON.stringify(player2Array) === JSON.stringify([1, 0, 0, 1, 0, 0, 1, 0, 0]) ||
        JSON.stringify(player2Array) === JSON.stringify([1, 0, 0, 0, 1, 0, 0, 0, 1]) ||
        JSON.stringify(player2Array) === JSON.stringify([0, 0, 1, 0, 1, 0, 1, 0, 0])) {
        playerTurnEl.innerText = "Player 2 WON!";
        squareEl.forEach(square => {
            square.disabled = true;
        })
        restartButtonEl.style.display = "block";
        player1Array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        player2Array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        gameOver = true;
    }
}

function restartGame() {
    console.log("restarted game")

    moveCount = 0;

    // sets all squares to empty and reenabled square bottons
    squareEl.forEach(square => {
        square.innerText = "";
        square.disabled = false;
    })

    playerTurnEl.innerText = "Player 1's Turn";
    restartButtonEl.style.display = "none";
}