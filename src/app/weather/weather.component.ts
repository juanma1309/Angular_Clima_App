import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  cities: string[] = ['Guatemala', 'New York', 'London', 'Tokyo', 'Sydney'];
  city: string = 'Guatemala'; // Ciudad por defecto
  units: string = 'imperial'; // Por defecto en unidades imperiales (°F)

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getweather(this.city, this.units).subscribe({
      next: (res) => {
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;

        this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed')
    });
  }

  // Cambia la ciudad seleccionada y vuelve a llamar a la API
  onCityChange(selectedCity: string) {
    this.city = selectedCity;  // Establece la ciudad seleccionada
    this.getWeather();  // Llama a la API con la nueva ciudad
  }

  // Cambia las unidades seleccionadas (imperial o métrico)
  onRadioButtonChange(selectedUnit: string) {
    this.units = selectedUnit;  // Establece las unidades seleccionadas
    this.getWeather();  // Actualiza el clima basado en la nueva unidad
  }
}
