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

//test
for (let index = 1; index < 100; index++) {
  console.log(index, getBossTier(index));
}

//
const bossRoundUpdate = (bossKilled) => {
  if (currentRound[bossKilled - 1] != maxRound) currentRound[bossKilled - 1]++;
  else console.log('cant hit B'+bossKilled);
  updateMinMaxRound(bossKilled);
  console.log(currentRound, currentTier);
}

//
const updateMinMaxRound = bossKilled => {
  let canUpdate = false;
  if (currentRound.every(n => n!=minRound)) canUpdate=true;
  if (canUpdate) {
    minRound++;
    maxRound++;
  }
}


//testing
for (let index = 0; index < 50; index++) {
  if (index % 3 == 1) {
    console.log('hit boss 1,2,4')
    bossRoundUpdate(1)
    bossRoundUpdate(2)
    bossRoundUpdate(4)
  } else {
    console.log('hit boss 3,5')
    bossRoundUpdate(3)
    bossRoundUpdate(5)
  }
}