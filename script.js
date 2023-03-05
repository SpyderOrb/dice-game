'use strict';
// Selecting elements
const score0El = document.querySelector('#score--0'),
  score1El = document.getElementById('score--1'),
  diceEl = document.querySelector('.dice'),
  current0El = document.getElementById('current--0'),
  current1El = document.getElementById('current--1'),
  player0El = document.querySelector('.player--0'),
  player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playing;

// Functions
const init = () => {
  playing = true;
  // Player 1 is active when the variable is set to 0
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Staritng the game

// Rolling the dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1; If true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding the score
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to another player
      switchPlayer();
    }
  }
});

// Reseting the game
btnNew.addEventListener('click', init);
