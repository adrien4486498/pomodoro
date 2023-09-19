// Récupérez les éléments du DOM
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('buttonStart');
const boxElement = document.querySelector('.box');
const workMinutesInput = document.getElementById('workMinutes');
const workSecondsInput = document.getElementById('workSeconds');
const breakMinutesInput = document.getElementById('breakMinutes');
const breakSecondsInput = document.getElementById('breakSeconds');



let timerInterval;
let minutes = 0;
let seconds = 0;
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
        minutes = parseInt(workMinutesInput.value);
        seconds = parseInt(workSecondsInput.value);
        boxElement.textContent = 'Travail';
        startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        updateTimer();
        updateLine(); // Réinitialise la ligne de progression
    } else {
        startButton.innerHTML = '<i class="fa-solid fa-stop"></i>';
        minutes = parseInt(isWorking ? workMinutesInput.value : breakMinutesInput.value);
        seconds = parseInt(isWorking ? workSecondsInput.value : breakSecondsInput.value);
        boxElement.textContent = isWorking ? 'Travail' : 'Pause';
        timerInterval = setInterval(function () {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
                if (isWorking) {
                    // Si le minuteur est en mode travail, bascule automatiquement en mode pause
                    minutes = parseInt(breakMinutesInput.value);
                    seconds = parseInt(breakSecondsInput.value);
                    boxElement.textContent = 'Pause';
                    isWorking = false;
                    startTimer(); // Démarre automatiquement le minuteur de pause
                } else {
                    // Si le minuteur est en mode pause, bascule automatiquement en mode travail
                    minutes = parseInt(workMinutesInput.value);
                    seconds = parseInt(workSecondsInput.value);
                    boxElement.textContent = 'Travail';
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
                updateLine();
            }
        }, 1000);
    }
}

// Fonction pour mettre à jour la largeur de la ligne en fonction du temps restant
function updateLine() {
    const totalSeconds = minutes * 60 + seconds;
    const initialWorkMinutes = parseInt(workMinutesInput.value);
    const initialWorkSeconds = parseInt(workSecondsInput.value);
    const initialBreakMinutes = parseInt(breakMinutesInput.value);
    const initialBreakSeconds = parseInt(breakSecondsInput.value);
    const totalWorkSeconds = initialWorkMinutes * 60 + initialWorkSeconds;
    const totalBreakSeconds = initialBreakMinutes * 60 + initialBreakSeconds;
    const maxWidth = 100; // Largeur maximale en pourcentage (100%)

    let currentWidth = 0;

    if (isWorking) {
        currentWidth = ((totalWorkSeconds - totalSeconds) / totalWorkSeconds) * maxWidth;
    } else {
        currentWidth = ((totalBreakSeconds - totalSeconds) / totalBreakSeconds) * maxWidth;
    }

    document.querySelector('.line').style.width = `${currentWidth}%`;
}



// Écouteur d'événement pour le bouton de démarrage
startButton.addEventListener('click', startTimer);
