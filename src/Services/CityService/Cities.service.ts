import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICities } from '../../Interfaces/ICities';
@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  mode1!:ICities;
  private apiUrl = 'https://localhost:7028/api/City';

  constructor(private http: HttpClient) { }
  

  getCities():Observable<ICities[]>
  {
    return this.http.get<ICities[]>(this.apiUrl);
  }
  AddCities(model: ICities): Observable<ICities> {
    return this.http.post<ICities>(this.apiUrl, model);
  }
  getCitiesById(id: number):Observable<ICities> {
    return this.http.get<ICities>(`${this.apiUrl}/${id}`);
  }
  updateCities(model: ICities ):Observable<ICities>{
    return this.http.put<ICities>(`${this.apiUrl}/${model.CityNo}`,model);
  }
  deleteCities(id: number): Observable<ICities> {
    return this.http.delete<ICities>(`${this.apiUrl}/${id}`);
  }
}
