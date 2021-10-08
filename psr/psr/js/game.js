const choices = document.querySelectorAll("[data-choice]");
const message = document.querySelector(".message h1");
const playersChoices = document.querySelector(".message p");
const gameController = document.querySelector(".choices__game-controller");
const playAgain = document.querySelector(".choices__play-again");
const playAgainButton = document.querySelector(".play-again");
const playerScoreSpan = document.querySelector(".score__player");
const cpuScoreSpan = document.querySelector(".score__cpu");
const resetScoreButton = document.querySelector(".reset-score");
const score = { player: 0, cpu: 0 };

function game(event) {
  event.preventDefault();
  const playerChoice = event.target.dataset.choice;
  const cpuChoice = getCPUChoice();
  const i18n = { scissor: "Forbici", paper: "Carta", rock: "Sasso" };

  playersChoices.innerText = `${i18n[playerChoice]} vs ${i18n[cpuChoice]}`;

  // In caso di pareggio
  if (playerChoice === cpuChoice) {
    message.innerText = "Pareggio! 😬";
  } else {

    // Nel caso non fosse pareggio
    if (playerChoice === "paper") {

      if (cpuChoice === "rock") {
        message.innerText = "Vittoria! 🎉";
        score.player++;
      } else {
        message.innerText = "Sconfitta! 😔";
        score.cpu++;
      }

    } else if (playerChoice === "rock") {

      if (cpuChoice === "paper") {
        message.innerText = "Vittoria! 🎉"
        score.player++;
      } else {
        message.innerText = "Sconfitta! 😔";
        score.cpu++;
      }

    } else if (playerChoice === "scissor") {

      if (cpuChoice === "rock") {
        message.innerText = "Vittoria! 🎉"
        score.player++;
      } else {
        message.innerText = "Sconfitta! 😔";
        score.cpu++;
      }

    }

  }

  playerScoreSpan.innerText = score.player;
  cpuScoreSpan.innerText = score.cpu;
  localStorage.setItem("score", JSON.stringify(score));
  gameController.setAttribute("hidden", "hidden");
  playAgain.removeAttribute("hidden");
}

/**
 * Ripristina le scelte, nascondendo il pulsante "Gioca di Nuovo".
 */
function resetGame() {
  gameController.removeAttribute("hidden");
  playAgain.setAttribute("hidden", "hidden");
  message.innerText = "Per iniziare la partita, fai la tua scelta...";
  playersChoices.innerText = "";
}

/**
 * Restituisce una mossa casuale.
 *
 * @returns {String} La mossa del CPU
 */
function getCPUChoice() {
  const possibleChoices = ["paper", "scissor", "rock"];
  const randomNumber = Math.floor(Math.random() * 3);
  return possibleChoices[randomNumber];
}

function resetScore() {
  resetGame();
  localStorage.removeItem("score");
  retrieveScore();
}

function retrieveScore() {
  const retrievedScore = JSON.parse(localStorage.getItem("score"));
  score.player = retrievedScore?.player || 0;
  score.cpu = retrievedScore?.cpu || 0;
  playerScoreSpan.innerText = score.player;
  cpuScoreSpan.innerText = score.cpu;
}

retrieveScore();

choices.forEach(choice => choice.addEventListener("click", game));
playAgainButton.addEventListener("click", resetGame);
resetScoreButton.addEventListener("click", resetScore);
