const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const timerText = document.getElementById('timerText');
const timerBar = document.getElementById('timerBar'); // Added for visual effect
const turnIndicator = document.getElementById('currentPlayerSymbol');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'O'; 
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let timer;
let timeLeft = 15;

const scores = { O: 0, X: 0, Draw: 0 };

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const playSound = (type) => {
    console.log(`Sound Effect: ${type}`);
};

// --- NAVIGATION LOGIC ---
// This handles the gear icon click if you don't use the inline onclick
document.querySelector('.icon-btn').addEventListener('click', () => {
    window.location.href = 'setting.html';
});

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerText.innerText = timeLeft;
    
    // Reset timer bar animation
    if(timerBar) {
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';
    }

    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;
        
        // Visual shrinking effect for the timer
        if(timerBar) {
            timerBar.style.transition = 'linear 1s';
            timerBar.style.width = `${(timeLeft / 15) * 100}%`;
        }

        if (timeLeft <= 0) {
            switchPlayer();
        }
    }, 1000);
}

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== "" || !gameActive) return;

    makeMove(clickedCell, clickedIndex);
}

function makeMove(cell, index) {
    gameState[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    playSound('click');
    checkResult();
}

function switchPlayer() {
    if (!gameActive) return;
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    turnIndicator.innerText = currentPlayer;
    turnIndicator.className = `${currentPlayer.toLowerCase()}-symbol`;
    startTimer();
}

function checkResult() {
    let roundWon = false;
    let winningLine = [];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winningLine = condition;
            break;
        }
    }

    if (roundWon) {
        endGame('win', winningLine);
        return;
    }

    if (!gameState.includes("")) {
        endGame('draw');
        return;
    }

    switchPlayer();
}

function endGame(status, line = []) {
    gameActive = false;
    clearInterval(timer);

    if (status === 'win') {
        playSound('win');
        line.forEach(index => cells[index].classList.add('winning-cell'));
        scores[currentPlayer]++;
        document.getElementById(`score${currentPlayer}`).innerText = scores[currentPlayer];
    } else {
        playSound('draw');
        scores.Draw++;
        document.getElementById('scoreDraw').innerText = scores.Draw;
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'O';
    gameState = ["", "", "", "", "", "", "", "", ""];
    turnIndicator.innerText = "O";
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winning-cell');
    });
    startTimer();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', restartGame);

// Initial Start
startTimer();