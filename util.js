const names = [
	"Mary",
	"Patricia",
	"Jennifer",
	"Elizabeth",
	"Linda",
	"Barbara",
	"Susan",
	"Margaret",
	"Dorothy",
	"Sarah",
	"John",
	"Robert",
	"Michael",
	"William",
	"David",
	"Richard",
	"Joseph",
	"Thomas",
	"Charles",
	"Christopher",
];

const fourRandomNames = () => {
	// generate 4 random names from the name array
	const namesArray = [];
	while (namesArray.length < 4) {
		const randomName = randomItemFromArray(names);
		if (!namesArray.includes(randomName)) {
			namesArray.push(randomName);
		}
	}
	return namesArray;
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const splitIntoChunk = (arr, chunk) => {
	const array = [];
	for (let i = 0; i < arr.length; i += chunk) {
		let tempArray;
		tempArray = arr.slice(i, i + chunk);
		array.push(tempArray);
	}
	return array;
};

const randomItemFromArray = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};

const rollDice = () => {
	return Math.floor(Math.random() * 6) + 1;
};

const onlyNumbers = (str) => {
	return /^[0-9]+$/.test(str);
};

const addEmoji = (color) => {
	switch (color) {
		case "blue":
			return "🟦";
		case "yellow":
			return "🟨";
		case "pink":
			return "🟪";
		case "green":
			return "🟩";
	}
};

const checkIfPositionIsOccupied = (gameStats, position) => {
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

	if (positionsArray.includes(position)) {
		return true;
	}
};

export {
	timer,
	splitIntoChunk,
	fourRandomNames,
	rollDice,
	onlyNumbers,
	addEmoji,
	checkIfPositionIsOccupied,
};
