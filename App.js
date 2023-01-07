const submit = document.getElementById("submit");
const game = document.querySelector(".game");
const details = document.querySelector(".details");
const message = document.querySelector(".message");

let playGame = true;
let player1 = "";
let player2 = "";
let activePlayer = 0;
// 0 for player 1 and
// 1 for player 2
let chances = 0;
function showMessage(msg) {
  message.innerHTML = `<h3>${msg}</h3>`;
}

function updateActivePlayer() {
  if (activePlayer === 0) activePlayer = 1;
  else activePlayer = 0;
}
function initializeGame() {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  activePlayer = 0;

  details.style.display = "none";
  game.style.display = "flex";

  showMessage(`${activePlayer === 0 ? player1 : player2}, you're up`);
  for (let i = 1; i <= 9; i++) {
    const div = document.createElement("div");
    div.id = i;

    div.classList.add("game-slot");

    div.addEventListener("click", function () {
      if (!div.innerText && playGame) {
        chances = chances + 1;
        div.innerText = activePlayer === 0 ? "x" : "o";

        const winner = checkWinner();

        if (!winner) {
          updateActivePlayer();
          showMessage(`${activePlayer === 0 ? player1 : player2}, you're up`);
        } else {
          showMessage(
            `${
              activePlayer === 0 ? player1 : player2
            }, Congratulations you won!`
          );
        }
        if (chances === 9) {
          showMessage(`This is a tie!`);
        }
      }
    });

    game.appendChild(div);
  }
}

function checkWinner() {
  let winnerBool = false;

  for (let i = 0; i < winningSequences.length; i++) {
    const winningCombo = winningSequences[i];

    const cell1 = document.getElementById(winningCombo[0] + 1);
    const cell2 = document.getElementById(winningCombo[1] + 1);
    const cell3 = document.getElementById(winningCombo[2] + 1);

    const val1 = cell1.innerText;
    const val2 = cell2.innerText;
    const val3 = cell3.innerText;

    if (val1 === val2 && val2 === val3 && val1 != "") {
      winnerBool = true;
      cell1.style.backgroundColor = "purple";
      cell2.style.backgroundColor = "purple";
      cell3.style.backgroundColor = "purple";
      playGame = false;
      break;
    }
  }
  return winnerBool;
}

const winningSequences = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];
submit.addEventListener("click", initializeGame);
