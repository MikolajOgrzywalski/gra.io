const gameImage = document.querySelector('.game-image');
const rectangle = document.querySelector('.rectangle');
const scoreCounter = document.querySelector('#score-counter');
const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#start-button');

let score = 0;
let timeRemaining = 90; // Czas w sekundach
let gameStarted = false; // Zmienna przechowująca informację, czy gra została rozpoczęta

gameImage.addEventListener('click', () => {
  if (gameStarted) {
    score++;
    scoreCounter.textContent = score;

    console.log(`Twój aktualny wynik: ${score}`);

    const rectangleWidth = rectangle.offsetWidth;
    const rectangleHeight = rectangle.offsetHeight;
    const imageWidth = gameImage.offsetWidth;
    const imageHeight = gameImage.offsetHeight;

    const maxRandomX = rectangleWidth - imageWidth - 20; // Ograniczenie od lewej i prawej krawędzi
    const maxRandomY = rectangleHeight - imageHeight - 20; // Ograniczenie od górnej i dolnej krawędzi

    const randomX = Math.floor(Math.random() * maxRandomX) + 40; // Minimalny margines od lewej krawędzi
    const randomY = Math.floor(Math.random() * maxRandomY) + 40; // Minimalny margines od górnej krawędzi

    gameImage.style.left = `${randomX}px`;
    gameImage.style.top = `${randomY}px`;


}});

gameImage.addEventListener('mouseover', () => {
  gameImage.style.cursor = 'pointer';
});

function resetGame() {
  score = 0;
  scoreCounter.textContent = score;
  timeRemaining = 90;
  gameStarted = false;
  startButton.disabled = false;
  gameImage.style.left = '';
  gameImage.style.top = '';
  timerDisplay.textContent = '1:30';
  timerDisplay.style.color = 'black';
}

function startTimer() {
  gameStarted = true;
  startButton.disabled = true; // Wyłączamy przycisk "Start" po rozpoczęciu gry

  const interval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (timeRemaining === 10) {
      timerDisplay.style.color = 'red';
    }

    if (timeRemaining === 0) {
      clearInterval(interval);
      alert('Koniec czasu! Jeśli chcesz zacząć grę od nowa kliknij START');
      resetGame();
    } else {
      timeRemaining--;
    }
  }, 1000);
}

startButton.addEventListener('click', startTimer);
