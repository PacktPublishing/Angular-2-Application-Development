import 'angular2-universal-polyfills';
import {platformUniversalDynamic} from 'angular2-universal';
import {NgModule} from "@angular/core";
import {UniversalModule} from "angular2-universal";
import {AppComponent} from "./app.component";
import BoardComponent from "./board.component";
import PieceComponent from "./piece.component";
import StatusComponent from "./status.component";
import GameService from "./game.service";
import "./prod";

@NgModule({
    imports: [UniversalModule],
    declarations: [AppComponent, BoardComponent, PieceComponent, StatusComponent],
    bootstrap: [AppComponent],
    providers: [GameService]
})
export class AppModule { }

if (typeof document !== "undefined") {
    const platformRef = platformUniversalDynamic();
    document.addEventListener('DOMContentLoaded', () => {
        platformRef.bootstrapModule(AppModule);
    });
}
