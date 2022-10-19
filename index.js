import input from "input";
import clear from "clear";
import { title } from "./render.js";
import { fourRandomNames } from "./util.js";
import { newRound } from "./logic/index.js";

const logPlayers = (names) => {
	console.log(`
PLAYERS:
    🟨 - ${names[0]}
    🟦 - ${names[1]}
    🟪 - ${names[2]}
    🟩 - ${names[3]}
    
`);
};

async function menu() {
	let gameOpen = true;
	while (gameOpen) {
		clear();
		console.log(title);
		const names = fourRandomNames();
		const choice = await input.select(`Welcome to Terminal Trouble. Please select:`, [
			"Start a new round",
			"View players",
		]);
		if (choice === "Start a new round") {
			newRound(names);
			continue;
		} else if (choice === "View players") {
			logPlayers(names);
			const choice = await input.confirm(`Return to menu?`);
			if (choice === "Yes") {
				continue;
			}
		}
	}
}

menu();
