import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicles } from '../../Interfaces/IVehicles';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private apiUrl = 'https://localhost:7028/api/Vehicles';

constructor(private http : HttpClient) { }

  GetVehicles():Observable<IVehicles[]>
  {
    return this.http.get<IVehicles[]>(this.apiUrl);
  }
  AddVehicles(vehicle: FormData): Observable<IVehicles> {
    return this.http.post<IVehicles>(this.apiUrl, vehicle);
  }
  GetVehiclesById(id: number):Observable<IVehicles> {
    return this.http.get<IVehicles>(`${this.apiUrl}/${id}`);
  }
  UpdateVehicles(vehicle: FormData ):Observable<IVehicles>{

    const vehicleNo = vehicle.get('VehicleNo');
    return this.http.put<IVehicles>(`${this.apiUrl}/${vehicleNo}`,vehicle);
  }
  DeleteVehicles(id: number): Observable<IVehicles> {
    return this.http.delete<IVehicles>(`${this.apiUrl}/${id}`);
  }
}
