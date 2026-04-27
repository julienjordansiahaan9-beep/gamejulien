const wordBank = { level1: ["buku", "meja", "kopi", "bola"], level2: ["belajar", "coding", "komputer", "sekolah"], level3: ["pemrograman", "algoritma", "javascript", "teknologi"], level4: ["infrastruktur", "komunikasi", "dokumentasi"] };
let score = 0, time = 15, level = 1, currentWord, isPlaying = false, timerInterval;
let highScore = localStorage.getItem('typingHighScore') || 0;

const startBtn = document.getElementById('start-game-btn'), welcomeScreen = document.getElementById('welcome-screen');
const wordDisplay = document.getElementById('word-display'), inputField = document.getElementById('input-field');
const scoreDisplay = document.getElementById('score'), timeDisplay = document.getElementById('time'), levelDisplay = document.getElementById('level');
const gameOverPanel = document.getElementById('game-over-panel'), restartBtn = document.getElementById('restart-btn');

function startGame() {
    score = 0; time = 15; level = 1; isPlaying = false;
    scoreDisplay.innerText = score; timeDisplay.innerText = time; levelDisplay.innerText = level;
    inputField.value = ''; inputField.disabled = false;
    welcomeScreen.classList.add('fade-out'); gameOverPanel.classList.add('hidden');
    showNewWord(); inputField.focus();
}

function showNewWord() {
    let pool = level === 1 ? wordBank.level1 : level === 2 ? wordBank.level2 : level === 3 ? wordBank.level3 : wordBank.level4;
    currentWord = pool[Math.floor(Math.random() * pool.length)];
    wordDisplay.innerText = currentWord;
}

function startTimer() {
    isPlaying = true;
    timerInterval = setInterval(() => {
        time--; timeDisplay.innerText = time;
        const timeCard = document.querySelector('.time-card');
        time <= 5 ? timeCard.classList.add('pulse-danger') : timeCard.classList.remove('pulse-danger');
        if (time <= 0) gameOver();
    }, 1000);
}

function gameOver() {
    clearInterval(timerInterval); isPlaying = false; inputField.disabled = true;
    if (score > highScore) { highScore = score; localStorage.setItem('typingHighScore', highScore); }
    document.getElementById('final-score').innerText = score;
    gameOverPanel.classList.remove('hidden');
}

inputField.addEventListener('input', () => {
    if (!isPlaying && inputField.value.length > 0) startTimer();
    if (inputField.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        score++; time += 3; scoreDisplay.innerText = score; inputField.value = '';
        inputField.classList.remove('flash-red');
        if (score % 5 === 0 && level < 4) { level++; levelDisplay.innerText = level; }
        showNewWord();
    } else if (inputField.value.length > 0 && !currentWord.toLowerCase().startsWith(inputField.value.trim().toLowerCase())) {
        inputField.classList.add('flash-red');
        setTimeout(() => inputField.classList.remove('flash-red'), 300);
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);