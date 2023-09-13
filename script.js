// Récupérez les éléments du DOM
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('button');

let timerInterval;
let minutes = 25;
let seconds = 0;
let isRunning = false;

// Fonction pour mettre à jour l'affichage du minuteur
function updateTimer() {
  timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer le minuteur
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.disabled = true;
    timerInterval = setInterval(function() {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        startButton.disabled = false;
        // Redémarrez automatiquement le minuteur à la fin du temps (25 minutes)
        minutes = 25;
        seconds = 0;
        updateTimer();
        startTimer();
      } else {
        if (seconds === 0) {
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
        updateTimer();
      }
    }, 1000);
  }
}

// Écouteur d'événement pour le bouton de démarrage
startButton.addEventListener('click', startTimer);
