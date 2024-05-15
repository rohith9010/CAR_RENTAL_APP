import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICity } from '../../Interfaces/ICity';
@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  mode1!:ICity;
  private apiUrl = 'https://localhost:7028/api/City';

  constructor(private http: HttpClient) { }
  

  getCities():Observable<ICity[]>
  {
    return this.http.get<ICity[]>(this.apiUrl);
  }
  AddCities(model: ICity): Observable<ICity> {
    return this.http.post<ICity>(this.apiUrl, model);
  }
  getCitiesById(id: number):Observable<ICity> {
    return this.http.get<ICity>(`${this.apiUrl}/${id}`);
  }
  updateCities(model: ICity ):Observable<ICity>{
    return this.http.put<ICity>(`${this.apiUrl}/${model.CityNo}`,model);
  }
  deleteCities(id: number): Observable<ICity> {
    return this.http.delete<ICity>(`${this.apiUrl}/${id}`);
  }
}
