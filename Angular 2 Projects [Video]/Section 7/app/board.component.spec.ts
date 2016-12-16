import BoardComponent from "./board.component";
import Square from "./game-logic/square";
import GameService from "./game.service";
import Piece from "./game-logic/piece";

describe("BoardComponent", () => {
    it("returns game.getPieces() when getPieces() is called", () => {
        const pieces: Array<Array<Piece>> = [];
        const game = {
            getPieces: () => pieces
        };
        const board = new BoardComponent(game as GameService);
        const actualPieces = board.getPieces();
        expect(pieces).toEqual(actualPieces);
    });

    describe("when onSelect is called", () => {
        let game: any;
        let board: BoardComponent;

        beforeEach(() => {
            game = {
                selectSquare: () => {},
                getValidMoves: () => [] as Array<any>
            } as any;
            board = new BoardComponent(game);
        });

        it("does not select a square when the square can't contain a piece", () => {
            spyOn(game, "selectSquare");
            board.onSelect(0, 0);
            expect(game.selectSquare.calls.count()).toBe(0);
        });

        it("selects a square when the square can contain a piece", () => {
            spyOn(game, "selectSquare");
            board.onSelect(0, 1);
            expect(game.selectSquare.calls.count()).toBe(1);
        });

        it("passes a square of the proper row to selectSquare when the square can contain a piece", () => {
            spyOn(game, "selectSquare");
            const row = 0;
            board.onSelect(row, 1);
            const passedSquare = game.selectSquare.calls.argsFor(0)[0] as Square;
            expect(passedSquare.getRow()).toBe(row);
        });
    });
});