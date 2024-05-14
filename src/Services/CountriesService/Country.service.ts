import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountries } from '../../Interfaces/ICountries';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://localhost:7028/api/Countries';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<ICountries[]> {
    return this.http.get<ICountries[]>(this.apiUrl);
  }

  getCountryById(id: number): Observable<ICountries> {
    return this.http.get<ICountries>(`${this.apiUrl}/${id}`);
  }

  addCountry(country: ICountries): Observable<ICountries> {
    return this.http.post<ICountries>(this.apiUrl, country);
  }

  updateCountry(country: ICountries): Observable<ICountries> {
    return this.http.put<ICountries>(`${this.apiUrl}/${country.CountryNo}`, country);
  }

  deleteCountry(id: number): Observable<ICountries> {
    return this.http.delete<ICountries>(`${this.apiUrl}/${id}`);
  }
}
