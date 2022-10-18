// import input from "input";
import clear from "clear";
import { title } from "./render.js";
import { fourRandomNames } from "./util.js";
import { newRound } from "./logic.js";

/*const logPlayers = (names) => {
 console.log(`
PLAYERS:
    🟨 - ${names[0]}
    🟦 - ${names[1]}
    🟪 - ${names[2]}
    🟩 - ${names[3]}
    
`);
};*/

async function menu() {
 clear();
 console.log(title);
 const names = fourRandomNames();
 newRound(names);
 /*const choice = await input.select(`Welcome to Terminal Trouble. Please select:`, [
		"Start a new round",
		"View players",
	]);
	if (choice === "Start a new round") {
		newRound(names);
	} else if (choice === "View players") {
		logPlayers(names);
		const choice = await input.confirm(`Return to menu?`);
		if (choice === "Yes") {
			return menu();
		}
	}*/
}

menu();
