import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {HttpModule} from "@angular/http";
import CityListComponent from "./city-list.component";
import WeatherComponent from "./weather.component";

@NgModule({
    imports: [BrowserModule, HttpModule, routing],
    declarations: [AppComponent, CityListComponent, WeatherComponent],
    bootstrap: [AppComponent]
})
class AppModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);