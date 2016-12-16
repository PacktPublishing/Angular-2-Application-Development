import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {routing, appRoutingProviders} from "./app.routes";
import {HttpModule} from "@angular/http";
import CityListComponent from "./city-list.component";
import WeatherComponent from "./weather.component";

@NgModule({
    imports: [BrowserModule, HttpModule, routing],
    declarations: [AppComponent, CityListComponent, WeatherComponent],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }