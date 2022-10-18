import clear from "clear";

import { rollDice, timer } from "./util.js";
import { logger } from "./render.js";

/*
Bugs:
Pegs can be moved to the same position
Movement is not animated
*/

clear();

const startPositions = {
 yellow: "2",
 blue: "9",
 pink: "16",
 green: "23",
};

const finishSlotStartPositions = {
 yellow: "1",
 blue: "5",
 pink: "9",
 green: "13",
};

const calculateFinishMoveboardPosition = (currentMovePlayer) => {
 return startPositions[currentMovePlayer] - 1;
};

const movePegToStart = (currentPlayersPegPositions, currentMovePlayer) => {
 const pegToMove = currentPlayersPegPositions.findIndex((position) => position === "h");
 currentPlayersPegPositions[pegToMove] = startPositions[currentMovePlayer];
 return currentPlayersPegPositions;
};

const checkNumberOfPegsInFinish = (color, gameStats) => {
 const pegsInFinish = gameStats[color].positions.filter(
  (position) => position.substring(0, 1) === "f"
 ).length;
 return pegsInFinish;
};

const checkNumberOfPegsMoving = (color, gameStats) => {
 const pegsMoving = gameStats[color].positions.filter(
  (position) => position !== "h" && position.substring(0, 1) !== "f"
 ).length;
 return pegsMoving;
};

const findIndexOfMovingPeg = (currentPlayersPegPositions) => {
 const pegToMove = currentPlayersPegPositions.findIndex(
  (position) => position !== "h" && position.substring(0, 1) !== "f"
 );
 return pegToMove;
};

const returnFilledFinishSlots = (currentPlayersPegPositions) => {
 const pegsInFinish = currentPlayersPegPositions.filter(
  (position) => position.substring(0, 1) === "f"
 );
 const unavailableSlots = [];
 for (let i = 0; i < pegsInFinish.length; i++) {
  const currentFinishPeg = pegsInFinish[i];
  unavailableSlots.push(Number(currentFinishPeg.substring(1)) - 1);
 }
 return unavailableSlots;
};

const checkForWinner = (gameStats) => {
 const yellowPegsInFinish = checkNumberOfPegsInFinish("yellow", gameStats);
 const bluePegsInFinish = checkNumberOfPegsInFinish("blue", gameStats);
 const pinkPegsInFinish = checkNumberOfPegsInFinish("pink", gameStats);
 const greenPegsInFinish = checkNumberOfPegsInFinish("green", gameStats);
 if (yellowPegsInFinish === 4) {
  return "yellow";
 } else if (bluePegsInFinish === 4) {
  return "blue";
 } else if (pinkPegsInFinish === 4) {
  return "pink";
 } else if (greenPegsInFinish === 4) {
  return "green";
 }
 return false;
};

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
   const currentPlayersPegPositions = gameStats[currentMovePlayer].positions;

   const diceRoll = rollDice();
   if (diceRoll === 6) {
    if (checkNumberOfPegsMoving(currentMovePlayer, gameStats) === 0) {
     const newPosition = movePegToStart(currentPlayersPegPositions, currentMovePlayer);
     gameStats[currentMovePlayer].positions = newPosition;
     const movingPeg = findIndexOfMovingPeg(currentPlayersPegPositions);
     console.log(movingPeg + " is the moving peg.");
     const newDiceRoll = await rollDice();

     const numLocationOfPegMovedFromStart =
      Number(gameStats[currentMovePlayer].positions[movingPeg]) + newDiceRoll;
     gameStats[currentMovePlayer].positions[movingPeg] = numLocationOfPegMovedFromStart.toString();
    }
   } else {
    if (checkNumberOfPegsMoving(currentMovePlayer, gameStats) === 0) {
     console.log("No pegs are moving");
    } else {
     const movingPeg = findIndexOfMovingPeg(currentPlayersPegPositions);
     console.log(movingPeg + " is the moving peg.");

     let numLocationOfPegMoved =
      Number(gameStats[currentMovePlayer].positions[movingPeg]) + diceRoll;
     let neededToBeChanged = false;
     numLocationOfPegMoved > 28 ? (neededToBeChanged = true) : (neededToBeChanged = false);
     numLocationOfPegMoved > 28 ? (numLocationOfPegMoved = numLocationOfPegMoved - 28) : null;

     console.log(`Current position: ${currentPlayersPegPositions[movingPeg]}`);
     console.log(`New position: ${numLocationOfPegMoved}`);
     if (neededToBeChanged) {
      if (
       calculateFinishMoveboardPosition(currentMovePlayer) >
        currentPlayersPegPositions[movingPeg] - 28 &&
       calculateFinishMoveboardPosition(currentMovePlayer) < numLocationOfPegMoved
      ) {
       console.log("Finish is in between");
       const filledSlots = returnFilledFinishSlots(currentPlayersPegPositions);
       const positionOnArray = Number(finishSlotStartPositions[currentMovePlayer]) - 1;
       const distance = Math.abs(
        currentPlayersPegPositions[movingPeg] -
         28 -
         calculateFinishMoveboardPosition(currentMovePlayer)
       );
       console.log(`The distance between the two is ${distance}`);
       const finishPositionFromDiceRoll = `f${diceRoll - distance + positionOnArray}`;

       if (filledSlots.includes(finishPositionFromDiceRoll)) {
        console.log("Sorry, that number is already reserved.");
        return;
       } else {
        gameStats[currentMovePlayer].positions[movingPeg] = finishPositionFromDiceRoll;
       }
       console.log(`Finish position from diceroll: ${finishPositionFromDiceRoll}`);
      } else {
       gameStats[currentMovePlayer].positions[movingPeg] = numLocationOfPegMoved.toString();
      }
     } else {
      if (
       calculateFinishMoveboardPosition(currentMovePlayer) >
        currentPlayersPegPositions[movingPeg] &&
       calculateFinishMoveboardPosition(currentMovePlayer) < numLocationOfPegMoved
      ) {
       const filledSlots = returnFilledFinishSlots(currentPlayersPegPositions);
       const positionOnArray = Number(finishSlotStartPositions[currentMovePlayer]) - 1;
       const distance = Math.abs(
        currentPlayersPegPositions[movingPeg] - calculateFinishMoveboardPosition(currentMovePlayer)
       );
       console.log(`The distance between the two is ${distance}`);
       const finishPositionFromDiceRoll = `f${diceRoll - distance + positionOnArray}`;

       if (filledSlots.includes(finishPositionFromDiceRoll)) {
        console.log("Sorry, that number is already reserved.");
        return;
       } else {
        gameStats[currentMovePlayer].positions[movingPeg] = finishPositionFromDiceRoll;
       }
       console.log(`Finish position from diceroll: ${finishPositionFromDiceRoll}`);
      } else {
       gameStats[currentMovePlayer].positions[movingPeg] = numLocationOfPegMoved.toString();
      }
     }
    }
   }

   logger(gameStats, diceRoll, currentMovePlayer);

   await timer(75);
   if (checkForWinner(gameStats)) {
    console.log(gameStats);
    console.log("Winner!");
    console.log(checkForWinner(gameStats));
    winner.push(winner);
   }

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
