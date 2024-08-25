// Получаем элементы
const dimaScoreElement = document.getElementById('dima-score');
const denisScoreElement = document.getElementById('denis-score');
const dimaGamesElement = document.getElementById('dima-games');
const denisGamesElement = document.getElementById('denis-games');

// Инициализируем счета и игры
let scores = {
  dima: 0,
  denis: 0
};

let games = {
  dima: 0,
  denis: 0
};

// Загружаем счета и игры из localStorage
loadFromStorage();

// Обновляем отображение
updateScoreDisplay();
updateGamesDisplay();

// Функция добавления очка игроку
function addPoint(player) {
  scores[player]++;
  localStorage.setItem(`${player}Score`, scores[player]);

  updateScoreDisplay();
  speakScore();

  // Проверяем, является ли общий счет кратным 5
  if ((scores.dima + scores.denis) % 5 === 0) {
    playChangeServerSound();
  }

  // Проверяем условия победы
  if (scores[player] >= 11 && Math.abs(scores.dima - scores.denis) >= 2) {
    games[player]++;
    localStorage.setItem(`${player}Games`, games[player]);
    playVictorySound();
    resetScores();
  }
}

// Функция проигрывания звука смены сервера
function playChangeServerSound() {
  document.getElementById('changeServerSound').play();
}

// Функция сброса счетов
function resetScores() {
  scores = {
    dima: 0,
    denis: 0
  };
  localStorage.removeItem('dimaScore');
  localStorage.removeItem('denisScore');
  updateScoreDisplay();
  updateGamesDisplay();
}

// Функция проигрывания звука победы
function playVictorySound() {
  document.getElementById('victorySound').play();
}

// Функция обновления отображения счета
function updateScoreDisplay() {
  dimaScoreElement.innerText = `Дима: ${scores.dima}`;
  denisScoreElement.innerText = `Денис: ${scores.denis}`;
}

// Функция обновления отображения игр
function updateGamesDisplay() {
  dimaGamesElement.innerText = `Дима \n ${games.dima}`;
  denisGamesElement.innerText = `Денис \n ${games.denis}`;
}

// Функция озвучивания счета
function speakScore() {
  const text = `Дима: ${scores.dima}, Денис: ${scores.denis}`;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Функция загрузки счетов и игр из localStorage
function loadFromStorage() {
  scores.dima = parseInt(localStorage.getItem('dimaScore')) || 0;
  scores.denis = parseInt(localStorage.getItem('denisScore')) || 0;
  games.dima = parseInt(localStorage.getItem('dimaGames')) || 0;
  games.denis = parseInt(localStorage.getItem('denisGames')) || 0;
}