import Square from "./square";

export default class Move {
    private isJump: boolean;
    private sourceSquare: Square;
    private targetSquare: Square;

    constructor(sourceSquare: Square, targetSquare: Square) {
        if (!sourceSquare.getIsValid()) {
            throw new Error("The source square is invalid.");
        }

        if (!targetSquare.getIsValid()) {
            throw new Error("The target square is invalid.");
        }

        const deltaRow = Math.abs(sourceSquare.getRow() - targetSquare.getRow());
        const deltaColumn = Math.abs(sourceSquare.getColumn() - targetSquare.getColumn());

        if (deltaRow === 1 && deltaColumn === 1) {
            this.isJump = false;
        } else if (deltaRow === 2 && deltaColumn === 2) {
            this.isJump = true;
        } else {
            throw new Error("The move is invalid.");
        }

        this.sourceSquare = sourceSquare;
        this.targetSquare = targetSquare;
    }

    getSourceSquare() {
        return this.sourceSquare;
    }

    getTargetSquare() {
        return this.targetSquare;
    }

    getIsJump() {
        return this.isJump;
    }
}