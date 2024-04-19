import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { IVehicleMake_ } from '../Interfaces/IVehicleMake_';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleMakeService {
  mode1!:IVehicleMake_;
  private apiUrl = 'https://localhost:7028/api/VehicleMake';
 
  constructor(private http: HttpClient) { }
  

  getVehicleMake()
  {
    return this.http.get(this.apiUrl);
  }
  AddVehicleMake(model:IVehicleMake_){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    return this.http.post(this.apiUrl , body,{'headers':headers})
  }
  getById(id: number):Observable<IVehicleMake_> {
    return this.http.get<IVehicleMake_>(`${this.apiUrl}/${id}`)
  }
  updateVehicleMake(model: IVehicleMake_):Observable<IVehicleMake_>{
    const headers = ({ 'Content-Type': 'application/json' });
    const body=JSON.stringify(model);
    return this.http.put<IVehicleMake_>(`${this.apiUrl}/${model.makeNo}`,body, { 'headers': headers });
  }

}
