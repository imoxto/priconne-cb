<div align="center"> <h1>Princess Connect! Re:Dive Clanbattle</h1> </div>

## Contents:

- [About](#About)
- [Usage](#Usage)
- [To-do](#To-do)

## About:

A small package intended to simulate the clan battle game mode of Princess Connect! Re:DIVE. It can be used by discord bots, etc for example by extending the `CB` class.

## Usage:

#### constructor:

`const cb = new CB() // create a new cb instace all bosses will start at round 1`  
`new CB([1, 2, 3, 2, 3]) // will create an instance with Boss 1 starting at 1, Boss 2 at 2, and so on`

#### Forcefully adjusting rounds:

`cb.adjustRounds([1, 2, 3, 2, 3]) // will adjust all boss rounds according to the array provided`

#### interaction with bosses:

`hit(boss: 0 | 1 | 2 | 3 | 4, amount: number) // hits boss for an amount`  
`kill(boss: 0 | 1 | 2 | 3 | 4) // kills boss`  
`setHp(boss: 0 | 1 | 2 | 3 | 4, amount: number) // force set the hp of a boss to an amount`

#### change max HPs and Tier change infos

`setMaxHp(arr: number[][]) // customises maxHP instead of using the hard coded default one`
`setTierChanges(arr: number[]) // Customises tier changes instead of using the hard coded default one`
`getMaxHp() // returns a 2d array with max HPs of bosses in the format arr[boss number][tier]`
`getTierChanges() // returns Array with each element denoting the first round of a tier`

## To-do:

- custom error class to use CB-related Errors
- tracking user hits
