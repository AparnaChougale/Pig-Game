'use strict';

const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const palyer0El = document.querySelector('.player--0');
const palyer1El = document.querySelector('.player--1');

let score, currentScore, activePlayer, playing;

const init = function () {
  // Starting conditions
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score1El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  palyer0El.classList.remove('player--winner');
  palyer1El.classList.remove('player--winner');
  palyer0El.classList.add('player--active');
  palyer1El.classList.remove('player--active');
};

// setting initial conditions
init();

// Swiching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  palyer0El.classList.toggle('player--active');
  palyer1El.classList.toggle('player--active');
};

// Rolling dice functionallity
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    //document.querySelector('img').src = `dice-${dice}.png`;
    diceEl.src = `/images/dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check for rolled 1
    if (dice !== 1) {
      // counting current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. Check if player's score is >=100
    if (score[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    }
    // swithch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
