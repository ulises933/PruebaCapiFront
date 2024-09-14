import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

  // Obtener lista de países
  getCountries(): Observable<any> {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  // Obtener lista de estados (reemplaza la URL con la de tu API preferida)
  getStates(countryCode: string): Observable<any> {
    return this.http.get(`https://api.example.com/states?country=${countryCode}`);
  }

  // Obtener lista de ciudades (reemplaza la URL con la de tu API preferida)
  getCities(stateCode: string): Observable<any> {
    return this.http.get(`https://api.example.com/cities?state=${stateCode}`);
  }
}
