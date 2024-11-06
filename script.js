// GAME RULES
const MAX_BOOPERS = 10;
const MAX_INCREMENT = 3;

console.log("script here");

import statsTracker from "./statsTracker.js";

const boop = document.getElementById("boop");
const powerTxt = document.getElementById("powerTxt");

// --- text for booper unlocks ---
const booperPrice = document.getElementById("booperPrice");
const booperUnlock = document.getElementById("booperUnlock");
const booperSpan = document.getElementById("booperCount");

// ---- text for increments ----
const incrementSpan = document.getElementById("incrementLvl");
const incrementPrice = document.getElementById("incrementPrice");

// buttons
const incrementUpgrade = document.getElementById("increment");
incrementUpgrade.addEventListener("click", upgradeIncrement);
incrementUpgrade.disabled = true;

const hireBoop = document.getElementById("booper");
hireBoop.addEventListener("click", upgradeBoop);
hireBoop.disabled = true;

const debug = document.getElementById("debugSpan");

let intervalId = false;
let boopersMaxed = false;
let incrementMaxed = false;

// TODO: Button disabled check needs to be improved

// --- BASICS ---
const player = {
  pow: 0,

  boopers: 0,
  nextBooperPrice: 10,
  booperUnlockVal: 12,
  booperUnlockLvl: 1,

  powIncrement: 1,
  nextIncrementPrice: 100,
};

function Boop() {
  // change internal pow lvl
  player.pow = player.pow + player.powIncrement;

  //update display
  powerTxt.textContent = player.pow;

  // checking for upgrades
  updateBooperInfo();
  checkButton();

  //debug
  debug.textContent = JSON.stringify(player);
}

boop.addEventListener("click", Boop);

// --- UPGRADE BASICS ---
function upgradeBoop() {
  // ensure does not break gmae rules
  if (player.boopers >= MAX_BOOPERS) return false;
  player.pow = player.pow - player.nextBooperPrice;
  player.boopers++;

  //update display
  powerTxt.textContent = player.pow;

  // update requirements for next
  player.booperUnlockVal = Math.floor(
    (player.boopers + 1) * (12 + player.boopers * 1.5)
  );

  // --- BOOPERS FUNCTIONALITY ---
  // clear previous intervals
  if (intervalId) {
    clearInterval(intervalId);
  }

  let delay = 1000 / player.boopers;
  intervalId = setInterval(() => {
    Boop();
  }, delay);

  updateBooperInfo();
  checkButton();
}

function updateBooperInfo() {
  if (boopersMaxed) return false;

  player.nextBooperPrice = (player.boopers + 1) * 10;
  booperSpan.textContent = player.boopers;

  booperPrice.textContent = player.nextBooperPrice;
  booperUnlock.textContent = player.booperUnlockVal;

  if (player.boopers >= MAX_BOOPERS) {
    booperSpan.textContent = "MAX BOOPERS REACHED: " + MAX_BOOPERS;
    booperPrice.textContent = "";
    booperUnlock.textContent = "";
    // flag
    boopersMaxed = true;
    return true;
  } else if (player.booperUnlockLvl >= MAX_BOOPERS) {
    booperCount.textContent = player.boopers;
    player.booperUnlockVal = null;
  }
}

function checkButton() {
  if (boopersMaxed && incrementMaxed) {
    return false;
  }

  // ---- BOOPER CHECKS ----
  if (
    !boopersMaxed &&
    player.pow >= player.booperUnlockVal &&
    player.boopers == player.booperUnlockLvl
  ) {
    player.booperUnlockLvl++;
    player;
  }

  if (
    !boopersMaxed &&
    player.pow >= player.nextBooperPrice && // price requirement met
    player.pow >= player.booperUnlockVal && // unlock requirement met
    !(player.boopers >= player.booperUnlockLvl) // not above current lvl
  ) {
    hireBoop.disabled = false;
  } else hireBoop.disabled = true;

  // ---- INCREMENT CHECKS ----
  if (!incrementMaxed && player.pow >= player.nextIncrementPrice) {
    incrementUpgrade.disabled = false;
  } else incrementUpgrade.disabled = true;
}

// ---- UPGRADE INCREMENT FUNCTINOALITY ----
function upgradeIncrement() {
  if (incrementMaxed) return false;

  if (
    player.pow >= player.nextIncrementPrice // price requirement met
  ) {
    player.pow = player.pow - player.nextIncrementPrice;
    player.powIncrement++;
    player.nextIncrementPrice = Math.floor(player.nextIncrementPrice * 2.4);

    // update text
    incrementPrice.textContent = player.nextIncrementPrice;
    incrementSpan.textContent = `+${player.powIncrement}`;

    if (player.powIncrement >= MAX_INCREMENT) incrementMaxed = true;
  }
}

statsTracker(player);
