import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { City } from '../../models/city.model';
import { Country } from '../../models/country.model';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';

/*
 * Implementar: HU-02 — Crear Ciudad
 */

@Component({
  selector: 'app-city-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-create.component.html'
})
export class CityCreateComponent implements OnInit {
  private cityService = inject(CityService);
  private countryService = inject(CountryService);

  @Output() cityCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  cityName: string = '';
  selectedCountryId: number | null = null;
  countries: Country[] = [];

  ngOnInit(): void {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  onSave(): void {
    if (this.cityName && this.selectedCountryId) {
      this.cityService.createCity(this.selectedCountryId, { name: this.cityName }).subscribe(() => {
        this.cityCreated.emit();
        this.cityName = '';
        this.selectedCountryId = null;
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
