import {Component} from "@angular/core";
import GameService from "./game.service";

@Component({
    providers: [GameService],
    selector: "app",
    template: "<div class='container'><status></status><board></board></div>"
})
export class AppComponent { }