"use strict;";
const roll = document.getElementsByClassName("btn--roll")[0];
const hold = document.getElementsByClassName("btn--hold")[0];
const newGame = document.getElementsByClassName("btn--new")[0];
const win0 = document.getElementsByClassName("win0")[0];
const win1 = document.getElementsByClassName("win1")[0];
let Current0 = Number(document.getElementById("current--0").textContent);
let Current1 = Number(document.getElementById("current--1").textContent);
let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");
let winner = document.querySelector(".player--winner");
let player, scores, current, state;
let img = document.getElementsByClassName("dice")[0];
let number;
function init() {
  player = 0;
  scores = [0, 0];
  current = 0;
  state = true;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  document.getElementById("score--1").textContent = 0;
  document.getElementById("score--0").textContent = 0;
  Current0 = 0;
  Current1 = 0;
  win0.classList.add("hide");
  win1.classList.add("hide");
  img.classList.add("hidden");
}
function switchplayer() {
  current = 0;
  document.getElementById(`current--${player}`).textContent = current;
  player = player == 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}
function rollbtn() {
  if (state) {
    number = Math.trunc(Math.random() * 6) + 1;
    img.src = `dice-${number}.png`;
    img.classList.remove("hidden");
    if (number !== 1) {
      current += number;
      document.getElementById(`current--${player}`).textContent = current;
    } else {
      switchplayer();
    }
  }
}
function holdbtn() {
  if (state) {
    scores[player] += current;
    document.getElementById(`score--${player}`).textContent = scores[player];
    if (scores[player] >= 100) {
      document
        .querySelector(`.player--${player}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${player}`)
        .classList.remove("player--active");
      state = false;
      img.classList.add("hidden");
      if (player == 0) {
        win0.classList.remove("hide");
      } else win1.classList.remove("hide");
    } else switchplayer();
  }
}

init();
roll.addEventListener("click", rollbtn);
hold.addEventListener("click", holdbtn);
newGame.addEventListener("click", init);
