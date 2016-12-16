import {MoveDirection} from "./move-direction";
import Square from "./square";
import Piece from "./piece";
import Move from "./move";
import {Side} from "./side";

enum HorizontalDirection {
    None,
    Positive,
    Negative
}

function invertTurn(turn: Side) {
    return turn === Side.Dark ? Side.Light : Side.Dark;
}

export default class Board {
    private darkCount: number;
    private lightCount: number;
    private turn: Side;
    private validMoves: Array<Move>;

    constructor(private pieces?: Array<Array<Piece>>, previousTurn?: Side, lastJumpTargetSquare?: Square) {
        if (pieces == undefined) {
            this.pieces = Board.getInitialPieces();
        }

        const allPieces = Board.flattenPieceArray(this.pieces);
        this.darkCount = allPieces.filter(x => x.getSide() === Side.Dark).length;
        this.lightCount = allPieces.filter(x => x.getSide() === Side.Light).length;

        if (lastJumpTargetSquare != undefined) {
            const nextJumps = Board.calculateValidMoves(this.pieces, previousTurn)
                .filter(x => x.getIsJump() && x.getSourceSquare().isEquivalentTo(lastJumpTargetSquare));
            this.turn = nextJumps.length > 0 ? previousTurn : invertTurn(previousTurn);
        } else {
            this.turn = invertTurn(previousTurn);
        }

        this.validMoves = Board.calculateValidMoves(this.pieces, this.turn);
    }

    getDarkCount() {
        return this.darkCount;
    }

    getLightCount() {
        return this.lightCount;
    }

    getPieces() {
        return this.pieces;
    }

    getPiece(square: Square) {
        return Board.getPiece(this.pieces, square);
    }

    getTurn() {
        return this.turn;
    }

    getValidMovesForSquare(startingSquare: Square) {
        return this.validMoves.filter(x => x.getSourceSquare().isEquivalentTo(startingSquare)) || [];
    }

    applyMove(move: Move) {
        let piece = this.getPiece(move.getSourceSquare());
        if (piece == undefined) {
            throw Error("The move's source square does not contain a piece.");
        }

        if (this.getPiece(move.getTargetSquare())) {
            throw Error("The move's target square contains a piece.");
        }

        const pieces = this.clonePieces();
        const source = move.getSourceSquare();
        const target = move.getTargetSquare();
        Board.setPiece(pieces, source, undefined);
        if ((target.getRow() === 0 || target.getRow() === 7) && !piece.getIsKinged()) {
            piece = new Piece(piece.getSide(), true);
        }

        Board.setPiece(pieces, target, piece);
        if (move.getIsJump()) {
            const jumpedRow = move.getSourceSquare().getRow() + ((move.getTargetSquare().getRow() - move.getSourceSquare().getRow()) / 2);
            const jumpedColumn = move.getSourceSquare().getColumn() + ((move.getTargetSquare().getColumn() - move.getSourceSquare().getColumn()) / 2);
            const jumpedSquare = new Square(jumpedRow, jumpedColumn);
            Board.setPiece(pieces, jumpedSquare, undefined);
        }

        const jumpTargetSquare = move.getIsJump() ? move.getTargetSquare() : undefined;
        return new Board(pieces, this.turn, jumpTargetSquare);
    }

    private static calculatePotentialMoves(pieces: Array<Array<Piece>>, startingSquare: Square) {
        if (startingSquare == undefined) {
            return [];
        }

        if (!startingSquare.getIsValid()) {
            throw new Error("The square is invalid.");
        }

        const piece = Board.getPiece(pieces, startingSquare);
        if (piece == undefined) {
            return [];
        }

        const validMoves: Array<Move> = [];
        if (piece.getMoveDirection() & MoveDirection.Forward) {
            validMoves.push(this.calculateValidMoveInQuadrant(
                pieces, startingSquare, HorizontalDirection.Negative, MoveDirection.Forward));
            validMoves.push(this.calculateValidMoveInQuadrant(
                pieces, startingSquare, HorizontalDirection.Positive, MoveDirection.Forward));
        }

        if (piece.getMoveDirection() & MoveDirection.Backward) {
            validMoves.push(this.calculateValidMoveInQuadrant(
                pieces, startingSquare, HorizontalDirection.Negative, MoveDirection.Backward));
            validMoves.push(this.calculateValidMoveInQuadrant(
                pieces, startingSquare, HorizontalDirection.Positive, MoveDirection.Backward));
        }

        return validMoves.filter(x => x != undefined);
    }

