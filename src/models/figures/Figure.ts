import { Colors } from "../Colors";
import logo from '../../assets/black-bishop.png';
import { Cell } from "../Cell";

export enum FigureNames {
    FIGURE = 'Фигура',
    KING = 'Король',
    QUEEN = 'Ферзь',
    BISHOP = 'Слон',
    ROOK = 'Ладья',
    KNIGHT = 'Конь',
    PAWN = 'Пешка',
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.cell = cell;
        this.color = color;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) {
            return false;
        }

        if (target.figure?.name === FigureNames.KING) {
            return false;
        }

        if (this.cell.figure?.name === FigureNames.KING && target.figure) {
            return false;
        }

        return true;
    }

    moveFigure(target: Cell) {}
}
