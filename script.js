// Récupérez les éléments du DOM
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('button');
const boxElement = document.querySelector('.box');


let timerInterval;
let minutes = 0;
let seconds = 10;
let isWorking = false; // Indicateur pour suivre si le minuteur est en mode travail ou pause

// Fonction pour mettre à jour l'affichage du minuteur
function updateTimer() {
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer ou annuler le minuteur
function startTimer() {
    if (isWorking) {
        clearInterval(timerInterval);
        isWorking = false;
        startButton.innerHTML = '<i class="fa-solid fa-play"></i>'; // Changez le texte ou l'icône du bouton pour indiquer le démarrage
        boxElement.textContent = 'Pause';
    } else {
        isWorking = true;
        startButton.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Changez le texte ou l'icône du bouton pour indiquer l'arrêt
        if(minutes === 0 && seconds === 0){
            minutes = 25;
            seconds = 0;
            boxElement.textContent = 'Pause';
        } else {
            boxElement.textContent = 'Travail';
        }
        timerInterval = setInterval(function () {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                isWorking = !isWorking;
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
