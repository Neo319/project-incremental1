export default function statsTracker(player) {
  console.log("here");

  // Stats 1 tracking
  const passiveBPS = document.getElementById("stats1");
  function calculatePassive() {
    return player.boopers * player.powIncrement;
  }

  // Stats 2 tracking
  const totalBPS = document.getElementById("stats2");
  let previousPow = 0;
  function calculateTotal(v) {
    const result = player.pow - previousPow;
    previousPow = player.pow;
    return result;
  }

  // updating stats
  setInterval(() => {
    passiveBPS.textContent = calculatePassive();
    totalBPS.textContent = calculateTotal();
  }, 1000);

  //bps Bar
  const meter = document.getElementById("bpsBar1");
  let meterPrevPow = 0;
  let targetRate = 25; // 50 BPS
  setInterval(() => {
    //calculate powIncrease, percentage
    const result = player.pow - meterPrevPow;
    console.log("bps: ", result * 2);
    meterPrevPow = player.pow;

    const meterPercentage = Math.floor((result / targetRate) * 100);

    meter.style.width = `${meterPercentage}%`;
  }, 500);

  // TODO: implement bps target level increases
}
