let partida = document.querySelector(".partida");
let player = document.querySelector(".player");
let playerChoices;
let ai = document.querySelector(".ai");
let escolha = document.querySelector(".escolha");
let resultado = document.querySelector(".resultado");
let reset = document.querySelectorAll(".reset");
let play = document.querySelector("#play");
let newGameElement = document.querySelector("#newGame");
let rockElement = `<div class="hand rock"><img src="img/rock.svg" alt=""></div>`;
let papperElement = `<div class="hand papper"><img src="img/papper.svg" alt=""></div>`;
let scissorElement = `<div class="hand scissor"><img src="img/scissor.svg" alt=""></div>`;
let aiChoice;
let log = [];
let visualLog = document.querySelector(".log__matches");
let matchResult = [
  { result: 0, text: "Empate!" },
  { result: 1, text: "Ganhou!" },
  { result: 2, text: "Perdeu" },
  { result: -1, text: "Perdeu" },
  { result: -2, text: "Ganhou!" },
];

let handElements = [rockElement, papperElement, scissorElement];

function choseHand(hand) {
  hand.classList.add("choosen");
  playerChoices
    .filter((item) => item != hand)
    .map((item) => item.classList.add("not-choosen"));
  play.classList.add("play");
}

function clearChoices() {
  playerChoices.map((item) => {
    item.classList.remove("choosen");
    item.classList.remove("not-choosen");
  });
  play.classList.remove("play");
}

function showLog() {
  visualLog.innerHTML = "";
  log.map((item, index) => {
    visualLog.innerHTML += `
      <span class="line">
        <div class="matchId">${index + 1}</div>
        ${handElements[item.player - 1]}
        ${handElements[-1 * item.ai - 1]}
        <div class="resultText">${
          matchResult.find((i) => i.result == item.result).text
        }</div>
      </span>
    `;
  });
}

function visualMatchResult(log) {
  partida.classList.add("d-none");
  resultado.classList.remove("d-none");
  resultado.innerHTML = `
    <div class="playerResult">${handElements[log.player - 1]}</div>
    <div class="textResult">
      <span>${matchResult.find((i) => i.result == log.result).text}</span>
    </div>
    <div class="aiResult">${handElements[-1 * log.ai - 1]}</div>
  `;
  let playerResult = document.querySelector(".playerResult");
  let textResult = document.querySelector(".textResult");
  let aiResult = document.querySelector(".aiResult");
  setTimeout(() => {
    playerResult.classList.add("showOn");
  }, 250);
  setTimeout(() => {
    aiResult.classList.add("showOn");
  }, 500);
  setTimeout(() => {
    textResult.classList.add("showOn");
  }, 1000);

  setTimeout(() => {
    newGameElement.classList.remove("d-none");
    newGameElement.classList.add("play");
  }, 1500);
}

function newGame() {
  resultado.classList.add("d-none");
  setTimeout(() => {
    partida.classList.remove("d-none");
  }, 600);
  clearChoices();
  newGameElement.classList.add("d-none");
  newGameElement.classList.remove("play");
}

document.addEventListener("DOMContentLoaded", (e) => {
  handElements.map((item) => (player.innerHTML += item));
  let rock = document.querySelector(".rock");
  let papper = document.querySelector(".papper");
  let scissor = document.querySelector(".scissor");
  playerChoices = [rock, papper, scissor];
  playerChoices.map((item) =>
    item.addEventListener("click", (e) =>
      item.classList.contains("choosen") ? clearChoices() : choseHand(item)
    )
  );
});

play.addEventListener("click", (e) => {
  aiChoice = Math.floor(Math.random() * 3);
  playerChoices.map((item, index) => {
    if (item.classList.contains("choosen"))
      log.push({
        player: index + 1,
        ai: -1 * aiChoice - 1,
        result: index + 1 + (-1 * aiChoice - 1),
      });
  });
  showLog();
  play.classList.remove("play");

  setTimeout(() => {
    visualMatchResult(log.slice(-1)[0]);
  }, 600);
});

newGameElement.addEventListener("click", () => newGame());
