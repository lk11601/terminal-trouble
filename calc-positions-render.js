import { onlyNumbers, splitIntoChunk, addEmoji } from "./util.js";
import { renderGameboard } from "./render.js";

const calcFinishPositions = (positionObject) => {
	const defaultFinish = [
		"🟡",
		"🟡",
		"🟡",
		"🟡",
		"🔵",
		"🔵",
		"🔵",
		"🔵",
		"🟣",
		"🟣",
		"🟣",
		"🟣",
		"🟢",
		"🟢",
		"🟢",
		"🟢",
	];
	const runColour = (colour) => {
		const colourPositions = positionObject[colour];
		const colourValues = Object.values(colourPositions);
		for (let i = 0; i < colourValues.length; i++) {
			const currentValue = colourValues[i];
			// get first four characters of string
			const firstFour = currentValue.substring(0, 1);
			if (firstFour === "f") {
				// get numbers after f
				const number = Number(currentValue.substring(1));
				defaultFinish.splice(number - 1, 1, addEmoji(colour));
			}
		}
	};
	runColour("yellow");
	runColour("blue");
	runColour("pink");
	runColour("green");
	const defaultFinishSplit = splitIntoChunk(defaultFinish, 4);
	return defaultFinishSplit;
};

const calcHomePositions = (positionObject) => {
	const defaultHome = [];

	const runColour = (colour) => {
		const colourArray = [];
		const colourPositions = positionObject[colour];
		const colourValues = Object.values(colourPositions);
		for (let i = 0; i < colourValues.length; i++) {
			const currentValue = colourValues[i];
			if (currentValue === "h") {
				colourArray.push(addEmoji(colour));
			} else {
				colourArray.push("⬜");
			}
		}
		defaultHome.push(colourArray);
	};
	runColour("yellow");
	runColour("blue");
	runColour("pink");
	runColour("green");
	return defaultHome;
};

const calcMoveboardPositions = (positionObject) => {
	const defaultMoveboard = [
		"🟡",
		"🟡",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"🔵",
		"🔵",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"🟣",
		"🟣",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"🟢",
		"🟢",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
	];
	const runColour = (colour) => {
		const colourPositions = positionObject[colour];
		const colourValues = Object.values(colourPositions);
		const colourValuesOnlyNumbers = colourValues.filter(onlyNumbers);
		for (let i = 0; i < colourValuesOnlyNumbers.length; i++) {
			const currentValue = Number(colourValuesOnlyNumbers[i]);
			defaultMoveboard.splice(currentValue - 1, 1, addEmoji(colour));
		}
	};
	runColour("yellow");
	runColour("blue");
	runColour("pink");
	runColour("green");
	const moveboardSplit = splitIntoChunk(defaultMoveboard, 7);
	return moveboardSplit;
};

const calcMoveboardArray = (gameStats) => {
	const entries = Object.entries(gameStats);
	const keys = Object.keys(gameStats);

	const positionsArray = entries.map((val) => {
		const positions = val[1].positions;
		return positions;
	});
	const positionObject = {};
	for (let i = 0; i < positionsArray.length; i++) {
		positionObject[keys[i]] = positionsArray[i];
	}

	const defaultMoveboard = [
		"🟡",
		"🟡",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"🔵",
		"🔵",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"🟣",
		"🟣",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"🟢",
		"🟢",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
		"⬜",
	];
	const runColour = (colour) => {
		const colourPositions = positionObject[colour];
		const colourValues = Object.values(colourPositions);
		const colourValuesOnlyNumbers = colourValues.filter(onlyNumbers);
		for (let i = 0; i < colourValuesOnlyNumbers.length; i++) {
			const currentValue = Number(colourValuesOnlyNumbers[i]);
			defaultMoveboard.splice(currentValue - 1, 1, addEmoji(colour));
		}
	};
	runColour("yellow");
	runColour("blue");
	runColour("pink");
	runColour("green");
	return defaultMoveboard;
};

const calcPositions = (gameStats, diceRoll) => {
	const entries = Object.entries(gameStats);
	const keys = Object.keys(gameStats);

	const positionsArray = entries.map((val) => {
		const positions = val[1].positions;
		return positions;
	});
	const positionObject = {};
	for (let i = 0; i < positionsArray.length; i++) {
		positionObject[keys[i]] = positionsArray[i];
	}

	const moveboardSplit = calcMoveboardPositions(positionObject);
	const homeboardSplit = calcHomePositions(positionObject);
	const finishSplit = calcFinishPositions(positionObject);

	const gameboard = renderGameboard(homeboardSplit, moveboardSplit, finishSplit, diceRoll);

	return gameboard;
};

export { calcPositions, calcMoveboardArray };
