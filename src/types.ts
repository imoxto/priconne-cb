export interface CbProgress {
	TierChanges: number[];
	HP: number[][];

	// variables
	rounds: number[];
	boss: Boss[];
	tier: number;
	minRound: number;
	maxRound: number;
}

export interface Boss {
	hp: number;
	maxHp: number;
	isHittable: boolean;
}
