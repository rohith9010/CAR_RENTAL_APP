import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOwner } from '../Interfaces/IOwner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerServiceService {

  private apiUrl = 'https://localhost:7028/api/Owner';

  constructor(private http : HttpClient) { }

  GetOwner():Observable<IOwner[]>
  {
    return this.http.get<IOwner[]>(this.apiUrl);
  }
  AddOwner(owner: IOwner): Observable<IOwner> {
    return this.http.post<IOwner>(this.apiUrl, owner);
  }
  OwnerById(id: number):Observable<IOwner> {
    return this.http.get<IOwner>(`${this.apiUrl}/${id}`);
  }
  UpdateOwner(owner: IOwner ):Observable<IOwner>{
    return this.http.put<IOwner>(`${this.apiUrl}/${owner.OwnerNo}`,owner);
  }
  DeleteOwner(id: number): Observable<IOwner> {
    return this.http.delete<IOwner>(`${this.apiUrl}/${id}`);
  }
}
