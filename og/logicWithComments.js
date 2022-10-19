import clear from "clear";

import {
	timer,
	rollDice,
	checkIfMovingPeg,
	findIndexOfPegOnBoard,
	findDistanceFromStart,
	calculateNewPosition,
	checkNumberOfPegsInFinishSlot,
	checkIfPositionIsOccupied,
	checkIfPositionIsAStartPosition,
	getColorOfPegAtPosition,
	startPositions,
} from "./util.js";
import { logger } from "../render.js";

/*
Bugs:
Pegs can be moved to the same position
Movement is not animated
*/

/*const rollDice = async () => {
 const diceRollString = await input.text("Please enter the dice roll: ");
 if (Number.isNaN(diceRollString)) {
  console.log("Please enter a number");
  return rollDice();
 } else {
  const diceRoll = Number(diceRollString);
  if (diceRoll < 1 || diceRoll > 6) {
   console.log("Please enter a number between 1 and 6");
   return rollDice();
  } else {
   return diceRoll;
  }
 }
};*/

const finishSlotStartPositions = {
	yellow: "1",
	blue: "5",
	pink: "9",
	green: "13",
};

clear();

const newRound = (playerNames) => {
	let currentMovePlayer = "yellow";
	const winner = [];
	const gameStats = {
		yellow: {
			playerName: playerNames[0],
			positions: ["h", "h", "h", "h"],
		},
		blue: {
			playerName: playerNames[1],
			positions: ["h", "h", "h", "h"],
		},
		pink: {
			playerName: playerNames[2],
			positions: ["h", "h", "h", "h"],
		},
		green: {
			playerName: playerNames[3],
			positions: ["h", "h", "h", "h"],
		},
	};

	const playGame = async () => {
		while (winner.length === 0) {
			/*
If the player has a peg on the board:
 and rolls a 6 - make sure they get another turn
 otherwise, move the peg
If the player does not have any pegs on the board:
 and rolls a 6 - move a peg to the start
 otherwise, skip their turn
Moving a peg thats already on the board:
 Check that there is no peg at the spot they're moving to, if there is, remove it

Needed utitlity functions:
- check if a peg is at a position
- check which peg is on the board
   */
			// console.log("currentMovePlayer", currentMovePlayer);
			const diceRoll = await rollDice();
			logger(gameStats, diceRoll);
			const pegsOnTheMove = checkIfMovingPeg(gameStats, currentMovePlayer);
			if (pegsOnTheMove === true) {
				const pegOnBoardPositionIndex = findIndexOfPegOnBoard(gameStats, currentMovePlayer);
				const pegOnBoardPosition =
					gameStats[currentMovePlayer].positions[pegOnBoardPositionIndex];
				const proposedNewPosition = calculateNewPosition(pegOnBoardPosition, diceRoll);
				const positionOccupied = checkIfPositionIsOccupied(gameStats, proposedNewPosition);
				const newPositionIsAStartPosition =
					checkIfPositionIsAStartPosition(proposedNewPosition);
				const currentPositionDistanceFromStart = findDistanceFromStart(
					pegOnBoardPosition,
					currentMovePlayer
				);
				const newPositionDistanceFromStart = findDistanceFromStart(
					proposedNewPosition,
					currentMovePlayer
				);

				/*console.log(`The current player is ${currentMovePlayer}`);
    console.log(`The index of the peg that is on the board is ${pegOnBoardPositionIndex}`);
    console.log(`The location of the peg that is on the move is ${pegOnBoardPosition}`);
    console.log(`With the diceroll, the suggested new position would be ${proposedNewPosition}`);
    console.log(`The current position is ${currentPositionDistanceFromStart} from the start`);*/

				if (currentPositionDistanceFromStart > newPositionDistanceFromStart) {
					const distanceFromFinishPosition = 27 - currentPositionDistanceFromStart;
					const numberOfFinishPositions = diceRoll - distanceFromFinishPosition;
					const numberOfPegsInFinish = checkNumberOfPegsInFinishSlot(
						gameStats,
						currentMovePlayer
					);

					// calculate the potential finish slot position
					// check if the finish slot position is occupied
					// if it is, skip turn
					// if it isn't, move peg to finish slot
					/*console.log("The proposed new position is past the finish slot");
     console.log(`${distanceFromFinishPosition} pegs from the finish slot`);
     console.log(`The finish slot position is ${numberOfFinishPositions}`);
     console.log(`The player currently has ${numberOfPegsInFinish} pegs in the finish slot`);*/

					// if the numberOfFinishPositions is greater than 4, skip the turn

					if (numberOfFinishPositions > 4) {
						// console.log("The proposed new position is greater than 4, skipping turn");
					} else {
						// calculate the finish slot position
						const finishSlotPosition = `f${
							numberOfFinishPositions +
							Number(finishSlotStartPositions[currentMovePlayer]) -
							1
						}`;
						// console.log(`The finish slot position would be ${finishSlotPosition}`);
						// check if the finish slot position is occupied
						// if it is, skip turn
						// if it isn't, move peg to finish slot
						const finishSlotPositionOccupied = checkIfPositionIsOccupied(
							gameStats,
							finishSlotPosition
						);
						if (finishSlotPositionOccupied === true) {
							// console.log("The finish slot position is occupied, skipping turn");
						} else {
							// console.log("The finish slot position is not occupied, moving peg");
							gameStats[currentMovePlayer].positions[pegOnBoardPositionIndex] =
								finishSlotPosition;
							logger(gameStats, diceRoll);
							if (numberOfPegsInFinish === 3) {
								console.log(
									`${gameStats[currentMovePlayer].playerName} who played as ${currentMovePlayer} has won the round!`
								);
								console.log(
									"To open the menu, please press any button on the keyboard apart from enter. To start a new round, please press enter."
								);
								winner.push(currentMovePlayer);
							}
						}
					}
				} else {
					/*console.log(`The new position is ${newPositionDistanceFromStart} from the start`);*/
					/*console.log("The proposed new position is not past the finish slot");*/
					if (positionOccupied === true) {
						/*console.log("The new position is occupied");*/
						if (newPositionIsAStartPosition === true) {
							/*console.log("The new position is a start position");*/
							/*console.log("Your peg will need to be moved to home");*/
							gameStats[currentMovePlayer].positions[pegOnBoardPositionIndex] = "h";
							logger(gameStats, diceRoll);
						} else if (newPositionIsAStartPosition === false) {
							/*console.log("The new position is not a start position");*/
							/*console.log("The peg will be removed from the board");*/
							const colorWithPeg = getColorOfPegAtPosition(
								gameStats,
								proposedNewPosition
							);
							const indexOfPegToRemove =
								gameStats[colorWithPeg].positions.indexOf(proposedNewPosition);
							gameStats[colorWithPeg].positions[indexOfPegToRemove] = "h";
							gameStats[currentMovePlayer].positions[pegOnBoardPositionIndex] =
								proposedNewPosition;
							logger(gameStats, diceRoll);
						}
					} else if (positionOccupied === false) {
						/*console.log("The new position is not occupied");*/
						if (newPositionIsAStartPosition === true) {
							/*console.log(
        "The new position is a start position. If the player needs to use this position, the peg you are placing here will be moved to home"
       );*/
							gameStats[currentMovePlayer].positions[pegOnBoardPositionIndex] =
								proposedNewPosition;
							logger(gameStats, diceRoll);
						} else if (newPositionIsAStartPosition === false) {
							/*console.log(
        "The new position is not a start position, but if another players peg is moved here, your peg will be moved to home"
       );*/
							gameStats[currentMovePlayer].positions[pegOnBoardPositionIndex] =
								proposedNewPosition;
							logger(gameStats, diceRoll);
						}
					}
				}

				if (diceRoll === 6) {
					continue;
				}
			} else if (pegsOnTheMove === false) {
				// assume all pegs are in home
				if (diceRoll === 6) {
					const startPosition = startPositions[currentMovePlayer];
					const startPositionOccupied = checkIfPositionIsOccupied(
						gameStats,
						startPosition
					);
					const pegToMove = gameStats[currentMovePlayer].positions.indexOf("h");

					/*console.log(`Congrats! You rolled a 6, you can now move a peg to the start`);*/
					/*console.log(`The start position for ${currentMovePlayer} is ${startPosition}`);*/

					if (startPositionOccupied === true) {
						/*console.log(`Someone is using your start position! Their peg will be moved to home.`);*/
					} else if (startPositionOccupied === false) {
						/*console.log(`Your peg will be moved to the start position.`);*/
						// move the peg to the start position
						gameStats[currentMovePlayer].positions[pegToMove] = startPosition;
						logger(gameStats, diceRoll);
						continue;
					}
				} else {
					// skip the players turn
					/*console.log(
      `You rolled a ${diceRoll}, you can't move a peg to the start. To move a peg to the start, you need to roll a 6. Your turn is skipped.`
     );*/
				}
			}
			await timer(100);
			if (currentMovePlayer === "yellow") {
				currentMovePlayer = "blue";
			} else if (currentMovePlayer === "blue") {
				currentMovePlayer = "pink";
			} else if (currentMovePlayer === "pink") {
				currentMovePlayer = "green";
			} else if (currentMovePlayer === "green") {
				currentMovePlayer = "yellow";
			}
		}
	};

	playGame();
};

export { newRound };
