'use strict';

// Utility function to select elements by id or class
const select = selector => document.querySelector(selector);
const selectById = id => document.getElementById(id);

// Selecting elements
const playerEls = [select('.player--0'), select('.player--1')];
const scoreEls = [selectById('score--0'), selectById('score--1')];
const currentEls = [selectById('current--0'), selectById('current--1')];
const diceEl = select('.dice');
const btnNew = select('.btn--new');
const btnRoll = select('.btn--roll');
const btnHold = select('.btn--hold');

// Game state variables
let scores, currentScore, activePlayer, playing;

// Initialization function to reset the game
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset displayed scores and current scores
  scoreEls.forEach(scoreEl => (scoreEl.textContent = 0));
  currentEls.forEach(currentEl => (currentEl.textContent = 0));

  // Hide dice and reset player classes
  diceEl.classList.add('hidden');
  playerEls.forEach(playerEl => playerEl.classList.remove('player--winner', 'player--active'));

  // Set player 0 as active
  playerEls[0].classList.add('player--active');
};

// Switch active player
const switchPlayer = () => {
  currentEls[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEls.forEach(playerEl => playerEl.classList.toggle('player--active'));
};

// Roll dice event handler
const handleRollDice = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Update score or switch player
    if (dice !== 1) {
      currentScore += dice;
      currentEls[activePlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
};

// Hold score event handler
const handleHoldScore = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    scoreEls[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      playerEls[activePlayer].classList.add('player--winner');
      playerEls[activePlayer].classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

// Event listeners
btnRoll.addEventListener('click', handleRollDice);
btnHold.addEventListener('click', handleHoldScore);
btnNew.addEventListener('click', init);

// Initialize game on load
init();
