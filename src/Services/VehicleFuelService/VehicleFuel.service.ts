import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicleFuel } from '../../Interfaces/IVehicleFuel';

@Injectable({
  providedIn: 'root'
})
export class VehicleFuelService {

  private apiUrl = 'https://localhost:7028/api/VehicleFuel';

constructor(private http : HttpClient) { }

GetVehicleFuel():Observable<IVehicleFuel[]>
  {
    return this.http.get<IVehicleFuel[]>(this.apiUrl);
  }
  AddVehicleFuel(vehiclefuel: IVehicleFuel): Observable<IVehicleFuel> {
    return this.http.post<IVehicleFuel>(this.apiUrl, vehiclefuel);
  }
  GetVehicleFuelById(id: number):Observable<IVehicleFuel> {
    return this.http.get<IVehicleFuel>(`${this.apiUrl}/${id}`);
  }
  UpdateVehicleFuel(vehiclefuel: IVehicleFuel):Observable<IVehicleFuel>{

    return this.http.put<IVehicleFuel>(`${this.apiUrl}/${vehiclefuel.FuelNo}`,vehiclefuel);
  }
  DeleteVehicleFuel(id: number): Observable<IVehicleFuel> {
    return this.http.delete<IVehicleFuel>(`${this.apiUrl}/${id}`);
  }

}
