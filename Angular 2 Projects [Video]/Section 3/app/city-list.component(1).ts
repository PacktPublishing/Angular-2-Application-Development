import {Component} from "@angular/core";
import {City, WeatherService} from "./weather.service.ts";

@Component({
    providers: [WeatherService],
    templateUrl: "/app/city-list.component.html"
})
export default class CityListComponent {
    cities: Array<City> = this.weatherService.cities;

    constructor(private weatherService: WeatherService) {}
}