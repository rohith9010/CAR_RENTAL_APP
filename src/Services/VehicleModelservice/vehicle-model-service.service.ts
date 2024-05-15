import { Injectable } from '@angular/core';
import { IVehicleModel } from '../../Interfaces/IVehicleModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelServiceService {

  private apiUrl = 'https://localhost:7028/api/VechileModel';
 
  constructor(private http: HttpClient) { }
  

  getVehicleModel():Observable<IVehicleModel[]>
  {
    return this.http.get<IVehicleModel[]>(this.apiUrl);
  }
  AddVehicleModel(vehiclemodel: IVehicleModel): Observable<IVehicleModel> {
    return this.http.post<IVehicleModel>(this.apiUrl, vehiclemodel);
  }
  getmodelById(id: number):Observable<IVehicleModel> {
    return this.http.get<IVehicleModel>(`${this.apiUrl}/${id}`);
  }
  updateVehicleModel(vehiclemodel: IVehicleModel ):Observable<IVehicleModel>{
    return this.http.put<IVehicleModel>(`${this.apiUrl}/${vehiclemodel.ModelNo}`,vehiclemodel);
  }
  deleteVehicleModel(id: number): Observable<IVehicleModel> {
    return this.http.delete<IVehicleModel>(`${this.apiUrl}/${id}`);
  }


}
