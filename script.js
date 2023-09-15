// Récupérez les éléments du DOM
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('buttonStart');
const boxElement = document.querySelector('.box');
const workDurationInput = document.getElementById('workDuration');
const breakDurationInput = document.getElementById('breakDuration');


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
        minutes = parseInt(workDurationInput.value);
        seconds = 0;
        boxElement.textContent = 'Travail';
        startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        updateTimer();
    } else {
        startButton.innerHTML = '<i class="fa-solid fa-stop"></i>';
        minutes = parseInt(isWorking ? workDurationInput.value : breakDurationInput.value);
        seconds = 0;
        boxElement.textContent = isWorking ? 'Travail' : 'Pause';
        timerInterval = setInterval(function () {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
                if (isWorking) {
                    // Si le minuteur est en mode travail, bascule automatiquement en mode pause
                    minutes = parseInt(breakDurationInput.value);
                    boxElement.textContent = 'Pause';
                    isWorking = false;
                    startTimer(); // Démarre automatiquement le minuteur de pause
                } else {
                    // Si le minuteur est en mode pause, bascule automatiquement en mode travail
                    minutes = parseInt(workDurationInput.value);
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
    const initialWorkMinutes = parseInt(workDurationInput.value);
    const initialBreakMinutes = parseInt(breakDurationInput.value);
    const totalWorkSeconds = initialWorkMinutes * 60;
    const totalBreakSeconds = initialBreakMinutes * 60;
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
