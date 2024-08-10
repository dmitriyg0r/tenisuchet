const dimaScoreElement = document.getElementById('dima-score');
const denisScoreElement = document.getElementById('denis-score');
const dimaGamesElement = document.getElementById('dima-games');
const denisGamesElement = document.getElementById('denis-games');

let dimaScore = 0;
let denisScore = 0;
let dimaGames = 0;
let denisGames = 0;

// Проверяем localStorage при загрузке страницы
dimaScore = parseInt(localStorage.getItem('dimaScore')) || 0;
denisScore = parseInt(localStorage.getItem('denisScore')) || 0;
dimaGames = parseInt(localStorage.getItem('dimaGames')) || 0;
denisGames = parseInt(localStorage.getItem('denisGames')) || 0;

updateScoreDisplay();
updateGamesDisplay();

function addPoint(player) {
    if (player === 'dima') {
        dimaScore++;
        localStorage.setItem('dimaScore', dimaScore);
    } else if (player === 'denis') {
        denisScore++;
        localStorage.setItem('denisScore', denisScore);
    }

    updateScoreDisplay();
    speakScore();

    // Проверка на кратность 5
    if ((dimaScore + denisScore) % 5 === 0) {
        playChangeServerSound();
    }

    // Проверка на победу
    if (dimaScore >= 11 && dimaScore - denisScore >= 2) {
        dimaGames++;
        localStorage.setItem('dimaGames', dimaGames);
        playVictorySound();
        resetScores();
    } else if (denisScore >= 11 && denisScore - dimaScore >= 2) {
        denisGames++;
        localStorage.setItem('denisGames', denisGames);
        playVictorySound();
        resetScores();
    }
}

function playChangeServerSound() {
    document.getElementById('changeServerSound').play();
}

function resetScores() {
    dimaScore = 0;
    denisScore = 0;
    localStorage.removeItem('dimaScore');
    localStorage.removeItem('denisScore');
    updateScoreDisplay();
    updateGamesDisplay();
}

function playVictorySound() {
    document.getElementById('victorySound').play();
}

function updateScoreDisplay() {
    dimaScoreElement.innerText = `Дима: ${dimaScore}`;
    denisScoreElement.innerText = `Денис: ${denisScore}`;
}

function updateGamesDisplay() {
    dimaGamesElement.innerText = `Дима \n ${dimaGames}`;
    denisGamesElement.innerText = `Денис \n ${denisGames}`;
}

function speakScore() {
    const text = `Дима: ${dimaScore}, Денис: ${denisScore}`;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}