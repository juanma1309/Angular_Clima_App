import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getweather(city: string, units: string) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + '3b823f443780d2845a5b62b68be3e716' + '&units=' + units);
  }

}
