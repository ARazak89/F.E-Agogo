// Déclaration de variables
let targetTime;  // Stocke l'heure cible du minuteur
let intervalId;  // Identifiant de l'intervalle pour la mise à jour du minuteur
let timeSet;     // Stocke la durée du minuteur en secondes

// Sélection des éléments HTML par ID et classe
const tbMinutes = document.getElementById('minutes');  // Champ de texte pour entrer la durée en minutes
const timer = document.getElementById('timer');        // Élément pour afficher le minuteur
const endTime = document.getElementById('endTime');    // Élément pour afficher l'heure de fin
const chrono = document.querySelector('.chrono');      // Élément avec la classe 'chrono'

// Ajout d'un gestionnaire d'événements pour la touche 'Enter' dans le champ de texte
tbMinutes.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const minutes = parseInt(tbMinutes.value, 10); // Conversion de la valeur en minutes en nombre entier
    minuteToSecond(minutes); // Appel de la fonction pour démarrer le minuteur
    //document.getElementsByClassName('minutes');  Note : Cette ligne ne semble pas avoir d'effet
  }
})

// Fonction pour ajouter des minutes à une date
function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

// Fonction pour ajouter des secondes à une date
function addSecond(date, secondes) {
  date.setSeconds(date.getSeconds() + secondes);
  return date;
}

// Fonction pour convertir des minutes en secondes et démarrer le minuteur
function minuteToSecond(timeSet) {
  timeSet *= 60; // Conversion de minutes en secondes
  startTimer(timeSet); // Démarrage du minuteur avec la durée en secondes
  minuteSet = timeSet / 60; // Conversion inverse pour afficher l'heure de fin
  const nouveau = addMinutes(new Date(), minuteSet);
  const hour = nouveau.getHours();
  const minutes = nouveau.getMinutes();
  const secondes = nouveau.getSeconds();
  let hours = `${String(hour).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(secondes).padStart(2, '0')}`;
  document.getElementById('end').textContent = hours; // Affichage de l'heure de fin
}

// Fonction pour démarrer le minuteur
function startTimer(timeSet) {
  if (isNaN(timeSet) || timeSet <= 0) {
    alert('Veuillez entrer un nombre de minutes valide.'); // Affichage d'une alerte en cas d'entrée invalide
    return;
    // hassane Abdel-Razak
  } else if (timeSet === 20) {
    const nouveau = addSecond(new Date(), timeSet);
    const hour = nouveau.getHours();
    const minutes = nouveau.getMinutes();
    const secondes = nouveau.getSeconds();
    let hours = `${String(hour).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(secondes).padStart(2, '0')}`;
    document.getElementById('end').textContent = hours; // Affichage de l'heure de fin si timeSet est égal à 20 secondes
  }
  chrono.setAttribute('style', 'display:block'); // Affichage du bloc du minuteur
  targetTime = Date.now() + timeSet * 1000; // Calcul de l'heure cible en millisecondes
  intervalId = setInterval(updateTimer, 1000); // Démarrage de l'intervalle pour la mise à jour du minuteur chaque seconde
}

// Fonction pour mettre à jour le minuteur
function updateTimer() {
  const currentTime = Date.now();
  const remainingTime = Math.max(targetTime - currentTime, 0); // Calcul du temps restant
  const hours = Math.floor(remainingTime / 3600000); // Conversion du temps en heures
  const minutes = Math.floor((remainingTime % 3600000) / 60000); // Conversion du temps en minutes
  const seconds = Math.floor((remainingTime % 60000) / 1000); // Conversion du temps en secondes
  document.getElementById('timer').textContent =
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Affichage du temps restant dans le format HH:MM:SS

  if (remainingTime === 0) {
    clearInterval(intervalId); // Arrêt de l'intervalle lorsque le temps est écoulé
    timer.setAttribute('style', 'display:none'); // Masquage de l'élément du minuteur
    endTime.setAttribute('style', 'display:none'); // Masquage de l'élément de l'heure de fin
    tbMinutes.value = ''; // Réinitialisation du champ de texte
    location.reload(); // Actualisation de la page
  }
}
// Hassane Abdel-Razak