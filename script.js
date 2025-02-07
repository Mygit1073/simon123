const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let topScore = localStorage.getItem("topScore") || 0;
let started = false;

const startButton = document.getElementById("start");
const statusText = document.getElementById("status");
const scoreText = document.getElementById("score");
const topScoreText = document.getElementById("top-score");
const buttons = document.querySelectorAll(".button");

// Initialize top score
topScoreText.textContent = `Top Score: ${topScore}`;

// Function to start the game
startButton.addEventListener("click", startGame);

function startGame() {
    gameSequence = [];
    userSequence = [];
    level = 0;
    started = true;
    statusText.textContent = "Watch the sequence!";
    nextRound();
}

// Function to generate the next round
function nextRound() {
    userSequence = [];
    level++;
    scoreText.textContent = `Score: ${level - 1}`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    playSequence();
}

// Function to play the sequence
function playSequence() {
    let delay = 500;
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color);
        }, delay * (index + 1));
    });
}

// Function to flash a button
function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 300);
}

// Handle user input
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (!started) return;
        const clickedColor = e.target.id;
        userSequence.push(clickedColor);
        flashButton(clickedColor);
        checkAnswer(userSequence.length - 1);
    });
});

// Function to check user input
function checkAnswer(index) {
    if (userSequence[index] !== gameSequence[index]) {
        endGame();
        return;
    }
    
    if (userSequence.length === gameSequence.length) {
        setTimeout(nextRound, 1000);
    }
}

// Function to handle game over
function endGame() {
    statusText.textContent = "Game Over! Press Start to Play Again";
    started = false;

    if (level - 1 > topScore) {
        topScore = level - 1;
        localStorage.setItem("topScore", topScore);
    }

    topScoreText.textContent = `Top Score: ${topScore}`;
    scoreText.textContent = `Score: 0`;
}


function checkUserInput(userInput, pattern) {
    return JSON.stringify(userInput) === JSON.stringify(pattern);
}

function generateSequence(length) {
    const colors = ["green", "red", "yellow", "blue"];
    let sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return sequence;
}

// Export functions for testing
module.exports = { checkUserInput, generateSequence };

