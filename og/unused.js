/*const currentPlayersPegPositions = (gameStats) => {
    return gameStats[currentMovePlayer].positions;
   };

   const diceRoll = await rollDice();
   if (checkNumberOfPegsMoving(currentMovePlayer, gameStats) === 0) {
    if (diceRoll === 6) {
     const newPosition = movePegToStart(currentPlayersPegPositions(gameStats), currentMovePlayer);
     gameStats[currentMovePlayer].positions = newPosition;
     const movingPeg = findIndexOfMovingPeg(currentPlayersPegPositions(gameStats));
     const newDiceRoll = await rollDice();

     const numLocationOfPegMovedFromStart =
      Number(gameStats[currentMovePlayer].positions[movingPeg]) + newDiceRoll;
     gameStats[currentMovePlayer].positions[movingPeg] = numLocationOfPegMovedFromStart.toString();
    } else {
     console.log("No pegs are moving");
    }
   } else {
    const movingPeg = findIndexOfMovingPeg(currentPlayersPegPositions(gameStats));
    console.log(movingPeg + " is the moving peg.");

    let numLocationOfPegMoved =
     Number(gameStats[currentMovePlayer].positions[movingPeg]) + diceRoll;
    let neededToBeChanged = false;
    numLocationOfPegMoved > 28 ? (neededToBeChanged = true) : (neededToBeChanged = false);
    numLocationOfPegMoved > 28 ? (numLocationOfPegMoved = numLocationOfPegMoved - 28) : null;

    console.log(`Current position: ${currentPlayersPegPositions(gameStats)[movingPeg]}`);
    console.log(`New position: ${numLocationOfPegMoved}`);
    if (neededToBeChanged) {
     if (
      calculateFinishMoveboardPosition(currentMovePlayer) >
       currentPlayersPegPositions(gameStats)[movingPeg] - 28 &&
      calculateFinishMoveboardPosition(currentMovePlayer) < numLocationOfPegMoved
     ) {
      console.log("Finish is in between");
      const filledSlots = returnFilledFinishSlots(currentPlayersPegPositions(gameStats));
      const positionOnArray = Number(finishSlotStartPositions[currentMovePlayer]) - 1;
      const distance = Math.abs(
       currentPlayersPegPositions(gameStats)[movingPeg] -
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
       currentPlayersPegPositions(gameStats)[movingPeg] &&
      calculateFinishMoveboardPosition(currentMovePlayer) < numLocationOfPegMoved
     ) {
      const filledSlots = returnFilledFinishSlots(currentPlayersPegPositions(gameStats));
      const positionOnArray = Number(finishSlotStartPositions[currentMovePlayer]) - 1;
      const distance = Math.abs(
       currentPlayersPegPositions(gameStats)[movingPeg] -
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
  */
