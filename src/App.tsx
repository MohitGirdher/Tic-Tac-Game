import React from 'react';
import Players from './Players';
import GameBoard from './GameBoard';
import Logs from './Logs';
import GameOver from './GameOver';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';

import './App.css';

export const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function derivedActivePlayer(gameTurns:any){
  let currentPlayer = 'X'

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = '0'
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [playerName, setPlayers] = useState({
    X: 'Player1',
    0: 'Player2'
})
  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(board => [...board])];

    for (const turn of gameTurns){
        const {symbol, player} = turn;
        const {row,col} = symbol;
        gameBoard[row][col] = player;
    }

    let winner;

    for (const combinations of WINNING_COMBINATIONS){
      let firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].col]
      let SecondSquareSymbol = gameBoard[combinations[1].row][combinations[1].col]
      let thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].col]
      
      if (firstSquareSymbol && firstSquareSymbol === SecondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = playerName[firstSquareSymbol]
      }
    }

    const hasDraw = gameTurns.length === 9 && !winner 

    
  
  function handleSelectSquare(rowIndex:any, colIndex:any){
    //setActivePlayer((prevPlayer:string) => prevPlayer=== 'X' ? '0': 'X');
    
    setGameTurns((prevTurns:any):any => {
      const currentPlayer = derivedActivePlayer(prevTurns)
      const updatedTurns = [{symbol : {row:rowIndex, col: colIndex}, player:currentPlayer},...prevTurns];

      return updatedTurns;
    })
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerName(symbol:any, newPlayerName:any){
    setPlayers((prevPlayers:any) => {
      return {
        ...prevPlayers,
      [symbol]: newPlayerName
      }
    })
  }
  return (
    <main>
      <div id ="tic-tac-game">
        <ol id ='players' className='highlight-player'>
            <Players initialName='Player1' playerSymbol='X' isActive={activePlayer === 'X'} onNameSaved = {handlePlayerName}/>
            <Players initialName='Player2' playerSymbol='0' isActive={activePlayer === '0'} onNameSaved = {handlePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch ={handleRematch}/>}
        <GameBoard 
         board={gameBoard}
         onSelectSquare={handleSelectSquare}
         />
      </div>
      <Logs turns={gameTurns}/> 
    </main>
   );
}

export default App;