    private static calculateValidMoves(pieces: Array<Array<Piece>>, turn: Side) {
        const validJumps: Array<Move> = [];
        const validNonJumps: Array<Move> = [];
        pieces.forEach((pieceArray, row) => {
            pieceArray
                .forEach((piece, column) => {
                    if (piece == undefined || piece.getSide() !== turn) {
                        return;
                    }

                    const square = new Square(row, column);
                    const potentialMoves = this.calculatePotentialMoves(pieces, square);
                    const potentialJumps = potentialMoves.filter(x => x.getIsJump());

                    if (potentialJumps.length > 0) {
                        validJumps.push.apply(validJumps, potentialJumps);
                    } else if (potentialMoves.length > 0 && validJumps.length === 0 && validNonJumps !== undefined) {
                        validNonJumps.push.apply(validNonJumps, potentialMoves);
                    }
                });
        });

        return validJumps.length > 0 ? validJumps : validNonJumps;
    }

    private static getPiece(pieces: Array<Array<Piece>>, square: Square) {
        return pieces[square.getRow()][square.getColumn()];
    }

    private static setPiece(pieces: Array<Array<Piece>>, square: Square, piece: Piece) {
        pieces[square.getRow()][square.getColumn()] = piece;
    }

    private static flattenPieceArray(pieces: Array<Array<Piece>>): Array<Piece> {
        return [].concat.apply([], pieces).filter((x: Piece) => x != undefined);
    }

    private clonePieces() {
        const pieces: Array<Array<Piece>> = Board.getEmptyPiecesArray();
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                // We can reuse pieces because they are immutable.
                pieces[row][column] = this.pieces[row][column];
            }
        }

        return pieces;
    }

    private static calculateValidMoveInQuadrant(pieces: Array<Array<Piece>>, startingSquare: Square,
        horizontalDirection: HorizontalDirection, moveDirection: MoveDirection) {
        let columnModifier: number;
        if (horizontalDirection === HorizontalDirection.Positive) {
            columnModifier = 1;
        } else if (horizontalDirection === HorizontalDirection.Negative) {
            columnModifier = -1;
        } else {
            throw new Error("Invalid row move direction.");
        }

        let rowModifier: number;
        if (moveDirection === MoveDirection.Forward) {
            rowModifier = -1;
        } else if (moveDirection === MoveDirection.Backward) {
            rowModifier = 1;
        } else {
            throw new Error("Invalid column move direction.");
        }

        const moveSquareRow = startingSquare.getRow() + rowModifier;
        const moveSquareColumn = startingSquare.getColumn() + columnModifier;
        const moveSquare = new Square(moveSquareRow, moveSquareColumn);
        if (moveSquare.getIsValid()) {
            const moveSquarePiece = Board.getPiece(pieces, moveSquare);
            if (moveSquarePiece == undefined) {
                return new Move(startingSquare, moveSquare);
            }

            if (moveSquarePiece != undefined && moveSquarePiece.getSide() !== Board.getPiece(pieces, startingSquare).getSide()) {
                const jumpSquareRow = moveSquare.getRow() + rowModifier;
                const jumpSquareColumn = moveSquare.getColumn() + columnModifier;
                const jumpSquare = new Square(jumpSquareRow, jumpSquareColumn);
                if (jumpSquare.getIsValid())             {
                    const jumpSquarePiece = Board.getPiece(pieces, jumpSquare);
                    if (jumpSquarePiece == undefined) {
                        return new Move(startingSquare, jumpSquare);
                    }
                }
            }
        }
    }

    private static getEmptyPiecesArray() {
        const pieces: Array<Array<Piece>> = [];
        for (let i = 0; i < 8; i++) {
            pieces[i] = [];
        }

        return pieces;
    }

    private static getInitialPieces() {
        const pieces = this.getEmptyPiecesArray();
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                pieces[row][column] =
                    (row + column) % 2 === 1 && row !== 3 && row !== 4 ?
                    new Piece(row < 4 ? Side.Light : Side.Dark) :
                    undefined;
            }
        }

        return pieces;
    }
}