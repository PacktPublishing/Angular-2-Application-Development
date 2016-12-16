import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {WeatherInformation, WeatherService} from "./weather.service";

@Component({
    providers: [WeatherService],
    templateUrl: "/app/weather.component.html"
})
export default class WeatherComponent implements OnInit {
    weather: WeatherInformation = undefined;

    constructor(private weatherService: WeatherService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const woeId = params["woeId"];
            this.weatherService.getWeather(woeId).then(x => this.weather = x);
        });
    }

    weatherExists() {
        return !!this.weather;
    }
}