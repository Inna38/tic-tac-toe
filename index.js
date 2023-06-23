const content = document.querySelector(".js-content");
const nameWinner = document.querySelector(".js-winner");
const btn = document.querySelector(".js-btn");
const checkX = document.querySelector(".js-checkX");
const checkO = document.querySelector(".js-checkO");

content.addEventListener("click", onContentClick);
btn.addEventListener("click", onBtnClick);

let player = "X";
let historyX = [];
let historyO = [];
let playerCheckX = 0;
let playerCheckO = 0;

const winner = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function createMarkup() {
  let markup = "";
  for (let i = 1; i < 10; i += 1) {
    markup += `<div class="item js-item" data-id="${i}
"></div>`;
  }
  content.innerHTML = markup;
}
createMarkup();

function onContentClick(e) {
  if (!e.target.classList.contains("js-item") || e.target.textContent) {
    return;
  }

  const id = Number(e.target.dataset.id);

  let result = false;
  if (player === "X") {
    historyX.push(id);
    result = isWinner(historyX);
  } else {
    historyO.push(id);
    result = isWinner(historyO);
  }
  e.target.textContent = player;

  if (result) {
    nameWinner.textContent = `WINNER player: ${player} 😎`;
    if (player === "X") {
      playerCheckX += 1;
      checkX.textContent = `player X: ${playerCheckX}`;
      setTimeout(() => {
        resetGame();
        nameWinner.textContent = "";
      }, 1200);
      return;
    }

    if (player === "O") {
      playerCheckO += 1;
      checkO.textContent = `player O: ${playerCheckO}`;
      setTimeout(() => {
        resetGame();
        nameWinner.textContent = "";
      }, 1200);
      return;
    }

} else if (historyX.length + historyO.length === 9) {
    nameWinner.textContent = `Try again 😱`;
    setTimeout(() => {
      nameWinner.textContent = "";
      resetGame();
    }, 2000);

    return;
  }

  player = player === "X" ? "O" : "X";
}

function isWinner(arr) {
  return winner.some((item) => item.every((element) => arr.includes(element)));
}

function resetGame() {
  createMarkup();
  historyX = [];
  historyO = [];
  player = "X";
}

function onBtnClick(e) {
  setTimeout(() => {
    resetGame();
    playerCheckX = 0;
    playerCheckO = 0;
    checkX.textContent = "player X: ";
    checkO.textContent = "player O: ";
  }, 200);
}
