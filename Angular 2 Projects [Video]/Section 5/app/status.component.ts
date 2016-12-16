import {Component} from "@angular/core";
import {Side} from "./game-logic/side";
import GameService from "./game.service";

@Component({
    selector: "status",
    template: `
        <div class="row status">
            <div class="col-xs-12">
                <span *ngIf="getWinner() == undefined">{{getTurn()}} to move</span>
                <span *ngIf="getWinner() != undefined">
                    {{getWinner()}} wins!
                    <button class="btn btn-default" (click)="resetGame()">Play again</button>
                </span>
            </div>
        </div>
    `
})
export default class PieceComponent {
    constructor(private game: GameService) {}

    getTurn() {
        return PieceComponent.sideToString(this.game.getTurn());
    }

    getWinner() {
        return PieceComponent.sideToString(this.game.getWinner());
    }

    resetGame() {
        this.game.reset();
    }

    private static sideToString(side: Side) {
        switch (side) {
            case Side.Dark:
                return "Red";
            case Side.Light:
                return "White";
            default:
                return undefined;
        }
    }
}