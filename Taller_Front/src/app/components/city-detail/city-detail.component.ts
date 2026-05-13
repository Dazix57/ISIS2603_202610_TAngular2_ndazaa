import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city.model';
import { WeatherRecord } from '../../models/weather-record.model';
import { WeatherRecordService } from '../../services/weather-record.service';
import { WeatherDetail } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';

/*
 * Implementar:
 * HU-03 — Detalle de Ciudad con Clima (Ver TALLER.md Parte B)
 * HU-04 — Historial de Registros de Clima (Ver TALLER.md Parte D)
 */

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-detail.component.html'
})
export class CityDetailComponent implements OnChanges {
  private weatherRecordService = inject(WeatherRecordService);
  private weatherService = inject(WeatherService);
  
  weatherDetail: WeatherDetail | null = null

  loading: boolean = false

  @Input() city!: City;

  weatherRecords: WeatherRecord[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.weatherRecordService.getRecords(this.city.id)
        .subscribe(records => this.weatherRecords = records);
      
      // HU-03: Obtener el clima de la ciudad
      this.loading = true;
      this.weatherService.getWeather(this.city.name)
        .subscribe(weather => {
          this.weatherDetail = weather;
          this.loading = false;
        });
    }
  }

  saveWeather(): void {
    // HU-04: Guardar un nuevo registro de clima
    if (this.weatherDetail && this.city) {
      const record: Partial<WeatherRecord> = {
        tempC: this.weatherDetail.temp_c,
        condition: this.weatherDetail.condition,
        humidity: this.weatherDetail.humidity
      };

      this.weatherRecordService.saveRecord(this.city.id, record as WeatherRecord).subscribe(() => {
        this.weatherRecordService.getRecords(this.city.id)
          .subscribe(records => this.weatherRecords = records);
      });
    }
  }
}
