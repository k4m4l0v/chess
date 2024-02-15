import { useEffect, useState } from 'react';
import './app.css'
import { BoardComponent } from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import { LostFigures } from './components/LostFigures';
import { Timer } from './components/Timer';

export function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [gameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    restart();
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function endGame() {
    setGameEnd(true)
  }

  function winnerSet(win: string) {
    setWinner(win);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  return (
    <>
      <h1>Текущий игрок {currentPlayer?.color}</h1>
      {gameEnd &&
        <h1>{winner} победили!</h1>
      }
      <div className='app'>
        <Timer 
        restart={restart} 
        currentPlayer={currentPlayer}
        setGameEnd={endGame}
        setWinner={winnerSet}
        />
        <BoardComponent 
        board={board} 
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer} 
        />
        <div>
          <LostFigures title='Черные фигуры' figures={board.lostBlackFigures} />
          <LostFigures title='Белые фигуры' figures={board.lostWhiteFigures} />
        </div>
      </div>
    </>
  );
}
