import {Component} from "@angular/core";
import GameService from "./game.service";
import Square from "./game-logic/square";

@Component({
    selector: "board",
    template: `
        <div class="row">
            <div class="col-xs-12">
                <table class="board">
                    <tr *ngFor="let row of getPieces(); let rowIndex = index">
                        <td *ngFor="let piece of row; let columnIndex = index"
                            class="square" (click)="onSelect(rowIndex, columnIndex)"
                            [ngClass]="{dark: ((rowIndex + columnIndex) % 2 === 1), movable: isMovableSquare(rowIndex, columnIndex)}">
                            <piece *ngIf="piece != undefined" [isKinged]="piece.getIsKinged()" [side]="piece.getSide()"></piece>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `
})
export default class BoardComponent {
    constructor(private game: GameService) {}
    private movableSquares: Array<Square> = [];

    getPieces() {
        return this.game.getPieces();
    }

    isMovableSquare(row: number, column: number) {
        return this.movableSquares.filter(x => x.getRow() === row && x.getColumn() === column).length > 0;
    }

    onSelect(row: number, column: number) {
        if ((row + column) % 2 === 0) {
            return;
        }

        const square = new Square(row, column);
        this.game.selectSquare(square);
        this.movableSquares = this.game.getValidMoves().map(x => x.getTargetSquare());
    }
}