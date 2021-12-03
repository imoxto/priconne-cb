const cbInfoJson = require('../data/cb_info.json');
const assert = require('assert');
const WAVE_DENSITY = 2;
const cb = {
  "tierChanges": [4, 11, 31, 41],
  "hp": [
    [4000000, 6000000, 12000000, 19000000, 90000000],
    [6000000, 8000000, 15000000, 20000000, 95000000],
    [8000000, 10000000, 18000000, 21000000, 100000000],
    [10000000, 12000000, 20000000, 23000000, 110000000],
    [12000000, 15000000, 23000000, 27000000, 130000000]
  ],
  "boss": [
    {hp: 4000000, isHittable: true},
    {hp: 6000000, isHittable: true},
    {hp: 8000000, isHittable: true},
    {hp: 10000000, isHittable: true},
    {hp: 12000000, isHittable: true}
  ],
  "currentRound": [1, 1, 1, 1, 1],
  "minRound": 1,
  "currentTier": 1
}

//works ... maybe..
const hitBoss = (boss, amount, cb) => {
  if (!cb.boss[boss-1].isHittable) {
    console.log("cant hit B" + boss);
    return
  }
  if (amount>cb.boss[boss-1].hp) {
    killBoss(boss, cb);
  } else {
    cb.boss[boss-1].hp -= amount;
    console.log("Hitted B"+boss+" for "+amount);
  }
};

//works
const killBoss = (boss, cb) => {
  if (cb.boss[boss-1].isHittable) {
    cb.currentRound[boss - 1]++;
    console.log('Killed B' + boss, cb.currentRound, cb.currentTier);
    checkTier(cb);
    //console.log(boss, cb.boss[boss-1]);
    cb.boss[boss-1].hp = cb.hp[boss-1][cb.currentTier-1];
    if (cb.currentRound[boss - 1] == cb.minRound + 2) cb.boss[boss-1].isHittable=false;
    //console.log(boss, cb.boss[boss-1]);
  }
}

//works
const checkTier = cb => {
  if (cb.currentRound.every(n => n != cb.minRound)) {
    if (cb.tierChanges.includes(cb.minRound + 2)) {
      if (cb.currentRound.every(n => n == cb.minRound + 2)) {
        cb.minRound++;
        cb.currentTier++;
        for (let i in cb.boss) {
          cb.boss[i].hp = cb.hp[i][cb.currentTier-1];
          cb.boss[i].isHittable = true;
        }
        console.log('Entered Tier ' + cb.currentTier);
      }
    } else {
      cb.minRound++;
      for (let i = 0; i < cb.boss.length; i++) {        
        cb.boss[i].isHittable = true;
        //console.log(i, cb.boss[i]);
      }
    }
  }
}


/*/testing
for (let index = 0; index < 500; index++) {
  const b= Math.floor(Math.random()*5+1);
  killBoss(b, cb);
}*/

for (let index = 0; index < 800; index++) {
  const amnt = Math.floor(Math.random()*20000000)+10000000;
  const b= Math.floor(Math.random()*5+1);
  hitBoss(b, amnt, cb);
  //console.log(b, amnt, cb);
}
setTimeout(() => {
  console.log(cb)
}, 3000)

