const startPositions = {
 yellow: "2",
 blue: "9",
 pink: "16",
 green: "23",
};

const checkIfMovingPeg = (gameStats, currentMovePlayer) => {
 const pegsOnBoard = gameStats[currentMovePlayer].positions.filter(
  (peg) => peg !== "h" && peg.substring(0, 1) !== "f"
 );
 if (pegsOnBoard.length === 0) {
  return false;
 } else {
  return true;
 }
};

const findIndexOfPegOnBoard = (gameStats, currentMovePlayer) => {
 // return the index of the peg that does not have a value of "h" or substring of "f" using indexOf
 const pegsOnBoard = gameStats[currentMovePlayer].positions.filter(
  (peg) => peg !== "h" && peg.substring(0, 1) !== "f"
 );
 const indexOfPegOnBoard = gameStats[currentMovePlayer].positions.indexOf(pegsOnBoard[0]);
 return indexOfPegOnBoard;
};

const calculateNewPosition = (currentPosition, diceRoll) => {
 const newPosition = Number(currentPosition) + diceRoll;
 if (newPosition > 28) {
  return String(newPosition - 28);
 } else {
  return String(newPosition);
 }
};

const checkIfPositionIsOccupied = (gameStats, newPosition) => {
 const allPegsOnBoardArray = Object.values(gameStats)
  .map((player) => player.positions)
  .flat();
 const pegsOnBoard = allPegsOnBoardArray;
 if (pegsOnBoard.includes(newPosition)) {
  return true;
 } else {
  return false;
 }
};

const checkNumberOfPegsInFinishSlot = (gameStats, currentMovePlayer) => {
 const pegsInFinishSlot = gameStats[currentMovePlayer].positions.filter(
  (peg) => peg.substring(0, 1) === "f"
 );
 return pegsInFinishSlot.length;
};

const findDistanceFromStart = (position, currentMovePlayer) => {
 const distanceFromStart = Number(position) - Number(startPositions[currentMovePlayer]);
 if (distanceFromStart < 0) {
  return distanceFromStart + 28;
 } else {
  return distanceFromStart;
 }
};

const checkIfPositionIsAStartPosition = (position) => {
 const startPositionsArray = Object.values(startPositions);
 if (startPositionsArray.includes(position)) {
  return true;
 } else {
  return false;
 }
};

const getColorOfPegAtPosition = (gameStats, position) => {
 const colors = ["yellow", "blue", "pink", "green"];
 const allPegsOnBoardArray = Object.values(gameStats)
  .map((player) => player.positions)
  .flat();
 const pegsOnBoard = allPegsOnBoardArray;
 if (pegsOnBoard.includes(position)) {
  const indexOfPegAlreadyAtPosition = pegsOnBoard.indexOf(position);
  const dividedIndex = indexOfPegAlreadyAtPosition / 4;
  const color = colors[Math.floor(dividedIndex)];
  // console.log(`${color} currently at position ${position}`);
  return color;
 } else {
  return false;
 }
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const rollDice = () => {
 return Math.floor(Math.random() * 6) + 1;
};

export {
 checkIfMovingPeg,
 findIndexOfPegOnBoard,
 calculateNewPosition,
 checkIfPositionIsOccupied,
 checkNumberOfPegsInFinishSlot,
 findDistanceFromStart,
 checkIfPositionIsAStartPosition,
 getColorOfPegAtPosition,
 timer,
 rollDice,
 startPositions,
};
