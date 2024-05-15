import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '../../Interfaces/ICountry';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://localhost:7028/api/Countries';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.apiUrl);
  }

  getCountryById(id: number): Observable<ICountry> {
    return this.http.get<ICountry>(`${this.apiUrl}/${id}`);
  }

  addCountry(country: ICountry): Observable<ICountry> {
    return this.http.post<ICountry>(this.apiUrl, country);
  }

  updateCountry(country: ICountry): Observable<ICountry> {
    return this.http.put<ICountry>(`${this.apiUrl}/${country.CountryNo}`, country);
  }

  deleteCountry(id: number): Observable<ICountry> {
    return this.http.delete<ICountry>(`${this.apiUrl}/${id}`);
  }
}
