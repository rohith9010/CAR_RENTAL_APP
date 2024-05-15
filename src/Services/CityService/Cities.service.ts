import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICity } from '../../Interfaces/ICity';
@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'https://localhost:7028/api/City';

  constructor(private http: HttpClient) { }
  

  getCities():Observable<ICity[]>
  {
    return this.http.get<ICity[]>(this.apiUrl);
  }
  AddCities(city: ICity): Observable<ICity> {
    return this.http.post<ICity>(this.apiUrl, city);
  }
  getCitiesById(id: number):Observable<ICity> {
    return this.http.get<ICity>(`${this.apiUrl}/${id}`);
  }
  updateCities(city: ICity ):Observable<ICity>{
    return this.http.put<ICity>(`${this.apiUrl}/${city.CityNo}`,city);
  }
  deleteCities(id: number): Observable<ICity> {
    return this.http.delete<ICity>(`${this.apiUrl}/${id}`);
  }
}
