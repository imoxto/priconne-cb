import CB, { HP } from '../src';

describe('CB', () => {
	let cb = new CB();
	const cb1 = new CB(1);
	const cb2 = new CB([1, 1, 1, 1, 1]);
	test('constructor() sets proper tier and hp', () => {
		expect(cb.tier).toStrictEqual(0);
		expect(cb.boss).toStrictEqual([
			{ hp: HP[0][cb.tier], maxHp: HP[0][cb.tier], isHittable: true },
			{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
			{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
			{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: true },
			{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
		]);
	});
	test('constructor() sets proper rounds', () => {
		expect(cb.rounds).toStrictEqual([1, 1, 1, 1, 1]);
		expect(cb1).toStrictEqual(cb);
		expect(cb2).toStrictEqual(cb1);
	});

	test('adjustRounds() sets proper rounds', () => {
		cb.adjustRounds();
		expect(cb2).toStrictEqual(cb);
	});

	test('should throw error on incorrect constructor', () => {
		try {
			cb = new CB([1, 2, 4, 3, 2]);
		} catch (error) {
			expect(error.message).toBe('Difference between rounds cannot be greater than 2!');
		}
		try {
			cb = new CB([1, 2, 3]);
		} catch (error) {
			expect(error.message).toBe('Rounds cannot be greater or less than 5!');
		}
	});

	test('bosses should have correct isHittable attribute, and tier should be correct', () => {
		cb.adjustRounds([4, 3, 3, 3, 3]);
		expect(cb.boss).toStrictEqual([
			{ hp: HP[0][cb.tier], maxHp: HP[0][cb.tier], isHittable: false },
			{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
			{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
			{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: true },
			{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
		]);
		expect(cb.tier).toStrictEqual(0);
		cb.adjustRounds([25, 27, 26, 26, 27]);
		expect(cb.boss).toStrictEqual([
			{ hp: HP[0][cb.tier], maxHp: HP[0][cb.tier], isHittable: true },
			{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: false },
			{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
			{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: true },
			{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: false },
		]);
		expect(cb.tier).toStrictEqual(2);
		cb.adjustRounds([8, 7, 8, 7, 7]);
		expect(cb.boss).toStrictEqual([
			{ hp: HP[0][cb.tier], maxHp: HP[0][cb.tier], isHittable: true },
			{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
			{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
			{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: true },
			{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
		]);
		expect(cb.tier).toStrictEqual(1);
		cb.adjustRounds([11, 9, 10, 11, 9]);
		expect(cb.tier).toStrictEqual(1);
		expect(cb.boss).toStrictEqual([
			{ hp: HP[0][cb.tier], maxHp: HP[0][cb.tier], isHittable: false },
			{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
			{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
			{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: false },
			{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
		]);
		cb.adjustRounds([45, 45, 45, 46, 46]);
		expect(cb.boss).toStrictEqual([
			{ hp: HP[0][cb.tier], maxHp: HP[0][cb.tier], isHittable: true },
			{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
			{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
			{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: true },
			{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
		]);
		expect(cb.tier).toStrictEqual(4);
	});

	test('adjustRounds() should set correct hp', () => {
		expect(() => {
			cb.adjustRounds([41, 41, 41, 41, 41], [48000000, 50000000, 50000000, 50000000]);
		}).toThrowError();
		cb.adjustRounds([11, 9, 10, 11, 9], [3000000, 0, 5000000, 4000000, HP[4][cb.tier] + 100]);
		expect(cb.tier).toStrictEqual(1);
		expect(cb.boss).toStrictEqual([
			{ hp: 3000000, maxHp: HP[0][cb.tier], isHittable: false },
			{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
			{ hp: 5000000, maxHp: HP[2][cb.tier], isHittable: true },
			{ hp: 4000000, maxHp: HP[3][cb.tier], isHittable: false },
			{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
		]);
		expect(cb.rounds).toStrictEqual([11, 9, 10, 11, 9]);
		cb.adjustRounds([9, 10, 10, 8, 10], [3000000, 0, 5000000, 4000000, 190000000]);
		expect(cb.tier).toStrictEqual(1);
		expect(cb.boss).toStrictEqual([
			{ hp: 3000000, maxHp: HP[0][cb.tier], isHittable: true },
			{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: false },
			{ hp: 5000000, maxHp: HP[2][cb.tier], isHittable: false },
			{ hp: 4000000, maxHp: HP[3][cb.tier], isHittable: true },
			{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: false },
		]);
		expect(cb.rounds).toStrictEqual([9, 10, 10, 8, 10]);
	});

	test('getters should not be able to modify original', () => {
		let arr = cb.getMaxHp();
		let arr2 = cb.getTierChanges();
		arr.push([1]);
		arr2.push(2);
		console.log(arr, arr2);

		expect(cb.getMaxHp()).toStrictEqual(cb1.getMaxHp());
		expect(cb.getTierChanges()).toStrictEqual(cb1.getTierChanges());
	});

	test('setters should work', () => {
		expect(() => {
			cb.setMaxHp([
				[1, 3, 5, 6, 7],
				[1, 3, 6, 6, 8],
				[2, 3, 5, 6],
				[2, 3, 5, 6],
				[3, 10, 5, 6],
			]);
		}).toThrowError();
		expect(() => {
			cb.setMaxHp([[1, 3, 5, 6, 7]]);
		}).toThrowError();
		expect(() => {
			cb.setTierChanges([1, 3, 5, 6]);
		}).toThrowError();
		cb.setMaxHp([
			[1, 3, 5, 6, 7],
			[1, 3, 6, 8, 8],
			[2, 3, 8, 8, 11],
			[2, 3, 8, 8, 12],
			[3, 10, 10, 10, 16],
		]);
		cb.setTierChanges([1, 3, 5, 6, 7]);
		expect(cb.getMaxHp()).toStrictEqual([
			[1, 3, 5, 6, 7],
			[1, 3, 6, 8, 8],
			[2, 3, 8, 8, 11],
			[2, 3, 8, 8, 12],
			[3, 10, 10, 10, 16],
		]);
		expect(cb.getTierChanges()).toStrictEqual([1, 3, 5, 6, 7]);
	});
});

describe('CB interaction', () => {
	const cb = new CB();
	test('hitting and killing and setting hp should work', () => {
		cb.hit(0, 2000000);
		expect([cb.rounds, cb.tier, cb.boss]).toStrictEqual([
			[1, 1, 1, 1, 1],
			0,
			[
				{ hp: HP[0][cb.tier] - 2000000, maxHp: HP[0][cb.tier], isHittable: true },
				{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
				{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
				{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: true },
				{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
			],
		]);
		cb.hit(1, HP[1][cb.tier]);
		cb.hit(2, HP[2][cb.tier]);
		expect([cb.rounds, cb.tier, cb.boss]).toStrictEqual([
			[1, 2, 2, 1, 1],
			0,
			[
				{ hp: HP[0][cb.tier] - 2000000, maxHp: HP[0][cb.tier], isHittable: true },
				{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
				{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
				{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: true },
				{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
			],
		]);
		cb.hit(0, HP[0][cb.tier] - 2000000);
		expect([cb.rounds, cb.tier, cb.boss]).toStrictEqual([
			[2, 2, 2, 1, 1],
			0,
			[
				{ hp: HP[0][cb.tier], maxHp: HP[0][cb.tier], isHittable: true },
				{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
				{ hp: HP[2][cb.tier], maxHp: HP[2][cb.tier], isHittable: true },
				{ hp: HP[3][cb.tier], maxHp: HP[3][cb.tier], isHittable: true },
				{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
			],
		]);
		cb.kill(0);
		expect(() => {
			cb.kill(0);
		}).toThrowError();
		expect(() => {
			cb.hit(0, 4000000);
		}).toThrowError();
		expect(() => {
			cb.setHp(0, 3000000);
		}).toThrowError();
		cb.setHp(2, 3000000);
		cb.setHp(3, 0);
		cb.setHp(3, 11000000);
		cb.setHp(4, HP[4][cb.tier] + 3000000);
		expect([cb.rounds, cb.tier, cb.boss]).toStrictEqual([
			[3, 2, 2, 2, 1],
			0,
			[
				{ hp: HP[0][cb.tier], maxHp: HP[0][cb.tier], isHittable: false },
				{ hp: HP[1][cb.tier], maxHp: HP[1][cb.tier], isHittable: true },
				{ hp: 3000000, maxHp: HP[2][cb.tier], isHittable: true },
				{ hp: 11000000, maxHp: HP[3][cb.tier], isHittable: true },
				{ hp: HP[4][cb.tier], maxHp: HP[4][cb.tier], isHittable: true },
			],
		]);
	});
});

describe('CB route', () => {
	// custom tester
	test('should progress', () => {
		const cb = new CB();
		for (let i = 0; i < 500; i++) {
			const boss = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
			const amnt = Math.floor(12000000 + Math.random() * 30000000);
			try {
				console.log(`hitting boss ${boss + 1} with amount ${amnt}`);
				cb.hit(boss, amnt);
				console.log(`Done! round: ${cb.rounds.toString()}, Tier: ${cb.tier}`);
			} catch (err) {
				console.log(err.message);
			}
		}
		expect(cb.rounds.every((val) => val >= 41) && cb.tier === 4).toStrictEqual(true);
	});
});
