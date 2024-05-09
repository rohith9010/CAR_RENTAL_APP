import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IState } from '../../Interfaces/IState';
import { Observable } from 'rxjs';
import { ICountry } from '../../Interfaces/ICountry';

@Injectable({
  providedIn: 'root'
})
export class StateserviceService {

  private apiUrl = 'https://localhost:7028/api/State';
  private apiUrl1 = 'https://localhost:7028/api/Countries';

 
  constructor(private http: HttpClient) { }
  
  GetAllCountry():Observable<ICountry[]>
  {
    return this.http.get<ICountry[]>(this.apiUrl1);
  }
  GetCountrybyId(id: number):Observable<ICountry> {
    return this.http.get<ICountry>(`${this.apiUrl1}/${id}`);
  }
  GetAllStates():Observable<IState[]>
  {
    return this.http.get<IState[]>(this.apiUrl);
  }
  AddState(model: IState): Observable<IState> {
    return this.http.post<IState>(this.apiUrl, model);
  }
  GetStatebyId(id: number):Observable<IState> {
    return this.http.get<IState>(`${this.apiUrl}/${id}`);
  }
  UpdateState(model: IState ):Observable<IState>{
    return this.http.put<IState>(`${this.apiUrl}/${model.StateNo}`,model);
  }
  DeleteState(id: number): Observable<IState> {
    return this.http.delete<IState>(`${this.apiUrl}/${id}`);
  }

}
