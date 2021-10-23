const cbInfo = require('../data/cb_info.json');
const currentRound = [1, 1, 1, 1, 1];
let maxRound = 3;
let minRound = 1;
let currentTier = 1;

//works
const getBossTier = (bossRound) => {
  if (bossRound < 1) {
    throw new Error('invalid boss round');
  }
  for (i = 0; i < cbInfo.tierChanges.length; i++) {
    if (bossRound < cbInfo.tierChanges[i]) return i + 1// remove +1 if the cbInfo.tierChanges length is 5
  }
  return 5
}


//should work
const bossRoundUpdate = (bossKilled) => {
  if (currentRound[bossKilled - 1] != maxRound) {
    currentRound[bossKilled - 1]++;
    updateMinMaxRound(bossKilled);
    console.log('Killed B'+bossKilled, currentRound, currentTier);
  } else {
    console.log('cant hit B'+bossKilled);
  }
}

//
const updateMinMaxRound = bossKilled => {
  let canUpdate = currentRound.every(n => n!=minRound);
  if (canUpdate) {
    if (cbInfo.tierChanges.includes(maxRound)) {
      if (currentRound.every((n) => n==maxRound)) {
        minRound++;
        maxRound++;
        currentTier++;
        console.log('Entered Tier '+currentTier);
      }
    } else {
      minRound++;
      maxRound++;
    }
  }
}


//testing
for (let index = 0; index < 1800; index++) {
  if (Math.random() < 0.2) bossRoundUpdate(1);
  else if (Math.random() < 0.4) bossRoundUpdate(2);
  else if (Math.random() < 0.6) bossRoundUpdate(3);
  else if (Math.random() < 0.8) bossRoundUpdate(4);
  else bossRoundUpdate(5);
}
setTimeout(()=> {
  console.log(currentRound,currentTier)
},10000)