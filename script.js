// Récupérez les éléments du DOM
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('buttonStart');
const boxElement = document.querySelector('.box');


let timerInterval;
let minutes = 0;
let seconds = 15;
let isWorking = true; // Indicateur pour suivre si le minuteur est en mode travail ou pause

// Fonction pour mettre à jour l'affichage du minuteur
function updateTimer() {
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer ou annuler le minuteur
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        isWorking = true;
        minutes = 0;
        seconds = 15;
        startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        updateTimer();
    } else {
        startButton.innerHTML = '<i class="fa-solid fa-stop"></i>';
        if (minutes === 0 && seconds === 0) {
            // Si le minuteur est en mode travail ou pause et se termine, bascule automatiquement en mode travail
            minutes = 0;
            seconds = 15;
            isWorking = true;
        }
        if (isWorking) {
            // Met à jour le texte "Travail" si le minuteur est en mode travail
            boxElement.textContent = 'Travail';
        } else {
            // Met à jour le texte "Travail" immédiatement avant de démarrer l'intervalle
            boxElement.textContent = 'Pause';
        }
        timerInterval = setInterval(function () {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
                if (isWorking) {
                    // Si le minuteur est en mode travail, bascule automatiquement en mode pause
                    minutes = 0;
                    seconds = 5;
                    isWorking = false;
                    startTimer(); // Démarre automatiquement le minuteur de pause
                } else {
                    // Si le minuteur est en mode pause, bascule automatiquement en mode travail
                    minutes = 0;
                    seconds = 15;
                    isWorking = true;
                    startTimer(); // Démarre automatiquement le minuteur de travail
                }
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
