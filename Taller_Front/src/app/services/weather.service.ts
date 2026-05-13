import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { WeatherDetail } from '../models/weather.model';

@Injectable({
  providedIn: 'root',

})
export class WeatherService {

  private API_KEY: string = environment.weatherApiKey;
  
  constructor(private http: HttpClient) { }

  getWeather(cityName: string): Observable<WeatherDetail> {
    const url = `https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${cityName}`;
    return this.http.get<any>(url).pipe(
      map(res => ({
        temp_c: res.current.temp_c,
        condition: res.current.condition.text,
        humidity: res.current.humidity
        }))
    );
  }
}
