import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicleTypes } from '../../Interfaces/IVehicleTypes';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private apiUrl = 'https://localhost:7028/api/VehicleType';

constructor(private http : HttpClient) { }

  GetVehicleTypes():Observable<IVehicleTypes[]>
  {
    return this.http.get<IVehicleTypes[]>(this.apiUrl);
  }
  AddVehicleTypes(vehicletype: IVehicleTypes): Observable<IVehicleTypes> {
    return this.http.post<IVehicleTypes>(this.apiUrl, vehicletype);
  }
  GetVehicleTypesById(id: number):Observable<IVehicleTypes> {
    return this.http.get<IVehicleTypes>(`${this.apiUrl}/${id}`);
  }
  UpdateVehicleTypes(vehicletype: IVehicleTypes):Observable<IVehicleTypes>{

    return this.http.put<IVehicleTypes>(`${this.apiUrl}/${vehicletype.TypeNo}`,vehicletype);
  }
  DeleteVehicleTypes(id: number): Observable<IVehicleTypes> {
    return this.http.delete<IVehicleTypes>(`${this.apiUrl}/${id}`);
  }

}
