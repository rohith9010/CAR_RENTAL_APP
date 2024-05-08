import { Injectable } from '@angular/core';
import { IVehicleModel } from '../../Interfaces/IVehicleModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelServiceService {

mode1!:IVehicleModel;
  private apiUrl = 'https://localhost:7028/api/VechileModel';
 
  constructor(private http: HttpClient) { }
  

  getVehicleModel():Observable<IVehicleModel[]>
  {
    return this.http.get<IVehicleModel[]>(this.apiUrl);
  }
  AddVehicleModel(model: IVehicleModel): Observable<IVehicleModel> {
    return this.http.post<IVehicleModel>(this.apiUrl, model);
  }
  getmodelById(id: number):Observable<IVehicleModel> {
    return this.http.get<IVehicleModel>(`${this.apiUrl}/${id}`);
  }
  updateVehicleModel(model: IVehicleModel ):Observable<IVehicleModel>{
    return this.http.put<IVehicleModel>(`${this.apiUrl}/${model.ModelNo}`,model);
  }
  deleteVehicleModel(id: number): Observable<IVehicleModel> {
    return this.http.delete<IVehicleModel>(`${this.apiUrl}/${id}`);
  }


}
