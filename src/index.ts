class CB {
	// constants ...should change every cb lol
	private TierChanges = [1, 4, 11, 31, 41];
	private HP = [
		[4000000, 6000000, 12000000, 19000000, 90000000],
		[6000000, 8000000, 15000000, 20000000, 95000000],
		[8000000, 10000000, 18000000, 21000000, 100000000],
		[10000000, 12000000, 20000000, 23000000, 110000000],
		[12000000, 15000000, 23000000, 27000000, 130000000],
	];

	// variables
	rounds: number[] = [1, 1, 1, 1, 1];
	boss = [
		{ hp: 4000000, maxHp: 4000000, isHittable: true },
		{ hp: 6000000, maxHp: 6000000, isHittable: true },
		{ hp: 8000000, maxHp: 8000000, isHittable: true },
		{ hp: 10000000, maxHp: 10000000, isHittable: true },
		{ hp: 12000000, maxHp: 12000000, isHittable: true },
	];

	tier: number = 0;
	minRound: number = 1;
	maxRound: number = 1;

	constructor(startRounds: number[] | number = 1) {
		if (startRounds === [1, 1, 1, 1, 1] || startRounds === 1) return;
		else this.adjustRounds(startRounds);
	}

	// Functions
	adjustRounds(rounds: number[] | number = 1, hp?: number[]) {
		if (Array.isArray(rounds)) {
			if (rounds.length !== 5 || (hp && hp.length !== 5))
				throw new Error('Rounds cannot be greater or less than 5!');
			if (Math.max(...rounds) - Math.min(...rounds) > 2)
				throw new Error('Difference between rounds cannot be greater than 2!');
			this.rounds = rounds;
		} else {
			this.rounds = [rounds, rounds, rounds, rounds, rounds];
		}
		this.sync(hp);
	}

	sync(hp?: number[]) {
		this.minRound = Math.min(...this.rounds);
		this.maxRound = Math.max(...this.rounds);
		const prevTier = this.tier;
		for (let i = this.TierChanges.length - 1; i >= 0; i--) {
			const element = this.TierChanges[i];
			if (this.rounds.every((val) => val >= element)) {
				this.tier = i;
				break;
			}
		}
		const changedTier = this.tier - prevTier !== 0;

		this.boss = this.rounds.map((val, idx) => {
			let isHittable = true;
			if (this.TierChanges.includes(val) && this.minRound < val) isHittable = false;
			else if (this.maxRound === val && val - this.minRound >= 2) isHittable = false;
			if (changedTier) {
				// refresh all hps
				let tempHp = this.HP[idx][this.tier];
				if (hp && hp[idx] > 0 && hp[idx] <= tempHp) tempHp = hp[idx];
				return { hp: tempHp, maxHp: this.HP[idx][this.tier], isHittable };
			} else {
				// retain previous hps of unkilled bosses
				let tempHp = this.boss[idx].hp;
				if (hp && hp[idx] > 0 && hp[idx] <= this.HP[idx][this.tier]) tempHp = hp[idx];
				return {
					hp: tempHp === 0 ? this.HP[idx][this.tier] : tempHp,
					maxHp: this.HP[idx][this.tier],
					isHittable,
				};
			}
		});
	}

	kill(boss: 0 | 1 | 2 | 3 | 4) {
		if (this.boss[boss].isHittable) {
			this.boss[boss].hp = 0;
			this.rounds[boss]++;
			this.sync();
		} else {
			throw new Error('Boss is not Hittable!');
		}
	}

	hit(boss: 0 | 1 | 2 | 3 | 4, amount: number) {
		if (!this.boss[boss].isHittable) throw new Error('Boss is not Hittable!');
		if (amount >= this.boss[boss].hp) {
			this.kill(boss);
		} else {
			this.boss[boss].hp -= amount;
		}
	}

	setHp(boss: 0 | 1 | 2 | 3 | 4, amount: number) {
		if (!this.boss[boss].isHittable) throw new Error('Boss is not Hittable!');
		if (amount > this.boss[boss].maxHp) this.boss[boss].hp = this.boss[boss].maxHp;
		else if (amount <= 0) {
			this.kill(boss);
		} else this.boss[boss].hp = amount;
	}
}

export default CB;
