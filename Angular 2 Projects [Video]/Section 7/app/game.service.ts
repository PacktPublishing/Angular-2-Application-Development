import {Injectable} from "@angular/core";
import Game from "./game-logic/game";
import Move from "./game-logic/move";
import Square from "./game-logic/square";

@Injectable()
export default class GameService {
    private game = new Game();
    private validMoves: Move[] = [];
    private selectedSquare: Square;

    getPieces() {
        return this.game.getPieces();
    }

    getSelectedSquare() {
        return this.selectedSquare;
    }

    getTurn() {
        return this.game.getTurn();
    }

    getValidMoves() {
        return this.validMoves;
    }

    getWinner() {
        return this.game.getWinner();
    }

    reset() {
        this.game = new Game();
    }

    selectSquare(square: Square) {
        const currentSide = this.game.getTurn();
        const newlySelectedPiece = this.game.getPiece(square);
        if (newlySelectedPiece == undefined) {
            const isValidMove =
                this.game.getValidMovesForSquare(this.selectedSquare)
                    .map(x => x.getTargetSquare())
                    .filter(x => x.getColumn() === square.getColumn() && x.getRow() === square.getRow())
                    .length > 0;

            if (isValidMove) {
                const move = new Move(this.selectedSquare, square);
                this.game.move(move);
            }

            this.selectedSquare = undefined;
            this.validMoves = [];
        } else if (newlySelectedPiece.getSide() === currentSide) {
            this.selectedSquare = square;
            this.validMoves = this.game.getValidMovesForSquare(square);
        } else {
            this.selectedSquare = undefined;
            this.validMoves = [];
        }
    }
}