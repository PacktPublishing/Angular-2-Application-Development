import Board from "./board";
import Move from "./move";
import {Side} from "./side";
import Square from "./square";

export default class Game {
    private boards: Array<Board>;

    constructor(private board?: Board) {
        this.boards = [board || new Board()];
    }

    getPiece(square: Square) {
        return this.getBoard().getPiece(square);
    }

    getPieces() {
        return this.getBoard().getPieces();
    }

    getTurn() {
        return this.getBoard().getTurn();
    }

    getValidMovesForSquare(startingSquare: Square) {
        return this.getBoard().getValidMovesForSquare(startingSquare);
    }

    getWinner() {
        return this.getBoard().getDarkCount() === 0 ?
            Side.Light :
            this.getBoard().getLightCount() === 0 ?
                Side.Dark :
                undefined;
    }

    move(move: Move) {
        const newBoard = this.getBoard().applyMove(move);
        this.boards.push(newBoard);
    }

    private getBoard() {
        return this.boards[this.boards.length - 1];
    }
}