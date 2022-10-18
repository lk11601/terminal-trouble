import clear from "clear";
import { calcPositions } from "./calc-positions-render.js";

const title = `  _____                _     _      
 |_   _| __ ___  _   _| |__ | | ___ 
   | || '__/ _ \\| | | | '_ \\| |/ _ \\
   | || | | (_) | |_| | |_) | |  __/
   |_||_|  \\___/ \\__,_|_.__/|_|\\___|
`;

const renderGameboard = (homeboard, moveboard, finish, dieNumber) => {
 const gameboard = `
         ${homeboard[0][0]}${homeboard[0][1]}
         ${homeboard[0][2]}${homeboard[0][3]}

         ${moveboard[0][0]}${moveboard[0][1]}${moveboard[0][2]}${moveboard[0][3]}${moveboard[0][4]}${moveboard[0][5]}${moveboard[0][6]}      
       ${moveboard[3][6]}  ${finish[0][0]}${finish[0][1]}${finish[0][2]}${finish[0][3]}    ${moveboard[1][0]} ${homeboard[1][0]}${homeboard[1][1]}
       ${moveboard[3][5]}            ${finish[1][0]}${moveboard[1][1]} ${homeboard[1][2]}${homeboard[1][3]}
       ${moveboard[3][4]}${finish[3][3]}          ${finish[1][1]}${moveboard[1][2]}
       ${moveboard[3][3]}${finish[3][2]}    ${dieNumber}     ${finish[1][2]}${moveboard[1][3]}
       ${moveboard[3][2]}${finish[3][1]}          ${finish[1][3]}${moveboard[1][4]}
 ${homeboard[3][0]}${homeboard[3][1]}  ${moveboard[3][1]}${finish[3][0]}            ${moveboard[1][5]} 
 ${homeboard[3][2]}${homeboard[3][3]}  ${moveboard[3][0]}    ${finish[2][3]}${finish[2][2]}${finish[2][1]}${finish[2][0]}  ${moveboard[1][6]} 
         ${moveboard[2][6]}${moveboard[2][5]}${moveboard[2][4]}${moveboard[2][3]}${moveboard[2][2]}${moveboard[2][1]}${moveboard[2][0]}

                   ${homeboard[2][0]}${homeboard[2][1]}
                   ${homeboard[2][2]}${homeboard[2][3]}`;

 return gameboard;
};

const logger = (gameStats, diceRoll) => {
 clear();
 console.log(title);
 console.log(`
PLAYER DETAILS:
🟨 - ${gameStats.yellow.playerName}
🟦 - ${gameStats.blue.playerName}
🟪 - ${gameStats.pink.playerName}
🟩 - ${gameStats.green.playerName}`);
 console.log(calcPositions(gameStats, diceRoll));
};

export { title, renderGameboard, logger };
