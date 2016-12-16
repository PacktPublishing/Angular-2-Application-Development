import {Component, Input} from "@angular/core";
import {Side} from "./game-logic/side";

@Component({
    selector: "piece",
    template: `
        <div class="piece" [ngClass]="{red: isDark(), white: !isDark()}">
            {{isKinged ? "♕" : ""}}
        </div>
    `
})
export default class PieceComponent {
    @Input()
    isKinged: boolean;

    @Input()
    side: Side;

    isDark() {
        return this.side === Side.Dark;
    }
}