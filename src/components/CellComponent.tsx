import React from 'react';
import { Cell } from '../models/Cell';

interface ICellProps {
    cell: Cell;
    selected: boolean;
    onClick: (cell: Cell) => void;
}

export function CellComponent({cell, selected, onClick}: ICellProps) {
    return (
        <div className={['cell', cell.color, selected ? 'selected' : '', cell.available && cell.figure ? 'target' : ''].join(' ')} onClick={() => onClick(cell)}>
            {cell.available && !cell.figure && <div className='available' />}
            {cell.figure?.logo && <img src={cell.figure.logo} width={50} height={50} />}
        </div>
    )
}
