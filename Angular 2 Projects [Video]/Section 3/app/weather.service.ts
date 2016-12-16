import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

interface WeatherApiResponse {
    query: {
        count: number;
        created: string;
        lang: string;
        results: {
            channel: {
                item: {
                    condition: {
                        code: string;
                        temp: string
                    }
                }
            }
        }
    };
}

export interface WeatherInformation {
    city: string;
    code: number;
    temperature: number;
}

export interface City {
    name: string;
    imageSrc: string;
    woeId: string;
}

@Injectable()
export class WeatherService {
    cities = [
        {name: "Bogota", imageSrc: "img/bogota.jpg", woeId: "368148"},
        {name: "Cape Town", imageSrc: "img/cape-town.jpg", woeId: "1591691"},
        {name: "London", imageSrc: "img/london.jpg", woeId: "44418"},
        {name: "New Delhi", imageSrc: "img/delhi.jpg", woeId: "28743736"},
        {name: "New York", imageSrc: "img/new-york.jpg", woeId: "2459115"},
        {name: "Paris", imageSrc: "img/paris.jpg", woeId: "615702"},
        {name: "Sydney", imageSrc: "img/sydney.jpg", woeId: "1105779"},
        {name: "Tokyo", imageSrc: "img/tokyo.jpg", woeId: "1118370"},
        {name: "Vancouver", imageSrc: "img/vancouver.jpg", woeId: "9807"}
    ];

    constructor(private http: Http) {}

    getWeather(woeId: string) {
        const url = this.generateWeatherUrl(woeId);
        return this.http.get(url).toPromise()
            .then(x => {
                const apiResponse = x.json() as WeatherApiResponse;
                const weather = apiResponse.query.results.channel.item.condition;
                return {
                    city: this.getCityName(woeId),
                    code: Number(weather.code),
                    temperature: Number(weather.temp)
                } as WeatherInformation;
            });
    }

    private generateWeatherUrl(woeId: string) {
        return `http://localhost:8001/api/weather/${woeId}`;
    }

    private getCityName(woeId: string) {
        const matches = this.cities.filter(x => x.woeId === woeId);
        return matches.length === 1 ? matches[0].name : undefined;
    }
}