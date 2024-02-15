import React, { useState, useEffect } from 'react';
import { Board } from '../models/Board';
import { CellComponent } from './CellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';

interface IBoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

export function BoardComponent({board, setBoard, currentPlayer, swapPlayer}: IBoardProps) {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const handleClick = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div className='board'>
            {board.cells.map((row, i) =>
                <React.Fragment key={i}>
                    {row.map(cell => 
                        <CellComponent 
                            cell={cell} 
                            key={cell.id}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            onClick={handleClick}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}
