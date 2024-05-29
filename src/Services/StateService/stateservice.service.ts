import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IState } from '../../Interfaces/IState';
import { Observable } from 'rxjs';
import { stat } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class StateserviceService {

  private apiUrl = 'https://localhost:7028/api/State';

 
  constructor(private http: HttpClient) { }

  GetAllStates():Observable<IState[]>
  {
    return this.http.get<IState[]>(this.apiUrl);
  }
  AddState(state: IState): Observable<IState> {
    return this.http.post<IState>(this.apiUrl, state);
  }
  GetStatebyId(id: number):Observable<IState> {
    return this.http.get<IState>(`${this.apiUrl}/${id}`);
  }
  UpdateState(state: IState ):Observable<IState>{
    return this.http.put<IState>(`${this.apiUrl}/${state.StateNo}`,state);
  }
  DeleteState(id: number): Observable<IState> {
    return this.http.delete<IState>(`${this.apiUrl}/${id}`);
  }


}
