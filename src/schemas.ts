import { object, array, number, boolean } from 'yup';

export const BossSchema = object({
	hp: number().required().strict(),
	maxHp: number().required(),
	isHittable: boolean().required(),
}).strict(true);

export const CbProgressSchema = object({
	TierChanges: array(number()).length(4, 'array length has to be 4').required(),
	HP: array(array(number()).length(5, 'array length has to be 5'))
		.length(5, 'array length has to be 5')
		.required(),

	rounds: array(number()).length(5, 'array length has to be 5').required(),
	boss: array(BossSchema).length(5, 'array length has to be 5').required(),
	tier: number().max(4).min(0).integer().required(),
	minRound: number().integer().required(),
	maxRound: number().integer().required(),
});
