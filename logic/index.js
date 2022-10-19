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
				if (currentPositionDistanceFromStart > newPositionDistanceFromStart) {
					const distanceFromFinishPosition = 27 - currentPositionDistanceFromStart;
					const numberOfFinishPositions = diceRoll - distanceFromFinishPosition;
					const numberOfPegsInFinish = checkNumberOfPegsInFinishSlot(
						gameStats,
						currentMovePlayer
					);

					if (numberOfFinishPositions > 4) {
						// turn skipped
					} else {
						const finishSlotPosition = `f${
							numberOfFinishPositions +
							Number(finishSlotStartPositions[currentMovePlayer]) -
							1
						}`;
						const finishSlotPositionOccupied = checkIfPositionIsOccupied(
							gameStats,
							finishSlotPosition
						);
						if (finishSlotPositionOccupied === true) {
							// turn skipped
						} else {
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
					if (positionOccupied === true) {
						if (newPositionIsAStartPosition === true) {
							gameStats[currentMovePlayer].positions[pegOnBoardPositionIndex] = "h";
							logger(gameStats, diceRoll);
						} else if (newPositionIsAStartPosition === false) {
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
						if (newPositionIsAStartPosition === true) {
							gameStats[currentMovePlayer].positions[pegOnBoardPositionIndex] =
								proposedNewPosition;
							logger(gameStats, diceRoll);
						} else if (newPositionIsAStartPosition === false) {
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
				if (diceRoll === 6) {
					const startPosition = startPositions[currentMovePlayer];
					const startPositionOccupied = checkIfPositionIsOccupied(
						gameStats,
						startPosition
					);
					const pegToMove = gameStats[currentMovePlayer].positions.indexOf("h");
					if (startPositionOccupied === true) {
						const pegToMoveColor = getColorOfPegAtPosition(gameStats, startPosition);
						const pegToMoveIndex =
							gameStats[pegToMoveColor].positions.indexOf(startPosition);
						gameStats[pegToMoveColor].positions[pegToMoveIndex] = "h";
						gameStats[currentMovePlayer].positions[pegToMove] = startPosition;
					} else if (startPositionOccupied === false) {
						gameStats[currentMovePlayer].positions[pegToMove] = startPosition;
						logger(gameStats, diceRoll);
						continue;
					}
				} else {
					// turn skipped
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
