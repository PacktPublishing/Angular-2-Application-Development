import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import CityListComponent from "./city-list.component";
import WeatherComponent from "./weather.component";

const routes: Routes = [
    {path: "", component: CityListComponent},
    {path: "weather/:woeId", component: WeatherComponent}
];

export const appRoutingProviders: Array<any> = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);