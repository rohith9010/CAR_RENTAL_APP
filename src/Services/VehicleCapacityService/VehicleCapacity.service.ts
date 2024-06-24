import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVehicleCapacity } from '../../Interfaces/IVehicleCapacity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleCapacityService {

  private apiUrl = 'https://localhost:7028/api/VehicleCapacity';

constructor(private http : HttpClient) { }

GetVehicleCapacity():Observable<IVehicleCapacity[]>
  {
    return this.http.get<IVehicleCapacity[]>(this.apiUrl);
  }
  AddVehicleCapacity(vehiclecapacity: IVehicleCapacity): Observable<IVehicleCapacity> {
    return this.http.post<IVehicleCapacity>(this.apiUrl, vehiclecapacity);
  }
  GetVehicleCapacityById(id: number):Observable<IVehicleCapacity> {
    return this.http.get<IVehicleCapacity>(`${this.apiUrl}/${id}`);
  }
  UpdateVehicleCapacity(vehiclecapacity: IVehicleCapacity):Observable<IVehicleCapacity>{

    return this.http.put<IVehicleCapacity>(`${this.apiUrl}/${vehiclecapacity.CapacityNo}`,vehiclecapacity);
  }
  DeleteVehicleCapacity(id: number): Observable<IVehicleCapacity> {
    return this.http.delete<IVehicleCapacity>(`${this.apiUrl}/${id}`);
  }
}
