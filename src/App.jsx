import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { useState } from "react";
import {WINNING_COMBINATIONS} from './winning-combinations.js';
import GameOver from './components/gameOver.jsx';

const initialGameBoard=
[
[null,null,null],
[null,null,null],
[null,null,null],
];

 function deriveActivePlayer(gameTurns)
 {
  let currentPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
    return currentPlayer;
 }

function App() {
const [players,setPlayers]= useState({
  'X': 'palyer 1',
  'O': 'palyer 2'
});

const [gameTurns,setGameTurns] = useState([]);
let winner;
let gameBoard = [...initialGameBoard.map(array => [...array])];


for (const turn of gameTurns){
  const {square,player} = turn;
  const {row,col}=square;
  gameBoard[row][col] = player;
}

for (const combination of WINNING_COMBINATIONS){
  const first = gameBoard[combination[0].row][combination[0].column];
  const second = gameBoard[combination[1].row][combination[1].column];
  const third = gameBoard[combination[2].row][combination[2].column];
  if(first && first === second && first === third)
     winner = players[first];
}

 const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex,colIndex){
setGameTurns((prevTurns) => {
    const currentPlayer = deriveActivePlayer(prevTurns);
    const updatedTurns = [{square: {row :rowIndex,col: colIndex },player: currentPlayer},
    ...prevTurns,
    ];
      return updatedTurns;
    });
  }
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart(){
    setGameTurns([]);
  }
function handlePlayerNameChange(symbol,newName){
  setPlayers(prevPlayers => {
    return {
      ...prevPlayers,
      [symbol]: newName
  };
  });
}
  return (
  <main>
    <div id="game-container">
    <ol id="players" className="highlight-player">
    <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} 
    onChangeName={handlePlayerNameChange} />
    <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'} 
    onChangeName={handlePlayerNameChange} />
    </ol>
    {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
    <GameBoard  onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main> 
  );
}

export default App
